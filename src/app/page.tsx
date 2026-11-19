import Link from "next/link";
import { ArrowRight, Leaf, Sprout } from "@/components/icons";
import { Hero } from "@/components/sections/hero";
import { DishCard } from "@/components/sections/dish-card";
import { PlatterBand } from "@/components/sections/platter-band";
import { FindUs } from "@/components/sections/find-us";
import { Eyebrow } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { dishes } from "@/content/dishes";
import { numberWord } from "@/lib/utils";

export default function HomePage() {
  const signature = dishes.slice(0, 3);

  // Computed, not typed in — the vegan/vegetarian split has already drifted
  // out from under hand-written copy once this menu.
  const veganCount = numberWord(dishes.filter((d) => d.diet === "vegan").length);

  const PROMISES = [
    {
      icon: Sprout,
      title: "Vegan or vegetarian. All of it.",
      body: `Not a section of the menu — the whole menu. ${veganCount} dishes are vegan as they leave the pan, and the rest can be made vegan on request. Nobody in your group gets the sad option.`,
    },
    {
      icon: Leaf,
      title: "Organic produce, named on every dish.",
      body: "Each dish page lists everything that goes in, in order of weight, with allergens flagged. If you want to know what you are eating, we have already written it down.",
    },
  ];

  return (
    <>
      <Hero />

      {/* ---------- Signature dishes ---------- */}
      <section className="shell py-24 md:py-32" aria-labelledby="signature">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What we cook</Eyebrow>
            <h2 id="signature" className="display-2 mt-5">
              Start with these three.
            </h2>
          </div>
          <Link
            href="/menu"
            className="group inline-flex min-h-11 items-center gap-2 text-gold"
          >
            The whole menu
            <ArrowRight
              size={18}
              className="transition-transform duration-[420ms] [transition-timing-function:var(--ease-lux)] group-hover:translate-x-1"
            />
          </Link>
        </div>

        <Reveal
          variant="stagger"
          className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {signature.map((dish) => (
            <DishCard key={dish.slug} dish={dish} />
          ))}
        </Reveal>
      </section>

      <PlatterBand />

      {/* ---------- The promise ---------- */}
      <section
        className="border-y border-[var(--border)] bg-[var(--muted)]"
        aria-labelledby="promise"
      >
        <div className="shell py-24 md:py-32">
          <Eyebrow>Peace of mind</Eyebrow>
          <h2 id="promise" className="display-2 mt-5 max-w-3xl">
            You should not need to ask what is in it.
          </h2>

          <Reveal variant="stagger" className="mt-16 grid gap-14 md:grid-cols-2">
            {PROMISES.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon size={28} className="text-gold" />
                <h3 className="mt-6 font-display text-3xl leading-tight">
                  {title}
                </h3>
                <p className="prose-measure mt-4 text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </Reveal>

          <p className="mt-16 max-w-2xl text-muted-foreground">
            Every dish page carries full ingredients, allergens, nutrition per
            serving, and what each of those ingredients actually does — each
            claim tied to the thing that earns it.
          </p>
          <ButtonLink href="/menu" variant="outline" size="md" className="mt-8">
            Read a dish in full
          </ButtonLink>
        </div>
      </section>

      {/* ---------- Story teaser ---------- */}
      <Reveal as="section" className="shell py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="text-center">Where organic meets authentic</Eyebrow>
          <p className="display-2 mt-8 font-display leading-tight">
            Authentic is not a flavour you add.{" "}
            <span className="text-muted-foreground">
              It is what is left when you stop cutting corners.
            </span>
          </p>
          <ButtonLink href="/story" variant="ghost" size="md" className="mt-10">
            Read our story
            <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </Reveal>

      <FindUs />

      {/* ---------- Closing ---------- */}
      <section className="act-dark">
        <div className="shell py-24 text-center md:py-32">
          <h2 className="display-2 mx-auto max-w-2xl">
            Reserve a board. Turn up. Eat.
          </h2>
          <p className="lede mx-auto mt-7 max-w-lg text-muted-foreground">
            Pre-orders skip the queue and nothing is charged until you collect.
          </p>
          <ButtonLink href="/order" variant="gold" size="lg" className="mt-10">
            Pre-order now
            <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
