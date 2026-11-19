import type { SVGProps } from "react";

/**
 * One icon family, one stroke weight (1.5), one set of sizes (16/20/24).
 * Kept inline so the whole site can never drift into mixed icon styles, and
 * so nothing here is an emoji.
 *
 * All are decorative by default (aria-hidden). Any icon carrying meaning on
 * its own must be given a title by the caller, or paired with a text label.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ArrowLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Base>
);

export const Leaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z" />
    <path d="M4 21c2-6 6-9 11-11" />
  </Base>
);

export const Flame = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s1 1 1 2c0-3 3-5 3-8Z" />
  </Base>
);

export const Sprout = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21v-8" />
    <path d="M12 13C12 9 9 7 5 7c0 4 3 6 7 6Z" />
    <path d="M12 13c0-3 2-5 6-5 0 3-2 5-6 5Z" />
  </Base>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Base>
);

export const Pin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </Base>
);

export const Warning = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4.5 2.8 20h18.4L12 4.5Z" />
    <path d="M12 10v4M12 17h.01" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Base>
);

export const Play = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </Base>
);

export const Pause = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 5v14M15 5v14" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Camera = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 8h3.5L8 5.5h8L17.5 8H21v11H3V8Z" />
    <circle cx="12" cy="13" r="3.5" />
  </Base>
);

export const SpeakerOn = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9v6h3.5L12 19V5L7.5 9H4Z" />
    <path d="M16 9.2a4 4 0 0 1 0 5.6" />
    <path d="M18.6 6.6a7.5 7.5 0 0 1 0 10.8" />
  </Base>
);

export const SpeakerOff = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9v6h3.5L12 19V5L7.5 9H4Z" />
    <path d="m16.5 10 4 4M20.5 10l-4 4" />
  </Base>
);

export const Spinner = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
    className="animate-spin"
    {...props}
  >
    <circle cx="12" cy="12" r="9" opacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" />
  </svg>
);
