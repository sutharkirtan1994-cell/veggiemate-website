"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The site's ONE pinned scrub section — the design DB caps pinning at 1-2 per
 * page and warns it fights native scroll on mobile, so this is gated to
 * >=1024px AND prefers-reduced-motion: no-preference. Everywhere else the
 * exact same markup renders as a static grid.
 *
 * The notes are fully visible in the DOM before GSAP touches anything, so
 * no-JS, reduced-motion and crawlers all get the complete list.
 */
export function FlavourScrub({ notes }: { notes: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = sectionRef.current;
          if (!section) return;

          const items = gsap.utils.toArray<HTMLElement>(
            section.querySelectorAll("[data-note]"),
          );
          if (items.length === 0) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=120%",
              scrub: 1,
              pin: true,
              // Pinning needs a settled layout; fonts change heights.
              invalidateOnRefresh: true,
            },
          });

          // Dim everything, then bring each note up in the order it arrives
          // on the palate — which is the whole point of the section.
          gsap.set(items, { opacity: 0.3 });
          items.forEach((item, i) => {
            tl.to(item, { opacity: 1, duration: 0.6, ease: "expo.out" }, i * 0.6);
          });

          if (barRef.current) {
            tl.fromTo(
              barRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: "none", duration: items.length * 0.6 },
              0,
            );
          }

          // Web fonts land after first paint and change section height.
          document.fonts?.ready.then(() => ScrollTrigger.refresh());
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
      <span
        aria-hidden="true"
        className="hidden h-px w-full origin-left bg-gold opacity-60 lg:block"
        ref={barRef}
      />
      <div className="grid gap-x-10 gap-y-12 pt-0 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
        {notes.map((note, i) => (
          <div key={note} data-note>
            <p className="font-display text-5xl text-gold opacity-70 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div className="rule my-5" />
            <p className="text-lg leading-snug">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
