"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * A silent looping background video.
 *
 * It starts on load, everywhere, because a muted video is permitted to
 * autoplay in every browser. The only thing that stops it loading is Data
 * Saver or a 2g/3g connection — those are the visitor explicitly saying
 * "do not spend my data", which is not the same as a style preference.
 *
 * It used to also refuse to play under `prefers-reduced-motion` and below
 * 768px. Both were removed deliberately: on Windows, switching off "Animation
 * effects" sets reduced-motion, so a large share of perfectly ordinary
 * visitors were being shown a frozen poster and nothing else.
 *
 * Because it now autoplays indefinitely, it carries its own visible pause
 * control — which is what WCAG 2.2 §2.2.2 actually asks for when motion runs
 * automatically for more than five seconds. Respecting reduced-motion was
 * doing that job before; the button does it now, and does it for everyone.
 *
 * The poster is a real `next/image` underneath, so it is the LCP and the
 * composition is identical before the video arrives.
 */
export function AmbientVideo({
  src,
  poster,
  posterAlt = "",
  priority = false,
  sizes,
  className,
  objectPosition = "center",
  startAt = 0,
  endAt,
}: {
  src: string;
  poster: string;
  posterAlt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectPosition?: string;
  /** Seconds. Playback begins here. */
  startAt?: number;
  /** Seconds. Loops back to `startAt` here, trimming a longer file. */
  endAt?: number;
}) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return;

    setEnabled(true);
  }, []);

  // Pause off-screen, and recover from anything that stopped playback —
  // scrolling back into view or returning to a backgrounded tab.
  useEffect(() => {
    if (!enabled) return;
    const el = wrapRef.current;
    if (!el) return;

    const resume = () => {
      const v = videoRef.current;
      if (v && v.paused && !paused) void v.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) resume();
        else if (!v.paused) v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);

    const onVisible = () => {
      if (document.visibilityState === "visible") resume();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled, paused]);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }

  return (
    <div ref={wrapRef} className={cn("absolute inset-0", className)}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition }}
        aria-hidden={posterAlt === "" ? true : undefined}
      />

      {enabled && (
        <>
          <video
            ref={videoRef}
            src={endAt !== undefined ? `${src}#t=${startAt},${endAt}` : src}
            poster={poster}
            // Muted autoplay is allowed everywhere. Driving playback by hand
            // off a `canplay` listener was not reliable: with preload="none"
            // the browser fetched nothing, `canplay` never fired, and the
            // video silently never started.
            autoPlay
            muted
            loop={endAt === undefined}
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            onLoadedMetadata={(e) => {
              if (startAt > 0) e.currentTarget.currentTime = startAt;
            }}
            onTimeUpdate={(e) => {
              if (endAt === undefined) return;
              if (e.currentTarget.currentTime >= endAt) {
                e.currentTarget.currentTime = startAt;
              }
            }}
            onLoadedData={(e) => void e.currentTarget.play().catch(() => {})}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              "transition-opacity duration-[1200ms] [transition-timing-function:var(--ease-lux)]",
              playing ? "opacity-100" : "opacity-0",
            )}
            style={{ objectPosition }}
          />

          {/* The pause mechanism autoplaying motion is required to have.
              pointer-events-auto because the backdrop around it is inert. */}
          {playing && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={paused}
              title={paused ? "Play background video" : "Pause background video"}
              className={cn(
                "pointer-events-auto absolute bottom-5 right-5 z-40",
                "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full",
                "border border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_55%,transparent)]",
                "text-foreground backdrop-blur-sm",
                "transition-colors duration-200 hover:border-[var(--gold)] hover:text-gold",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
              )}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
              <span className="sr-only">
                {paused ? "Play background video" : "Pause background video"}
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
