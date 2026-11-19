import { Flame, Leaf, Sprout } from "@/components/icons";
import { SPICE_LABEL, type Diet, type SpiceLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Every badge on this site pairs an icon AND a word with its colour. Nothing
 * here is legible by hue alone — it all still reads in greyscale.
 */

const SPICE_COLOR: Record<SpiceLevel, string> = {
  1: "var(--spice-1)",
  2: "var(--spice-2)",
  3: "var(--spice-3)",
};

export function SpiceBadge({
  level,
  className,
}: {
  level: SpiceLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium",
        className,
      )}
      style={{ color: SPICE_COLOR[level] }}
    >
      <span className="inline-flex items-center gap-0.5">
        {([1, 2, 3] as const).map((i) => (
          <Flame
            key={i}
            size={15}
            className={i <= level ? "opacity-100" : "opacity-25"}
          />
        ))}
      </span>
      <span className="text-foreground">{SPICE_LABEL[level]}</span>
      <span className="sr-only">{`— spice level ${level} of 3`}</span>
    </span>
  );
}

export function DietBadge({
  diet,
  className,
}: {
  diet: Diet;
  className?: string;
}) {
  const isVegan = diet === "vegan";
  const Icon = isVegan ? Sprout : Leaf;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
        className,
      )}
    >
      <Icon size={16} className="text-gold" />
      {isVegan ? "Vegan" : "Vegetarian"}
    </span>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow text-gold", className)}>{children}</p>
  );
}
