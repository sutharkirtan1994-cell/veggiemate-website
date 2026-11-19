import type { Dish } from "@/lib/types";

export const ragdaPattice: Dish = {
  slug: "ragda-pattice",
  name: "Ragda Pattice",
  nameNative: "रगडा पॅटीस",
  tagline:
    "Griddled potato cakes drowned in a thin white-pea ragda, chutneys over the top.",
  origin: "Mumbai",
  story:
    "Two potato pattice, pressed flat and griddled until the outsides go properly crisp, then flooded with ragda — the same white peas as the usal but cooked looser, thinner, so it soaks in rather than sits on top. Then both chutneys, raw onion, sev, coriander. The pleasure of it is textural and it is on a timer: crisp pattice against soft ragda for about a minute, and after that it is one soft thing. Which is still very good, but it is not the same dish.",
  flavourNotes: [
    "Crisp edge of the pattice",
    "Thin ragda soaking in underneath",
    "Sweet tamarind, sharp mint",
    "Onion and sev at the finish",
  ],
  price: 1400,
  unit: "Plate",
  category: "chaats",
  diet: "vegan",
  spiceLevel: 2,
  ingredients: [
    "Potato",
    "Dried white peas",
    "Onion",
    "Green chilli",
    "Ginger",
    "Turmeric",
    "Chaat masala",
    "Tamarind",
    "Jaggery",
    "Fresh mint",
    "Fresh coriander",
    "Sev (gram flour, sunflower oil)",
    "Sunflower oil",
  ],
  allergens: [],
  nutrition: {
    kcal: 512,
    protein: 15,
    carbs: 78,
    fat: 15,
    fibre: 12,
    sodium: 910,
  },
  benefits: [
    {
      claim: "Vegan as it leaves the pan — no yoghurt anywhere in the build",
      source: "Both chutneys are dairy-free",
    },
    {
      claim: "The only chaat we make with no declarable allergens at all",
      source: "No wheat shell, no dairy, no nuts",
    },
    {
      claim: "Substantial fibre for something that eats like a snack",
      source: "White peas and potato",
    },
  ],
  images: [
    {
      src: "/dishes/ragda-pattice.jpg",
      alt: "Two golden potato pattice under a thin white-pea ragda, topped with green and brown chutneys, raw onion and sev.",
    },
  ],
  inPlatter: true,
  order: 4,
};
