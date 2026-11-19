import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Takes AUD cents. Everything on this site is priced in cents, never floats. */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

/**
 * Spells out a small count instead of typing it into copy as a digit or a
 * word — the menu has already been resized three times, and a hand-typed
 * "five dishes" is exactly the kind of thing that quietly goes stale.
 */
export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}
