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
    body: "Vegetables come from two growers within forty miles. Spices come whole from a single importer and are ground on the truck each morning, because pre-ground masala is where flavour goes to die. If a supplier cannot tell us how something was grown, we do not put it on the board.",
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

      {/* ---------- The truck ---------- */}
      <section className="border-y border-[var(--border)] bg-[var(--muted)]">
        <div className="shell py-24 md:py-32">
          <Reveal className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Plate
              image={{
                src: "/truck/truck.jpg",
                alt: "The Veggie Mate truck parked at dusk with its hatch open and the service light on.",
              }}
              label="The truck"
              ratio="landscape"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div>
              <Eyebrow>The truck</Eyebrow>
              <h2 className="display-2 mt-5">
                A small kitchen with nowhere to hide.
              </h2>
              <p className="prose-measure mt-7 text-lg leading-relaxed text-muted-foreground">
                Everything happens in about four square metres, in front of
                whoever is waiting. There is no back of house to send a mistake
                to. You can watch the sev go on, watch the kat get poured, and
                see exactly how much chilli went in before you commit. We rather
                like that. It keeps us honest in a way a restaurant kitchen
                never has to be.
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
