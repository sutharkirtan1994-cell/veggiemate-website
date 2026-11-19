import Image from "next/image";
import { AmbientVideo } from "@/components/media/ambient-video";
import { ProgressiveBlur } from "@/components/media/progressive-blur";
import { CursorParallax } from "@/components/motion/cursor-parallax";
import { cn } from "@/lib/utils";

/**
 * A photograph bled into a dark act and dissolved on every edge, rather than
 * framed.
 *
 * All four sides fade out — bottom hardest (that is what reads as the image
 * *emerging* from the page), left next (where "left" hands a column back to
 * flat background for the copy), and a lighter fade on the right and top so
 * the whole thing reads as vignetted rather than as a rectangle pasted onto
 * the section. Earlier this only faded bottom and left; the right edge sat
 * flush against the viewport with no dissolve at all, which is what read as
 * a hard seam.
 *
 * Each fade pairs a mask (so the pixels genuinely go transparent) with a
 * ProgressiveBlur (so the last visible pixels are soft, not a hard-edged
 * gradient) and a colour-matched scrim (so what shows through is the actual
 * page background, not indeterminate transparency).
 *
 * Works because the source photographs are shot on near-black grounds; on a
 * light or busy background these fades would have nothing to dissolve into.
 *
 * The decorative layers — gradients, scrim, blur, the image and video itself —
 * are individually aria-hidden, and the wrapper is pointer-events-none so it
 * never intercepts a click.
 *
 * aria-hidden sits on those children rather than on the wrapper because
 * AmbientVideo renders a real pause button inside this subtree. A focusable
 * control inside an aria-hidden ancestor is reachable by keyboard but missing
 * from the accessibility tree, which is worse than either alone.
 */

interface CinematicBackdropProps {
  /** Still image, and the poster when `video` is set. Always the LCP. */
  src: string;
  /**
   * Optional silent loop layered over the still. See AmbientVideo for the
   * one condition under which it does not load at all (Data Saver / a slow
   * connection) — otherwise it autoplays for everyone, including on phones
   * and with reduced motion on, and carries its own pause control.
   */
  video?: string;
  /** Seconds. Trims the loop to the useful part of a longer file. */
  videoEndAt?: number;
  /**
   * Wide-screen text column. "left" fades the image out on the left so copy
   * sits on flat background; "none" keeps it full-bleed and leans on the scrim.
   */
  textSide?: "left" | "none";
  /** Opacity on small screens, where the image sits under the copy. */
  mobileOpacity?: string;
  /** object-position, for photographs whose subject is off-centre. */
  position?: string;
  /** Set on the LCP image only. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function CinematicBackdrop({
  src,
  video,
  videoEndAt,
  textSide = "left",
  mobileOpacity = "opacity-40",
  position = "center",
  priority = false,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  className,
}: CinematicBackdropProps) {
  // Every edge fades; bottom is the deepest so the image reads as emerging
  // upward out of the page, the others are a lighter vignette.
  const bottomFade =
    "linear-gradient(to bottom, #000 0%, #000 44%, transparent 88%)";
  const rightFade = "linear-gradient(to right, #000 0%, #000 78%, transparent 97%)";
  const topFade = "linear-gradient(to top, #000 0%, #000 88%, transparent 100%)";
  const leftFade = "linear-gradient(to right, transparent 0%, #000 36%)";

  const layers = [bottomFade, rightFade, topFade];
  if (textSide === "left") layers.push(leftFade);
  const mask = layers.join(", ");
  // One "intersect" per layer — including the first, where it is simply
  // ignored — so the visible area is where every fade is opaque at once.
  const composite = layers.map(() => "intersect").join(", ");

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div
        className={cn(
          "absolute inset-0",
          textSide === "left" && "lg:left-[32%]",
        )}
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          maskComposite: composite,
          WebkitMaskComposite: "source-in",
        }}
      >
        {/* Overscanned so the parallax travel never exposes an edge. */}
        <CursorParallax className="absolute -inset-[4%]">
          <div className={cn("absolute inset-0", mobileOpacity, "lg:opacity-100")}>
            {video ? (
              <AmbientVideo
                src={video}
                poster={src}
                endAt={videoEndAt}
                priority={priority}
                sizes={sizes}
                objectPosition={position}
              />
            ) : (
              <Image
                src={src}
                alt=""
                fill
                priority={priority}
                sizes={sizes}
                className="object-cover"
                style={{ objectPosition: position }}
              />
            )}
          </div>
        </CursorParallax>
      </div>

      {/* Ambient gold and herb, behind the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 50% at 12% 8%, color-mix(in srgb, var(--gold) 18%, transparent) 0%, transparent 68%), radial-gradient(45% 45% at 88% 92%, color-mix(in srgb, var(--herb) 12%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Scrim. Carries the copy on small screens, then steps back. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[color-mix(in_srgb,var(--background)_80%,transparent)] to-[color-mix(in_srgb,var(--background)_55%,transparent)]",
          textSide === "left" &&
            "lg:bg-gradient-to-r lg:via-[color-mix(in_srgb,var(--background)_32%,transparent)] lg:to-transparent",
        )}
      />

      {/* A light colour-matched wash along the right edge, so what the mask
          reveals there is unmistakably the page background, not a void. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-[var(--background)] to-transparent"
      />

      {/* The melt on each edge, then a final hand-off to flat background
          over the bottom one specifically, since that is the seam the next
          section actually butts up against. */}
      <ProgressiveBlur side="bottom" size="46%" base={2} layers={4} />
      <ProgressiveBlur side="right" size="20%" base={2} layers={3} />
      <ProgressiveBlur side="top" size="14%" base={2} layers={2} />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-[var(--background)] to-transparent"
      />
    </div>
  );
}
