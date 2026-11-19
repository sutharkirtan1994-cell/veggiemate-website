import type { Dish } from "@/lib/types";

export const jhaalMuri: Dish = {
  slug: "jhaal-muri",
  name: "Jhaal Muri",
  nameNative: "ঝাল মুড়ি",
  tagline:
    "Puffed rice tossed hard with mustard oil, peanuts and raw vegetables — Kolkata's five-minute snack.",
  origin: "Kolkata, West Bengal",
  story:
    "Jhaal muri is not cooked, it is assembled, and assembled fast — a fistful of puffed rice into a steel bowl, then peanuts, chickpeas, chopped onion, tomato and cucumber, a shake of black salt and chaat masala, and a spoon of raw mustard oil that does more work than anything else in the bowl. It gets tossed hard, by hand, for maybe fifteen seconds, and it is on your plate before the puffed rice has time to soften. Lemon goes on at the very end, never before — any earlier and the rice goes soggy before it reaches you.",
  flavourNotes: [
    "Mustard oil, sharp and immediate",
    "Peanuts and chickpeas for crunch",
    "Raw onion and tomato, cold and crisp",
    "Lemon at the very end",
  ],
  price: 900,
  category: "chaats",
  diet: "vegan",
  spiceLevel: 2,
  ingredients: [
    "Puffed rice (muri)",
    "Roasted peanuts",
    "Chickpeas",
    "Onion",
    "Tomato",
    "Cucumber",
    "Green chilli",
    "Fresh coriander",
    "Black salt",
    "Chaat masala",
    "Mustard oil",
    "Lemon",
  ],
  allergens: ["Peanuts"],
  nutrition: {
    kcal: 310,
    protein: 9,
    carbs: 38,
    fat: 14,
    fibre: 6,
    sodium: 540,
  },
  benefits: [
    {
      claim:
        "The only thing on the board that is naturally gluten-free — no wheat anywhere in the bowl",
      source: "Puffed rice (muri)",
    },
    {
      claim: "Peanuts and chickpeas both contribute protein, with nothing fried and nothing dairy",
      source: "Peanuts and chickpeas",
    },
    {
      claim: "Mustard oil is used cold-pressed and raw, the way it always has been in Bengali kitchens",
      source: "Mustard oil",
    },
  ],
  images: [
    {
      src: "/dishes/jhaal-muri.webp",
      alt: "A white bowl of jhaal muri on a wooden board — puffed rice tossed with peanuts, chickpeas, chopped onion, tomato and carrot, with lemon wedges, sliced tomato and green chillies alongside.",
    },
  ],
  inPlatter: true,
  order: 2,
};
