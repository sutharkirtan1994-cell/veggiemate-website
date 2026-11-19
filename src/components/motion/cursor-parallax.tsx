"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/**
 * Pointer-reactive wrapper for a decorative backdrop.
 *
 * Two separate gates, on purpose:
 *   - the entrance reveal runs for anyone who allows motion, on any device
 *   - the cursor tracking runs only on `(pointer: fine)`, because on a
 *     touchscreen "cursor position" is wherever the last tap landed, which
 *     makes the image lurch rather than respond
 *
 * Movement is transform-only and driven through `quickTo`, so pointer events
 * never trigger layout and the motion carries inertia instead of snapping to
 * the cursor. Nothing here loops — the DB flags infinite decorative animation
 * as an anti-pattern, so the image is still unless the visitor moves.
 *
 * The child should overflow its container slightly (see CinematicBackdrop) or
 * translating it will expose an edge.
 */
export function CursorParallax({
  children,
  /** Maximum travel in px at the far edge of the viewport. */
  strength = 16,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          opacity: 0,
          scale: 1.08,
          duration: 1.6,
          ease: "expo.out",
        });
      });

      mm.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(el, "x", {
            duration: 1.1,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(el, "y", {
            duration: 1.1,
            ease: "power3.out",
          });

          const onMove = (e: PointerEvent) => {
            // -1..1 from the centre of the viewport.
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            // Inverted, so the image drifts away from the cursor and reads as
            // sitting behind the page rather than stuck to the pointer.
            xTo(-nx * strength);
            yTo(-ny * strength * 0.6);
          };

          window.addEventListener("pointermove", onMove, { passive: true });
          return () => window.removeEventListener("pointermove", onMove);
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("h-full w-full", className)}>
      {children}
    </div>
  );
}
