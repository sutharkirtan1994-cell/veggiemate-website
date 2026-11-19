import type { Dish } from "@/lib/types";

export const misalPav: Dish = {
  slug: "misal-pav",
  name: "Misal Pav",
  nameNative: "मिसळ पाव",
  tagline:
    "Sprouted moth beans under a slick of red kat, with farsan on top and pav to put out the fire.",
  origin: "Kolhapur, Maharashtra",
  story:
    "Kolhapur does not do gentle. The beans are sprouted for two days before they ever see a pan — which is why this eats lighter than it looks — then simmered into a usal and flooded with kat, the fierce red oil-slicked gravy poured over at the last moment. Farsan goes on for crunch, raw onion for bite, lemon for relief. The pav is not a side. It is the tool. Tear, dredge, repeat, and keep going after your mouth tells you to stop.",
  flavourNotes: [
    "A wave of chilli and goda masala",
    "Sprouts underneath, nutty and clean",
    "Farsan crackling on top",
    "Pav soaking up the kat",
  ],
  price: 1400,
  unit: "Plate",
  category: "mains",
  diet: "vegan",
  spiceLevel: 3,
  ingredients: [
    "Sprouted moth beans (matki)",
    "Onion",
    "Tomato",
    "Goda masala",
    "Kashmiri chilli",
    "Dried coconut",
    "Garlic",
    "Ginger",
    "Mustard seed",
    "Turmeric",
    "Farsan (gram flour, rice flour, sunflower oil)",
    "Vegan pav (wheat flour, yeast, sunflower oil)",
    "Fresh coriander",
    "Lemon",
  ],
  allergens: ["Gluten (pav)"],
  nutrition: {
    kcal: 596,
    protein: 22,
    carbs: 74,
    fat: 22,
    fibre: 16,
    sodium: 890,
  },
  benefits: [
    {
      claim: "Sprouting for two days makes the beans easier to digest than dried",
      source: "Sprouted moth beans",
    },
    {
      claim: "One of the highest-protein dishes on our menu, entirely plant-based",
      source: "Sprouted moth beans",
    },
    {
      claim: "Our pav is made without dairy, so the whole plate stays vegan",
      source: "Vegan pav",
    },
  ],
  images: [
    {
      src: "/dishes/misal-pav.webp",
      alt: "Overhead on a dark table: a steel bowl of misal heaped with farsan and coriander, buttered pav alongside, with dishes of raw onion, green chillies and lemon around it.",
    },
  ],
  inPlatter: true,
  order: 2,
};
