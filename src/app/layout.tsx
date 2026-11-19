import type { Metadata, Viewport } from "next";
import { fraunces, outfit } from "./fonts";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AmbienceToggle } from "@/components/media/ambience-toggle";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} — ${site.slogan}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.fullName,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale / userScalable deliberately left at their defaults —
  // never disable zoom.
  themeColor: "#0a1710",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${outfit.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:h-12 focus:items-center focus:rounded-sm focus:bg-gold focus:px-5 focus:text-gold-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {/* Mounted once, globally — rendering it per-page would mount a
            second <audio> element and play the track over itself. It is
            `fixed`-positioned by its own styles, so where it sits in the DOM
            doesn't matter. */}
        <AmbienceToggle />
      </body>
    </html>
  );
}
