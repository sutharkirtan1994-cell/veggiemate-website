import type { Dish } from "@/lib/types";

export const rajKachori: Dish = {
  slug: "raj-kachori",
  name: "Raj Kachori",
  nameNative: "राज कचौरी",
  tagline:
    "A hollow golden dome, cracked open at the table and filled until it cannot hold any more.",
  origin: "Rajasthan, by way of Old Delhi",
  story:
    "They call it the king of chaats and they are not being modest. The shell is fried until it puffs into a sphere the size of a fist, hollow and thin enough to see light through. We crack the crown, then fill: potato, moong sprouts, chickpeas, both chutneys, whipped yoghurt, sev, pomegranate. It arrives looking like something that should not be eaten with hands. It should be eaten with hands. Break the wall, take some of everything in one spoon, and understand why it needed to be this big.",
  flavourNotes: [
    "Thin shell giving way",
    "Cool whipped yoghurt first",
    "Sprouts and chickpeas underneath",
    "Pomegranate popping at the end",
  ],
  price: 900,
  category: "chaats",
  diet: "vegetarian",
  veganOption: "Ask for cashew yoghurt — everything else in it is already vegan.",
  spiceLevel: 2,
  ingredients: [
    "Kachori shell (wheat flour, semolina, sunflower oil)",
    "Potato",
    "Moong sprouts",
    "Chickpeas",
    "Whipped yoghurt",
    "Tamarind",
    "Jaggery",
    "Fresh mint",
    "Fresh coriander",
    "Chaat masala",
    "Roasted cumin",
    "Black salt",
    "Sev (gram flour, sunflower oil)",
    "Pomegranate",
  ],
  allergens: ["Gluten (shell)", "Milk (yoghurt)"],
  nutrition: {
    kcal: 534,
    protein: 16,
    carbs: 71,
    fat: 20,
    fibre: 11,
    sodium: 1020,
  },
  benefits: [
    {
      claim: "Sprouts and pulses together push the fibre well above a usual snack",
      source: "Moong sprouts and chickpeas",
    },
    {
      claim: "Plant protein from two sources, not one",
      source: "Moong sprouts and chickpeas",
    },
    {
      claim: "Polyphenols, and the only thing on the plate that is raw",
      source: "Pomegranate",
    },
  ],
  images: [
    {
      src: "/dishes/raj-kachori.webp",
      alt: "A single large fried kachori dome on a paper plate, buried under sev, yoghurt, green chutney and pomegranate seeds.",
    },
  ],
  inPlatter: true,
  order: 1,
};
