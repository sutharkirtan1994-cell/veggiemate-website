"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Variant = "fade" | "stagger";

interface RevealProps {
  children: ReactNode;
  /** "fade" moves the block itself, "stagger" walks its direct children. */
  variant?: Variant;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * The site's only scroll-animation wrapper.
 *
 * Content is visible in the DOM by default and is hidden ONLY inside the
 * matchMedia("no-preference") block. That ordering is deliberate: a
 * reduced-motion visitor, a no-JS visitor and a crawler all get a fully
 * rendered page, because nothing is ever `opacity: 0` in CSS.
 *
 * Timings are slow on purpose — the design DB names "fast animations" as the
 * anti-pattern for this style, so these run at 600-900ms on expo.out rather
 * than the usual 200ms.
 */
export function Reveal({
  children,
  variant = "fade",
  as: Tag = "div",
  className,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current;
        if (!el) return;

        if (variant === "stagger") {
          // Cap at 8 — beyond that the tail items read as laggy.
          const items = gsap.utils.toArray<HTMLElement>(el.children).slice(0, 8);
          gsap.from(items, {
            opacity: 0,
            y: 28,
            duration: 0.8,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
          return;
        }

        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
