import { ArrowRight } from "@/components/icons";
import { CinematicBackdrop } from "@/components/media/cinematic-backdrop";
import { ButtonLink } from "@/components/ui/button";
import { dishesByCategory, PLATTER_PRICE } from "@/content/dishes";
import { site } from "@/lib/site";
import { formatPrice, numberWord } from "@/lib/utils";

/**
 * The house film runs silently behind the copy, postered by its own first
 * frame so the composition is identical before it loads — and on a phone, a
 * slow connection, or with reduced motion on, the still is all there is.
 * Either way it is bled into the dark act and dissolved rather than framed;
 * see CinematicBackdrop for the mask and blur.
 *
 * Legibility is not left to chance: on phones the photograph drops to 40%
 * opacity under a scrim that is opaque where the copy sits; on wide screens the
 * mask has already faded it out behind the text column. Cream on the
 * green-black ground measures 16.29:1 either way.
 */
export function Hero() {
  const chaatCount = numberWord(dishesByCategory("chaats").length);

  return (
    <section className="act-dark relative isolate overflow-hidden">
      <CinematicBackdrop
        src="/video/hero-poster.webp"
        video="/video/hero.mp4"
        textSide="left"
        priority
      />

      <div className="shell relative z-30 flex min-h-[92svh] flex-col justify-end py-24 md:py-32 lg:min-h-[88vh] lg:justify-center lg:py-40">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">{site.slogan}</p>

          <h1 className="display-1 mt-8">
            Indian street food,
            <br />
            cooked like it
            <br />
            <span className="italic text-gold">still matters.</span>
          </h1>

          <div
            aria-hidden="true"
            className="mt-10 h-px w-24 bg-gold opacity-70"
          />

          <p className="lede prose-measure mt-10 text-muted-foreground">
            Sev usal from Vadodara. Misal pav from Kolhapur. {chaatCount}{" "}
            chaats behind them, built the second you order — every dish on the
            board vegan or vegetarian. Parked somewhere in {site.city}.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <ButtonLink href="/order" variant="gold" size="lg">
              Pre-order the platter — {formatPrice(PLATTER_PRICE)}
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/menu" variant="outline" size="lg">
              See the menu
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Full ingredients and allergens on every dish.
          </p>
        </div>
      </div>
    </section>
  );
}
