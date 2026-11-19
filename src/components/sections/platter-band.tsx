import { ArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badges";
import { Reveal } from "@/components/motion/reveal";
import { PLATTER_PRICE, platterDishes, platterValue } from "@/content/dishes";
import { formatPrice, numberWord } from "@/lib/utils";

/**
 * The conversion unit. Every other section on the site exists to make someone
 * want this, so it gets the strongest treatment available: full dark act, gold
 * CTA, and the only place the platter price appears.
 *
 * No photograph here on purpose. The hero already carries a cinematic shot of
 * its own, and a second one in the same scroll read as stock rather than as a
 * set. The board is described by naming what is on it, which is also the more
 * useful information.
 *
 * The dish count is derived from `inPlatter`, never typed into the copy — this
 * menu has been resized more than once already.
 */
export function PlatterBand() {
  const dishes = platterDishes();
  const count = numberWord(dishes.length);

  return (
    <section className="act-dark" aria-labelledby="platter-heading">
      <div className="shell py-24 md:py-32">
        <Reveal className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          {/* --- The pitch --- */}
          <div>
            <Eyebrow>The reason we exist</Eyebrow>
            <h2 id="platter-heading" className="display-2 mt-5">
              The Veggie Mate Platter
            </h2>
            <p className="lede prose-measure mt-7 text-muted-foreground">
              Tasting portions of all {count} dishes on one board, built to be
              eaten in order — gentlest first, fiercest last. It is the only way
              to understand what we are actually doing here, and it is how most
              people who come back first came back.
            </p>

            <div className="mt-12 flex flex-wrap items-end gap-x-8 gap-y-3">
              <p className="font-display text-6xl tabular-nums">
                {formatPrice(PLATTER_PRICE)}
              </p>
              <p className="pb-2 text-sm text-muted-foreground">
                Serves two comfortably. Ordered separately at full size,{" "}
                {formatPrice(platterValue())}.
              </p>
            </div>

            <ButtonLink href="/order" variant="gold" size="lg" className="mt-10">
              Pre-order the platter
              <ArrowRight size={18} />
            </ButtonLink>
          </div>

          {/* --- What is actually on the board --- */}
          <div className="lg:pt-4">
            <h3 className="eyebrow text-muted-foreground">On the board</h3>
            <ul className="mt-7">
              {dishes.map((dish) => (
                <li
                  key={dish.slug}
                  className="flex flex-col gap-1 border-b border-[var(--border)] py-4 sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <span className="font-display text-xl sm:w-[11rem] sm:shrink-0">
                    {dish.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {dish.tagline.split(",")[0]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
