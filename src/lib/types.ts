export type DishCategory = "mains" | "chaats";

export type Diet = "vegan" | "vegetarian";

/** 1 = gentle, 2 = warm, 3 = fierce. Always rendered with icon + word. */
export type SpiceLevel = 1 | 2 | 3;

export interface Nutrition {
  /** per serving */
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  sodium: number;
}

export interface Benefit {
  /** The claim, phrased modestly. No medical language. */
  claim: string;
  /** The ingredient that earns the claim. Every claim must name one. */
  source: string;
}

export interface DishImage {
  /** Omit until real photography exists — the Plate component handles it. */
  src?: string;
  alt: string;
}

export interface DishVideo {
  src: string;
  poster: string;
  /** WebVTT track. Required — captions are not optional on this site. */
  captions: string;
  label: string;
}

export interface Dish {
  slug: string;
  name: string;
  /** Native-script name, shown as a quiet secondary line. */
  nameNative?: string;
  /** One-line flavour hook. The thing that makes someone want it. */
  tagline: string;
  origin?: string;
  story?: string;
  /** What it tastes like, in order of arrival on the palate. */
  flavourNotes?: string[];
  nutrition?: Nutrition;
  benefits?: Benefit[];
  /** AUD cents. */
  price: number;
  /** Serving descriptor shown beside the price, e.g. "Plate", "8 Pieces". Omit if none was given. */
  unit?: string;
  category: DishCategory;
  diet: Diet;
  /** Present when a vegetarian dish can be made vegan on request. */
  veganOption?: string;
  spiceLevel: SpiceLevel;
  ingredients: string[];
  allergens: string[];
  images: DishImage[];
  video?: DishVideo;
  inPlatter: boolean;
  /** Ordering within its category. */
  order: number;
}

export const SPICE_LABEL: Record<SpiceLevel, string> = {
  1: "Gentle",
  2: "Warm",
  3: "Fierce",
};

export const CATEGORY_LABEL: Record<DishCategory, string> = {
  mains: "Mains",
  chaats: "Chaats",
};

export const CATEGORY_BLURB: Record<DishCategory, string> = {
  mains:
    "Slow-built curries served with pav. The dishes we are known for, cooked the way they are cooked at home.",
  chaats:
    "Assembled to order, never in advance. Crisp, cold, hot and sour all in the same mouthful.",
};

/**
 * Nutrition figures are kitchen calculations from our own recipes and
 * ingredient weights, not laboratory analysis. Shown so you can make an
 * informed choice, not as a clinical reference.
 */
export const NUTRITION_DISCLAIMER =
  "Figures are calculated from our own recipes and ingredient weights, not laboratory-analysed. Portions are made by hand, so expect natural variation.";
