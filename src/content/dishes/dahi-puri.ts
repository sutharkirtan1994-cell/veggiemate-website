import type { Dish } from "@/lib/types";

export const dahiPuri: Dish = {
  slug: "dahi-puri",
  name: "Dahi Puri",
  nameNative: "दही पूरी",
  tagline: "Eight small puris, filled and topped and gone before you've thought about it.",
  origin: "Mumbai",
  story:
    "Mumbai's answer to the question of what to eat at five in the afternoon. Each puri is holed, filled with potato and chickpea, then loaded with sweet yoghurt, tamarind, mint and a fall of fine sev. They are meant to go whole into the mouth — one at a time, no negotiating — so that the shell cracks and everything inside arrives at once, cold and hot and sweet and sour with no gaps between. Eight to a plate, because six was never going to be enough.",
  flavourNotes: [
    "Whole in one, or it does not work",
    "Sweetened yoghurt leading",
    "Tamarind and mint behind it",
    "Fine sev, almost dissolving",
  ],
  price: 600,
  unit: "8 Pieces",
  category: "chaats",
  diet: "vegetarian",
  veganOption: "Ask for coconut yoghurt — the rest of the dish is already vegan.",
  spiceLevel: 1,
  ingredients: [
    "Puri (semolina, wheat flour, sunflower oil)",
    "Potato",
    "Chickpeas",
    "Sweetened yoghurt",
    "Tamarind",
    "Jaggery",
    "Fresh mint",
    "Fresh coriander",
    "Green chilli",
    "Chaat masala",
    "Black salt",
    "Fine sev (gram flour, sunflower oil)",
  ],
  allergens: ["Gluten (puri)", "Milk (yoghurt)"],
  // Scaled from six pieces to eight — the portion actually sold now.
  nutrition: {
    kcal: 515,
    protein: 16,
    carbs: 72,
    fat: 17,
    fibre: 9,
    sodium: 1095,
  },
  benefits: [
    {
      claim: "The gentlest thing we make — a way in if chilli is not your thing",
      source: "No dried chilli in the build",
    },
    {
      claim: "Live cultures, as in any set yoghurt",
      source: "Yoghurt",
    },
    {
      claim: "Fibre and plant protein from the filling, not just the shell",
      source: "Chickpeas",
    },
  ],
  images: [
    {
      src: "/dishes/dahi-puri.webp",
      alt: "A dark plate of small crisp puris, each filled and topped with white yoghurt, fine golden sev, pomegranate seeds, coriander and a dot of chutney.",
    },
  ],
  inPlatter: true,
  order: 3,
};
