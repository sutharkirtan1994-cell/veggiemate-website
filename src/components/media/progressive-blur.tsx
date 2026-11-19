import { cn } from "@/lib/utils";

/**
 * A progressively blurred edge — the thing that makes an image dissolve into
 * the page instead of stopping at a hard line.
 *
 * Several stacked layers each carry a heavier `backdrop-filter` and a mask
 * that starts further in, so the blur accumulates toward the edge. One layer
 * gives you a visible seam; four reads as a smooth melt.
 *
 * Purely decorative: aria-hidden and pointer-events-none, so it never
 * intercepts a click or reaches a screen reader.
 *
 * Cost note: backdrop-filter is GPU work. A handful of layers spread across
 * two or three edges of one hero is fine — CinematicBackdrop tapers the layer
 * count on the smaller vignette edges for exactly this reason. Do not scatter
 * this down a long page.
 */

interface ProgressiveBlurProps {
  /** Which edge dissolves. */
  side?: "top" | "bottom" | "left" | "right";
  /** How far in from that edge the blur reaches — a height for top/bottom, a width for left/right. */
  size?: string;
  /** Blur of the first layer, doubled for each one after. */
  base?: number;
  layers?: number;
  className?: string;
}

const AXIS: Record<
  NonNullable<ProgressiveBlurProps["side"]>,
  { to: string; edge: string; dim: "height" | "width" }
> = {
  bottom: { to: "to bottom", edge: "bottom-0 inset-x-0", dim: "height" },
  top: { to: "to top", edge: "top-0 inset-x-0", dim: "height" },
  right: { to: "to right", edge: "right-0 inset-y-0", dim: "width" },
  left: { to: "to left", edge: "left-0 inset-y-0", dim: "width" },
};

export function ProgressiveBlur({
  side = "bottom",
  size = "42%",
  base = 2,
  layers = 4,
  className,
}: ProgressiveBlurProps) {
  const { to, edge, dim } = AXIS[side];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-10", edge, className)}
      style={{ [dim]: size }}
    >
      {Array.from({ length: layers }, (_, i) => {
        const start = (i / layers) * 100;
        const full = ((i + 1) / layers) * 100;
        const mask = `linear-gradient(${to}, transparent ${start}%, #000 ${full}%, #000 100%)`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${base * 2 ** i}px)`,
              WebkitBackdropFilter: `blur(${base * 2 ** i}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
