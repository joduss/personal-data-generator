/**
 * Fake European person generator (name, date of birth, AHV number, email, phone number).
 * Name data (src/data/europeanNames.json) is sourced from the Faker.js project (MIT License).
 */
import { generateAhvNumber } from "./ahvGenerator";
import europeanNames from "../data/europeanNames.json";

const EMAIL_DOMAINS = ["gmail.com", "outlook.com", "bluewin.ch", "gmx.ch", "hotmail.com"];
const SWISS_MOBILE_PREFIXES = ["76", "77", "78", "79"];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(list) {
  return list[randomInt(0, list.length - 1)];
}

// Greek and Ukrainian (Cyrillic) names aren't reachable by NFD diacritic-stripping alone -
// without transliteration, slugify would silently drop the entire name and produce broken emails.
const TRANSLITERATION = {
  α: "a", β: "b", γ: "g", δ: "d", ε: "e", ζ: "z", η: "i", θ: "th", ι: "i",
  κ: "k", λ: "l", μ: "m", ν: "n", ξ: "x", ο: "o", π: "p", ρ: "r", σ: "s",
  ς: "s", τ: "t", υ: "y", φ: "f", χ: "ch", ψ: "ps", ω: "o",
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh",
  з: "z", и: "y", і: "i", ї: "i", й: "i", к: "k", л: "l", м: "m", н: "n",
  о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ь: "", ю: "iu", я: "ia", ъ: "", ы: "y", э: "e",
};

function transliterate(str) {
  return [...str].map((ch) => TRANSLITERATION[ch] ?? ch).join("");
}

const NON_LATIN_SCRIPT = /[Ͱ-ϿЀ-ӿ]/;

// Renders Greek/Cyrillic names in the Latin alphabet so they're readable to a Latin-alphabet
// reader; Latin-script names (even accented ones like "Čerkašin") are left untouched.
function toLatinAlphabet(name) {
  if (!NON_LATIN_SCRIPT.test(name)) {
    return name;
  }
  const ascii = transliterate(name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase());
  return ascii.replace(/(^|[\s-])([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase());
}

function slugify(name) {
  return transliterate(
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
  ).replace(/[^a-z0-9]/g, "");
}

function randomDateOfBirth(isMinor) {
  const now = new Date();
  const age = isMinor ? randomInt(1, 17) : randomInt(18, 90);
  const month = randomInt(0, 11);
  const day = randomInt(1, 28);
  return new Date(now.getFullYear() - age, month, day);
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${date.getFullYear()}`;
}

function generateSwissPhoneNumber() {
  const prefix = pick(SWISS_MOBILE_PREFIXES);
  const subscriber = String(randomInt(0, 9_999_999)).padStart(7, "0");
  return `+41 ${prefix} ${subscriber.slice(0, 3)} ${subscriber.slice(3, 5)} ${subscriber.slice(5)}`;
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate a single fake person.
 * @param {boolean} isMinor - Whether the person should be under 18.
 * @returns {{ firstName: string, lastName: string, country: string, dateOfBirth: string, ahv: string, email: string, phone: string, isMinor: boolean }}
 */
export function generatePerson(isMinor) {
  const country = pick(europeanNames);
  const isMale = Math.random() < 0.5;
  const firstName = toLatinAlphabet(pick(isMale ? country.firstNamesMale : country.firstNamesFemale));
  const lastName = toLatinAlphabet(pick(country.lastNames));
  const dateOfBirth = formatDate(randomDateOfBirth(isMinor));
  const { ahvFormatted } = generateAhvNumber();
  const email = `${slugify(firstName)}.${slugify(lastName)}@${pick(EMAIL_DOMAINS)}`;
  const phone = generateSwissPhoneNumber();

  return { firstName, lastName, country: country.country, dateOfBirth, ahv: ahvFormatted, email, phone, isMinor };
}

/**
 * Generates an array of fake persons, guaranteeing at least one minor among mostly adults.
 * @param {number} count - How many persons to generate.
 * @returns {Array<{ firstName: string, lastName: string, country: string, dateOfBirth: string, ahv: string, email: string, phone: string, isMinor: boolean }>}
 */
export function generateFakePersons(count = 8) {
  const minorCount = Math.max(1, Math.round(count * 0.25));
  const flags = shuffle(
    Array.from({ length: count }, (_, i) => i < minorCount)
  );
  return flags.map((isMinor) => generatePerson(isMinor));
}
