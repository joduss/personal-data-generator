/**
 * Swiss IBAN generator using real bank profiles and MOD10 account checksums.
 * Based on the Python implementation with MOD10 validation for account numbers.
 */

const MOD10 = [
  [0, 9, 4, 6, 8, 2, 7, 1, 3, 5],
  [9, 4, 6, 8, 2, 7, 1, 3, 5, 0],
  [4, 6, 8, 2, 7, 1, 3, 5, 0, 9],
  [6, 8, 2, 7, 1, 3, 5, 0, 9, 4],
  [8, 2, 7, 1, 3, 5, 0, 9, 4, 6],
  [2, 7, 1, 3, 5, 0, 9, 4, 6, 8],
  [7, 1, 3, 5, 0, 9, 4, 6, 8, 2],
  [1, 3, 5, 0, 9, 4, 6, 8, 2, 7],
  [3, 5, 0, 9, 4, 6, 8, 2, 7, 1],
  [5, 0, 9, 4, 6, 8, 2, 7, 1, 3],
];

/**
 * Compute a MOD10 check digit for the given digit string.
 * @param {string} digits
 * @returns {number}
 */
function mod10CheckDigit(digits) {
  let carry = 0;
  for (let i = 0; i < digits.length; i++) {
    carry = MOD10[carry][parseInt(digits[i], 10)];
  }
  return (10 - carry) % 10;
}

/**
 * Compute mod 97 of a large number string to avoid precision issues.
 * @param {string} numStr
 * @returns {number}
 */
function mod97(numStr) {
  let remainder = 0;
  for (let i = 0; i < numStr.length; i++) {
    remainder = (remainder * 10 + parseInt(numStr[i], 10)) % 97;
  }
  return remainder;
}

/**
 * Standard 9-digit account: #-######-#
 * @returns {{ padded: string, formatted: string }}
 */
function accountStandard9() {
  const base = String(Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000).padStart(8, "0");
  const check = mod10CheckDigit(base);
  const raw9 = base + String(check);
  const padded = raw9.padStart(12, "0");
  const formatted = `${raw9[0]}-${raw9.slice(1, 7)}-${raw9.slice(7, 9)}`;
  return { padded, formatted };
}

/**
 * PostFinance 9-digit account: ##-######-#
 * @returns {{ padded: string, formatted: string }}
 */
function accountPostfinance() {
  const prefix = String(Math.floor(Math.random() * (99 - 10 + 1)) + 10);
  const core = String(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).padStart(6, "0");
  const base = prefix + core;
  const check = mod10CheckDigit(base);
  const raw9 = prefix + core + String(check);
  const padded = raw9.padStart(12, "0");
  const formatted = `${prefix}-${core}-${check}`;
  return { padded, formatted };
}

const BANK_PROFILES = {
  "00230": { name: "UBS", generator: accountStandard9 },
  "00240": { name: "UBS", generator: accountStandard9 },
  "00700": { name: "Zürcher Kantonalbank", generator: accountStandard9 },
  "00768": { name: "Banque Cantonale Vaudoise", generator: accountStandard9 },
  "04835": { name: "Credit Suisse", generator: accountStandard9 },
  "08080": { name: "Raiffeisen", generator: accountStandard9 },
  "09000": { name: "PostFinance", generator: accountPostfinance },
};

const BANK_CODES = Object.keys(BANK_PROFILES);

/**
 * Generate a single fake Swiss IBAN with bank metadata.
 * @param {string|null} bankCode - Optional specific bank code.
 * @returns {{ iban: string, ibanFormatted: string, bank: string, bankCode: string, accountFormatted: string }}
 */
export function generateSwissIban(bankCode = null) {
  const code = bankCode ?? BANK_CODES[Math.floor(Math.random() * BANK_CODES.length)];
  const { name, generator } = BANK_PROFILES[code];
  const { padded, formatted: accountFormatted } = generator();

  const bban = code + padded;
  // IBAN check digits: move CH to end as 1217, placeholder 00, mod-97
  const ibanCheck = 98 - mod97(bban + "121700");
  const iban = `CH${String(ibanCheck).padStart(2, "0")}${bban}`;
  const ibanFormatted = `${iban.slice(0, 4)} ${iban.slice(4, 9)} ${iban.slice(9, 13)} ${iban.slice(13, 17)} ${iban.slice(17)}`;

  return {
    iban,
    ibanFormatted,
    bank: name,
    bankCode: code,
    accountFormatted,
  };
}

/**
 * Generates an array of fake Swiss IBANs with bank metadata.
 * @param {number} count - How many IBANs to generate.
 * @returns {Array<{ iban: string, ibanFormatted: string, bank: string, bankCode: string, accountFormatted: string }>}
 */
export function generateFakeIbans(count = 5) {
  return Array.from({ length: count }, () => generateSwissIban());
}