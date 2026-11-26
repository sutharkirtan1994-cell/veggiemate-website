import type { Metadata } from "next";
import { Pin } from "@/components/icons";
import { VideoPlayer } from "@/components/media/video-player";
import { Eyebrow } from "@/components/ui/badges";
import { Reveal } from "@/components/motion/reveal";
import type { DishVideo } from "@/lib/types";

export const metadata: Metadata = {
  title: "What's cooking",
  description: "The story behind the dish.",
};

interface DishFilm {
  slug: string;
  name: string;
  origin: string;
  video: DishVideo;
  description: string[];
}

/**
 * One entry per dish film. Add the next one here once its video, poster and
 * captions are in — the layout handles any number of entries unchanged.
 */
const FILMS: DishFilm[] = [
  {
    slug: "sev-usal",
    name: "Sev Usal",
    origin: "Gujarat, India",
    video: {
      src: "/video/sev-usal-introduction.mp4",
      poster: "/dishes/sev-usal.webp",
      captions: "/captions/sev-usal-introduction.vtt",
      label: "Sev Usal — introduction",
    },
    description: [
      "Born in the vibrant streets of Gujarat, in western India, Sev Usal is a much-loved Indian street food that brings together bold flavours, comforting textures and generations of tradition. Originating from the food-loving city of Vadodara, this iconic dish is more than just a meal — it is an experience.",
      "At its heart is a delicious, spicy and aromatic curry made from dried white peas, slowly cooked with a blend of authentic Indian spices. It is served hot with crunchy sev, fresh onions, coriander and a squeeze of lemon, creating the perfect balance of spice, crunch and freshness. Every spoonful brings a beautiful combination of flavours and textures.",
      "Traditionally enjoyed as a popular street-side breakfast or snack, Sev Usal has become a favourite for food lovers across Gujarat and beyond.",
      "At Veggie Mate, we celebrate this authentic Gujarati classic with fresh ingredients, carefully selected spices and a passion for bringing traditional vegetarian street food to your plate. We believe vegetarian food should never be boring — it should be full of flavour, goodness and satisfaction.",
      "One dish, countless flavours, and a little taste of Gujarat in every bite.",
    ],
  },
  {
    slug: "ragda-pattice",
    name: "Ragda Pattice",
    origin: "Maharashtra, India",
    video: {
      src: "/video/ragda-pattice-introduction.mp4",
      poster: "/dishes/ragda-pattice.jpg",
      captions: "/captions/ragda-pattice-introduction.vtt",
      label: "Ragda Pattice — introduction",
    },
    description: [
      "Ragda Pattice comes from Mumbai, in the state of Maharashtra, on India's western coast. It grew up as part of Mumbai's street-food culture through the twentieth century, and while nobody can say for certain who first put ragda and pattice on the same plate, it has gone on to become one of India's best-loved vegetarian snacks.",
      "At its base is ragda — white peas simmered in Indian spices for plant-based protein, fibre and iron — paired with pattice, golden potato patties that bring carbohydrates and energy to the plate. Finished with fresh onions, coriander, mint chutney, sweet tamarind chutney and a scattering of crunchy sev, the whole dish brings together protein, fibre, vitamins and energy in one bowl.",
      "Ragda Pattice is loved for its perfect balance of spicy, sweet, tangy and crunchy flavours. It is affordable, filling and satisfying — the combination of hot ragda, crispy potato patties and fresh chutneys makes it a favourite street food for people of all ages.",
      "More than just a snack, Ragda Pattice represents the rich tradition of Indian vegetarian street food.",
    ],
  },
];

export default function IntroductionPage() {
  return (
    <section className="shell py-24 md:py-32">
      <Eyebrow>What&apos;s cooking</Eyebrow>
      <h1 className="display-2 mt-5 max-w-2xl">What&apos;s cooking?</h1>
      <p className="lede mt-5 max-w-xl text-muted-foreground">
        The story behind the dish.
      </p>

      <div className="mt-16 space-y-24 md:space-y-32">
        {FILMS.map((film) => (
          <Reveal
            key={film.slug}
            className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20"
          >
            <VideoPlayer video={film.video} />
            <div>
              <div className="flex items-center gap-2 text-gold">
                <Pin size={18} />
                <span className="eyebrow">{film.origin}</span>
              </div>
              <h2 className="display-2 mt-4">{film.name}</h2>
              {film.description.map((paragraph, i) => (
                <p
                  key={i}
                  className="prose-measure mt-5 text-lg leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
