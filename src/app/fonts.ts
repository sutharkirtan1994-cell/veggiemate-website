import { Fraunces, Outfit } from "next/font/google";

/**
 * Fraunces + Outfit, adopted from the earlier Veggie Mate build.
 *
 * Fraunces is warmer and more characterful than a Didone-ish serif — it suits
 * "organic" far better, and gives headlines a hand-cut quality that matches a
 * truck rather than a hotel.
 *
 * Outfit is a geometric sans, which is what the truck wordmark actually is.
 * That is the reason it is here: the site and the vehicle should look related.
 *
 * Note: next/font rejects `axes` alongside explicit `weight`, so the SOFT/WONK
 * axes are left at their defaults rather than pinned.
 */

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

/**
 * Weight 200 is deliberately not loaded — at body size on the cream ground it
 * drifts under comfortable contrast. 300 is kept for large display use only.
 */
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});
