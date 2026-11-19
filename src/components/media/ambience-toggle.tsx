"use client";

import { useEffect, useRef, useState } from "react";
import { SpeakerOn, SpeakerOff } from "@/components/icons";
import { cn } from "@/lib/utils";

const KEY = "vm-ambience";
const TRACK = "/audio/ambience.m4a";
const VOLUME = 0.28;

/**
 * Background music, on by default, stopped with the speaker button.
 *
 * Chrome, Safari and Firefox all refuse to start *audible* playback until the
 * visitor has interacted with the page — a bare `autoplay` on an unmuted
 * track is rejected, every time, in every modern browser, and no script gets
 * around it. What follows is the closest thing to "plays automatically" that
 * is actually possible:
 *
 *   1. try to play the instant the element exists — this succeeds silently
 *      for returning visitors the browser already trusts;
 *   2. otherwise, start on the visitor's very first pointer or key event
 *      anywhere on the page — the earliest instant sound is permitted.
 *
 * That first click used to require pressing the button TWICE. The bug: the
 * button toggled a boolean (`on`) that represented *intent*, and rendered its
 * icon from that same boolean. Because intent defaulted to true, the button
 * showed "on" even while the audio element was still silently paused
 * (autoplay blocked). The first press then read as "turn the on-looking
 * thing off" and flipped intent to false — genuinely pausing something that
 * was never playing. Only the second press flipped intent back to true and,
 * via an effect, finally called `play()`.
 *
 * Fixed by removing the middleman: the button now reads and drives the
 * audio element's *actual* playing state directly. `el.paused` decides what a
 * click does, and `onPlay`/`onPause` — real events off the element — decide
 * what the icon shows. Nothing about the audio can now be out of sync with
 * what the button displays, and because the click handler calls `el.play()`
 * synchronously inside a real user gesture, one press always starts it.
 *
 * Turning it off is remembered — which is also what keeps this compliant
 * with WCAG 2.2 §1.4.2 (Audio Control): sound that plays automatically for
 * more than three seconds must have a visible way to stop it. That rule is
 * also why this can never be removed outright, however little the control is
 * asked to intrude: shipping music nobody can stop is a real accessibility
 * failure, not a style choice.
 *
 * It renders `fixed`, tucked in a bottom corner at reduced opacity, so it
 * reads as ambient page chrome rather than a header control fighting for
 * attention next to the nav — the same quiet treatment the hero's own video
 * pause button already uses, just mirrored to the opposite corner so the two
 * never collide on a page that has both.
 */
export function AmbienceToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  // Tracks an explicit user pause so the background gesture-listener below
  // does not fight it and resume music the visitor just turned off.
  const explicitlyOffRef = useRef(
    typeof window !== "undefined" && localStorage.getItem(KEY) === "off",
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = VOLUME;
    if (explicitlyOffRef.current) return;

    const tryPlay = () => {
      if (!explicitlyOffRef.current && el.paused) {
        void el.play().catch(() => {});
      }
    };

    tryPlay();

    // A background bonus: audio can start on the first interaction with
    // anything on the page, not only the speaker button. Each listener
    // detaches itself once the audio is actually playing.
    const GESTURES = ["pointerdown", "keydown", "touchend"] as const;
    const onGesture = () => {
      tryPlay();
      if (!el.paused) GESTURES.forEach((g) => window.removeEventListener(g, onGesture));
    };
    GESTURES.forEach((g) => window.addEventListener(g, onGesture));
    return () => GESTURES.forEach((g) => window.removeEventListener(g, onGesture));
  }, []);

  function handleClick() {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      explicitlyOffRef.current = false;
      localStorage.setItem(KEY, "on");
      // Synchronous, inside a real click — this is what makes one press
      // reliable, unlike deferring to an effect afterwards.
      void el.play().catch(() => {});
    } else {
      explicitlyOffRef.current = true;
      localStorage.setItem(KEY, "off");
      el.pause();
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK}
        loop
        preload="auto"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button
        type="button"
        onClick={handleClick}
        aria-pressed={playing}
        title={playing ? "Turn music off" : "Turn music on"}
        className={cn(
          "fixed bottom-5 left-5 z-40 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
          "border border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_55%,transparent)] text-foreground backdrop-blur-sm",
          "opacity-55 transition-[opacity,color,border-color] duration-200 [transition-timing-function:var(--ease-lux)]",
          "hover:opacity-100 hover:border-[var(--gold)] hover:text-gold",
          "focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
          playing && "border-[var(--gold)] text-gold",
        )}
      >
        {playing ? <SpeakerOn size={18} /> : <SpeakerOff size={18} />}
        {/* Says what the control will do; aria-pressed carries the state,
            and both are always truthful because they read the element. */}
        <span className="sr-only">
          {playing ? "Turn background music off" : "Turn background music on"}
        </span>
      </button>
    </>
  );
}
