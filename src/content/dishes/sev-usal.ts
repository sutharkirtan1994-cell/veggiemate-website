import type { Dish } from "@/lib/types";

export const sevUsal: Dish = {
  slug: "sev-usal",
  name: "Sev Usal",
  nameNative: "સેવ ઉસળ",
  tagline:
    "White peas stewed dark with jaggery and chilli, buried under a drift of crisp sev.",
  origin: "Vadodara, Gujarat",
  story:
    "In Vadodara this is eaten standing up, from a steel plate, at ten at night. The usal is white peas cooked long enough to lose their edges, sharpened with a dark masala and softened again with jaggery — sweet arriving a half-second after the heat, which is the whole trick of Gujarati cooking. We finish it the way the city does: raw onion, coriander, a squeeze of lemon, and so much sev that the first spoonful is more crunch than curry. Eat it fast, before the sev gives in.",
  flavourNotes: [
    "Chilli first, sharp and dry",
    "Then jaggery, rounding it off",
    "Sour lemon and raw onion cutting through",
    "Sev collapsing into the gravy as you go",
  ],
  price: 1200,
  unit: "Plate",
  category: "mains",
  diet: "vegan",
  spiceLevel: 3,
  ingredients: [
    "Dried white peas",
    "Onion",
    "Tomato",
    "Jaggery",
    "Kashmiri chilli",
    "Turmeric",
    "Cumin",
    "Coriander seed",
    "Garlic",
    "Ginger",
    "Sev (gram flour, sunflower oil)",
    "Fresh coriander",
    "Lemon",
    "Cold-pressed sunflower oil",
  ],
  allergens: ["Gluten (in the pav served alongside)"],
  nutrition: {
    kcal: 512,
    protein: 19,
    carbs: 68,
    fat: 17,
    fibre: 14,
    sodium: 780,
  },
  benefits: [
    {
      claim: "A substantial source of plant protein and fibre in one bowl",
      source: "Dried white peas",
    },
    {
      claim: "Contributes to your daily fibre without any animal ingredients",
      source: "White peas and onion",
    },
    {
      claim: "Cooked with turmeric, used in Indian kitchens for centuries",
      source: "Turmeric",
    },
  ],
  images: [
    {
      src: "/dishes/sev-usal.webp",
      alt: "A steel plate of dark sev usal, piled high with fine golden sev, raw onion and coriander.",
    },
  ],
  inPlatter: true,
  order: 1,
};
