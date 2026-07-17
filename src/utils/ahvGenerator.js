/**
 * Swiss AHV/AVS number generator (EAN-13 style check digit, prefix 756).
 */

/**
 * Generate a single fake AHV number in the 756.XXXX.XXXX.XX format.
 * @returns {{ ahv: string, ahvFormatted: string }}
 */
export function generateAhvNumber() {
  const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const digits = [7, 5, 6, ...randomDigits];

  const sum = digits.reduce((acc, d, idx) => acc + d * (idx % 2 === 0 ? 1 : 3), 0);
  const check = (10 - (sum % 10)) % 10;

  const full = digits.join("") + String(check);
  const ahvFormatted = `${full.slice(0, 3)}.${full.slice(3, 7)}.${full.slice(7, 11)}.${full.slice(11, 13)}`;

  return { ahv: full, ahvFormatted };
}

/**
 * Generates an array of fake AHV numbers.
 * @param {number} count - How many AHV numbers to generate.
 * @returns {Array<{ ahv: string, ahvFormatted: string }>}
 */
export function generateFakeAhvNumbers(count = 8) {
  return Array.from({ length: count }, () => generateAhvNumber());
}
