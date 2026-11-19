import type { Dish, DishCategory } from "@/lib/types";
import { sevUsal } from "./sev-usal";
import { misalPav } from "./misal-pav";
import { rajKachori } from "./raj-kachori";
import { jhaalMuri } from "./jhaal-muri";
import { dahiPuri } from "./dahi-puri";
import { ragdaPattice } from "./ragda-pattice";

/**
 * The whole menu. Six dishes, on purpose — add a dish by creating its file
 * and appending it here, but check with the business before growing this list
 * back out; it has already been resized more than once.
 */
export const dishes: Dish[] = [
  sevUsal,
  misalPav,
  rajKachori,
  jhaalMuri,
  dahiPuri,
  ragdaPattice,
];

export const CATEGORY_ORDER: DishCategory[] = ["mains", "chaats"];

export function getDish(slug: string): Dish | undefined {
  return dishes.find((d) => d.slug === slug);
}

export function dishesByCategory(category: DishCategory): Dish[] {
  return dishes
    .filter((d) => d.category === category)
    .sort((a, b) => a.order - b.order);
}

export function platterDishes(): Dish[] {
  return dishes.filter((d) => d.inPlatter);
}

/** Priced honestly against the sum of its full-size parts. */
export function platterValue(): number {
  return platterDishes().reduce((sum, d) => sum + d.price, 0);
}

/**
 * AUD cents. Full-price sum of the six dishes is $64.00 — this is a round,
 * roughly-25%-off placeholder for "tasting portions of everything, serves
 * two." Confirm before launch; it was not given a price explicitly.
 */
export const PLATTER_PRICE = 4800;
