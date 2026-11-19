import { Play } from "@/components/icons";
import type { DishVideo as DishVideoData } from "@/lib/types";
import { VideoPlayer } from "./video-player";

/**
 * Video-shaped slot that is finished today and better later.
 *
 * With no footage it renders a composed 16:9 frame that reads as intentional
 * rather than broken. Fill in `video` on the dish record and the same slot
 * becomes a real click-to-play player — same aspect ratio, so nothing shifts.
 */
export function DishVideo({
  video,
  label,
}: {
  video?: DishVideoData;
  label: string;
}) {
  if (video) return <VideoPlayer video={video} />;

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{
        aspectRatio: "16 / 9",
        background:
          "radial-gradient(90% 120% at 50% 100%, color-mix(in srgb, var(--gold) 14%, transparent) 0%, transparent 60%), var(--muted)",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 rounded-sm border"
        style={{ borderColor: "color-mix(in srgb, var(--gold) 30%, transparent)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold)] text-gold opacity-70"
        >
          <Play size={22} />
        </span>
        <p className="font-display text-2xl">{label}</p>
        <p className="eyebrow text-muted-foreground">
          Film in production — coming shortly
        </p>
      </div>
    </div>
  );
}
