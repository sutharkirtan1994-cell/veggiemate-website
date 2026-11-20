import type { Metadata } from "next";
import { VideoPlayer } from "@/components/media/video-player";
import { Eyebrow } from "@/components/ui/badges";

export const metadata: Metadata = {
  title: "Introduction",
  description: "A short introduction to Sev Usal, made the Veggie Mate way.",
};

export default function IntroductionPage() {
  return (
    <section className="shell py-24 md:py-32">
      <Eyebrow>Introduction</Eyebrow>
      <h1 className="display-2 mt-5 max-w-2xl">Meet Sev Usal.</h1>
      <div className="mt-12 max-w-3xl">
        <VideoPlayer
          video={{
            src: "/video/sev-usal-introduction.mp4",
            poster: "/dishes/sev-usal.webp",
            captions: "/captions/sev-usal-introduction.vtt",
            label: "Sev Usal — introduction",
          }}
        />
      </div>
    </section>
  );
}
