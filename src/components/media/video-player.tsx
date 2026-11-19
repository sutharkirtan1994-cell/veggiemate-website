"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "@/components/icons";
import type { DishVideo } from "@/lib/types";

/**
 * Click-to-play, never autoplay.
 *
 * The design DB is explicit: auto-playing high-res loops burn data and energy,
 * so the default is `preload="none"` behind a poster, and playback pauses the
 * moment the player scrolls out of view. Captions are a required field on the
 * data model, not an option.
 */
export function VideoPlayer({ video }: { video: DishVideo }) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pause when it leaves the viewport — nobody is watching it there.
  useEffect(() => {
    if (!started) return;
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) videoRef.current?.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-sm bg-[var(--muted)]"
      style={{ aspectRatio: "16 / 9" }}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        preload="none"
        playsInline
        controls={started}
        className="h-full w-full object-cover"
      >
        <track
          kind="captions"
          src={video.captions}
          srcLang="en"
          label="English"
          default
        />
      </video>

      {!started && (
        <>
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              void videoRef.current?.play();
            }}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/35 transition-colors duration-300 hover:bg-black/25"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--gold-foreground)] shadow-[var(--shadow-lg)]">
              <Play size={26} />
            </span>
            <span className="sr-only">{`Play video: ${video.label}`}</span>
          </button>
        </>
      )}
    </div>
  );
}
