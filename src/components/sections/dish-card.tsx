import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Plate } from "@/components/media/plate";
import { DietBadge, SpiceBadge } from "@/components/ui/badges";
import type { Dish } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/**
 * The whole card is a single <Link>, so its accessible name is the dish name
 * rather than "read more" — and there are no nested interactive elements to
 * break keyboard traversal. Hover changes shadow and colour only, never
 * layout bounds, so cards can't nudge their neighbours in the grid.
 */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link
      href={`/menu/${dish.slug}`}
      className="group flex flex-col rounded-sm outline-offset-4 transition-shadow duration-[420ms] [transition-timing-function:var(--ease-lux)]"
    >
      <Plate
        image={dish.images[0]}
        label={dish.name}
        ratio="portrait"
        className="shadow-[var(--shadow-sm)] transition-shadow duration-[420ms] group-hover:shadow-[var(--shadow-lg)]"
      />

      <div className="flex flex-1 flex-col pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight transition-colors duration-200 group-hover:text-gold">
            {dish.name}
          </h3>
          <span className="flex shrink-0 flex-col items-end">
            <span className="font-display text-xl tabular-nums text-muted-foreground">
              {formatPrice(dish.price)}
            </span>
            {dish.unit && (
              <span className="text-xs text-muted-foreground">{dish.unit}</span>
            )}
          </span>
        </div>

        {dish.nameNative && (
          <p className="mt-1 text-sm text-muted-foreground">
            {dish.nameNative}
          </p>
        )}

        <p className="mt-3 flex-1 text-muted-foreground">{dish.tagline}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <DietBadge diet={dish.diet} />
          <SpiceBadge level={dish.spiceLevel} />
        </div>

        <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] text-gold">
          Flavour, ingredients and nutrition
          <ArrowRight
            size={16}
            className="transition-transform duration-[420ms] [transition-timing-function:var(--ease-lux)] group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
