import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes, getDish } from "@/content/dishes";
import { ArrowLeft, ArrowRight, Check, Warning } from "@/components/icons";
import { Plate } from "@/components/media/plate";
import { DietBadge, Eyebrow, SpiceBadge } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { NutritionPanel } from "@/components/sections/nutrition-panel";
import { DishVideo } from "@/components/media/dish-video";
import { Reveal } from "@/components/motion/reveal";
import { FlavourScrub } from "@/components/motion/flavour-scrub";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) return {};
  return {
    title: dish.name,
    description: dish.tagline,
  };
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) notFound();

  // Only four others on a five-dish menu — show the whole rest of the board.
  const others = dishes.filter((d) => d.slug !== dish.slug);

  return (
    <>
      {/* ---------- Opening: the dish, dark and cinematic ---------- */}
      <section className="act-dark">
        <div className="shell py-14 md:py-20">
          <Link
            href="/menu"
            className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors duration-200 hover:text-gold"
          >
            <ArrowLeft size={16} />
            All dishes
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <Plate
              image={dish.images[0]}
              label={dish.name}
              ratio="square"
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="shadow-[var(--shadow-lg)]"
            />

            <div>
              {dish.origin && <Eyebrow>{dish.origin}</Eyebrow>}
              <h1 className="display-1 mt-5">{dish.name}</h1>
              {dish.nameNative && (
                <p className="mt-3 font-display text-2xl text-muted-foreground">
                  {dish.nameNative}
                </p>
              )}

              <p className="lede prose-measure mt-7 text-muted-foreground">
                {dish.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                <DietBadge diet={dish.diet} />
                <SpiceBadge level={dish.spiceLevel} />
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-3xl tabular-nums">
                    {formatPrice(dish.price)}
                  </span>
                  {dish.unit && (
                    <span className="text-base text-muted-foreground">
                      {dish.unit}
                    </span>
                  )}
                </span>
              </div>

              {dish.veganOption && (
                <p className="mt-6 flex items-start gap-3 text-[0.9375rem] text-muted-foreground">
                  <Check size={18} className="mt-1 shrink-0 text-gold" />
                  {dish.veganOption}
                </p>
              )}

              <ButtonLink
                href={`/order?dish=${dish.slug}`}
                variant="gold"
                size="lg"
                className="mt-9"
              >
                Pre-order this
                <ArrowRight size={18} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- The story ---------- */}
      {dish.story && (
        <Reveal as="section" className="shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <Eyebrow>Where it comes from</Eyebrow>
              <p className="mt-4 font-display text-3xl leading-tight">
                {dish.origin}
              </p>
            </div>
            <p className="prose-measure text-lg leading-relaxed">{dish.story}</p>
          </div>
        </Reveal>
      )}

      {/* ---------- Flavour: the one pinned section on the site ---------- */}
      {dish.flavourNotes && dish.flavourNotes.length > 0 && (
        <section className="act-dark" aria-labelledby="flavour-heading">
          <div className="shell py-20 md:py-28">
            <Eyebrow>What it tastes like</Eyebrow>
            <h2 id="flavour-heading" className="display-2 mt-5 max-w-2xl">
              In the order it arrives
            </h2>

            <div className="mt-14">
              <FlavourScrub notes={dish.flavourNotes} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- Video (renders a still until footage lands) ---------- */}
      <Reveal as="section" className="shell py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow className="text-center">How we make it</Eyebrow>
          <h2 className="display-2 mt-5">Watch it come together</h2>
          <p className="lede mx-auto mt-6 max-w-xl text-muted-foreground">
            No edits, no music, no hands but ours. Just the dish being built the
            way it is built every service.
          </p>
        </div>
        <div className="mt-14">
          <DishVideo video={dish.video} label={dish.name} />
        </div>
      </Reveal>

      {/* ---------- Contains + nutrition + benefits ---------- */}
      <section
        className="border-t border-[var(--border)] bg-[var(--muted)]"
        aria-labelledby="contains-heading"
      >
        <div className="shell py-20 md:py-28">
          <Eyebrow>Peace of mind</Eyebrow>
          <h2 id="contains-heading" className="display-2 mt-5 max-w-2xl">
            Everything that goes in, and what it does
          </h2>

          <div className="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-12">
            <div>
              <h3 className="eyebrow text-muted-foreground">Contains</h3>
              <ul className="mt-6 space-y-2.5">
                {dish.ingredients.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 translate-y-[-0.3em] rounded-full bg-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="eyebrow mt-12 text-muted-foreground">Allergens</h3>
              <ul className="mt-6 space-y-3">
                {dish.allergens.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Warning
                      size={18}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--destructive)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground prose-measure">
                Cooked in a single small kitchen. If you have a severe allergy,
                tell us when you order and we will talk you through it properly.
              </p>
            </div>

            <div>
              <h3 className="eyebrow text-muted-foreground">Nutrition</h3>
              <div className="mt-6">
                {dish.nutrition && (
                  <NutritionPanel nutrition={dish.nutrition} />
                )}
              </div>
            </div>

            <div>
              <h3 className="eyebrow text-muted-foreground">
                What it does for you
              </h3>
              <ul className="mt-6 space-y-8">
                {(dish.benefits ?? []).map((benefit) => (
                  <li key={benefit.claim}>
                    <p className="text-lg leading-snug">{benefit.claim}</p>
                    {/* Every claim names the ingredient that earns it —
                        vague wellness language reads as cheap. */}
                    <p className="mt-2 text-sm text-gold">{benefit.source}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Onward ---------- */}
      <Reveal as="section" className="shell py-20 md:py-28">
        <div className="rule mb-12" />
        <h2 className="display-3 font-display">The rest of the board</h2>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/menu/${other.slug}`}
              className="group flex items-start justify-between gap-6 border-b border-[var(--border)] pb-6"
            >
              <span>
                <span className="block font-display text-2xl transition-colors duration-200 group-hover:text-gold">
                  {other.name}
                </span>
                <span className="mt-2 block text-muted-foreground">
                  {other.tagline}
                </span>
              </span>
              <ArrowRight
                size={20}
                className="mt-2 shrink-0 text-gold transition-transform duration-[420ms] [transition-timing-function:var(--ease-lux)] group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </Reveal>
    </>
  );
}
