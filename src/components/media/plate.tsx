import Image from "next/image";
import { Camera } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { DishImage } from "@/lib/types";

/**
 * Photography is not shot yet. Rather than ship a broken <img> or a stock
 * photo — the DB names "cheap visuals" as the #1 anti-pattern for this style —
 * this renders a composed placeholder that looks deliberate, and swaps to a
 * real optimised image the moment `src` is filled in on the dish record.
 *
 * Aspect ratio is fixed either way, so adding photos later shifts nothing.
 */

const RATIO: Record<string, string> = {
  square: "1 / 1",
  portrait: "4 / 5",
  landscape: "3 / 2",
  cinema: "16 / 9",
};

interface PlateProps {
  image: DishImage;
  /** Dish name, used in the placeholder composition. */
  label: string;
  ratio?: keyof typeof RATIO;
  /** Set on the LCP image only. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function Plate({
  image,
  label,
  ratio = "portrait",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: PlateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm bg-[var(--muted)]",
        className,
      )}
      style={{ aspectRatio: RATIO[ratio] }}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <Placeholder label={label} alt={image.alt} />
      )}
    </div>
  );
}

/**
 * The alt text is carried on the wrapper as a description so a screen reader
 * still learns what the finished dish looks like, even before the photo lands.
 */
function Placeholder({ label, alt }: { label: string; alt: string }) {
  return (
    <div
      role="img"
      aria-label={`${alt} Photography for this dish is being shot.`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, color-mix(in srgb, var(--gold) 16%, transparent) 0%, transparent 62%), var(--muted)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-3 rounded-sm border"
        style={{ borderColor: "color-mix(in srgb, var(--gold) 34%, transparent)" }}
      />
      <Camera size={22} className="text-gold opacity-70" />
      <span className="font-display text-xl leading-tight text-foreground opacity-75">
        {label}
      </span>
      <span className="eyebrow text-muted-foreground">Photography to follow</span>
    </div>
  );
}
