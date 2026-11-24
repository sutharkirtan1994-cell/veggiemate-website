import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { Plate } from "@/components/media/plate";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badges";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Where organic meets authentic — how the Veggie Mate truck sources, cooks and refuses to cut corners.",
};

/**
 * This page deliberately breaks the site pattern: the CTA sits at the END, not
 * above the fold. A page whose whole job is credibility undercuts itself if it
 * opens with "buy now".
 */

const PRINCIPLES = [
  {
    n: "01",
    title: "Organic, or we do not buy it",
    body: "We source our fresh vegetables from local Western Australian growers and trusted vendors to ensure freshness and quality. Our spices are carefully sourced from genuine overseas vendors to preserve authentic flavours and are stone-ground to maintain their traditional aroma and taste. We cook exclusively using stainless steel and cast iron utensils, avoiding aluminium and non-stick cookware to support healthier, more natural cooking.",
  },
  {
    n: "02",
    title: "Authentic means the difficult version",
    body: "Beans sprouted for two days, not tinned. Chutneys made every morning, not from concentrate. Puris fried the same day they are served. All of it is slower and more expensive than the alternative, and all of it is the reason the food tastes like it is supposed to.",
  },
  {
    n: "03",
    title: "Nothing sits waiting",
    body: "Chaats are assembled the second you order. Thirty seconds after that the puris begin to soften and it becomes a different, lesser dish. That is why the board is short, why pre-orders are timed to a slot, and why we will politely refuse to make it early.",
  },
  {
    n: "04",
    title: "Plant-based without announcing it",
    body: "The whole menu is vegan or vegetarian, but nothing here is an imitation of something else. These are dishes that were always meatless, in the places they come from, long before anyone needed a word for it.",
  },
];

export default function StoryPage() {
  return (
    <>
      {/* ---------- Editorial opening: no CTA, no buttons ---------- */}
      <section className="act-dark relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 60% at 80% 10%, color-mix(in srgb, var(--gold) 14%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="shell relative py-28 md:py-40">
          <Eyebrow>Our story</Eyebrow>
          <h1 className="display-1 mt-8 max-w-4xl">
            Where organic
            <br />
            meets <span className="italic text-gold">authentic.</span>
          </h1>
          <p className="lede prose-measure mt-12 text-muted-foreground">
            Two words that usually cancel each other out. Organic food tends to
            arrive polite and underseasoned. Authentic Indian street food tends
            to arrive on a paper plate with no questions asked about where any
            of it came from. We wanted both, so we built a truck and did it the
            hard way.
          </p>
        </div>
      </section>

      {/* ---------- Principles ---------- */}
      <section className="shell py-24 md:py-32" aria-labelledby="principles">
        <h2 id="principles" className="sr-only">
          How we work
        </h2>
        <div className="grid gap-x-20 gap-y-20 lg:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <Reveal key={p.n}>
              <p className="font-display text-6xl text-gold opacity-60 tabular-nums">
                {p.n}
              </p>
              <div className="rule my-7" />
              <h3 className="font-display text-3xl leading-tight">{p.title}</h3>
              <p className="prose-measure mt-5 text-lg leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Who's cooking ---------- */}
      <section className="border-y border-[var(--border)] bg-[var(--muted)]">
        <div className="shell py-24 md:py-32">
          <Reveal className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Plate
              image={{
                src: "/team/founders-cutout.png",
                alt: "Kirtan and Dhruvika, the two people behind Veggie Mate, in chef's whites.",
              }}
              label="Kirtan and Dhruvika"
              ratio="portrait"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="bg-transparent"
            />
            <div>
              <Eyebrow>Who&apos;s cooking</Eyebrow>
              <h2 className="display-2 mt-5">
                Two people, one kitchen, no excuses.
              </h2>
              <p className="prose-measure mt-7 text-lg leading-relaxed text-muted-foreground">
                Veggie Mate is run by the two of us. We started this because
                we were tired of vegetarian food being treated as the
                compromise option — pale, apologetic, assembled from whatever
                was left once the meat went out. That is not what we grew up
                eating, and it is not what we set out to sell.
              </p>
              <p className="prose-measure mt-5 text-lg leading-relaxed text-muted-foreground">
                Every dish on this menu is something we have cooked at home for
                years, made from vegetables and spices we choose ourselves, not
                whatever is convenient. If it takes longer to do it properly, we
                take longer. If you have ever wondered whether vegetarian food
                can actually be exciting, we are standing right there at the
                hatch, ready to prove it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- The single CTA, after the story ---------- */}
      <Reveal as="section" className="shell py-24 text-center md:py-32">
        <p className="display-3 mx-auto max-w-2xl font-display leading-snug">
          {site.slogan}.
        </p>
        <p className="lede mx-auto mt-7 max-w-lg text-muted-foreground">
          The platter is the argument. Five dishes, one board, in the order they
          are meant to be eaten.
        </p>
        <ButtonLink href="/order" variant="gold" size="lg" className="mt-10">
          Pre-order the platter
          <ArrowRight size={18} />
        </ButtonLink>
      </Reveal>
    </>
  );
}
