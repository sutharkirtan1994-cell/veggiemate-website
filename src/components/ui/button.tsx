import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Every size clears 44px so each variant is a valid touch target on its own.
 * Hover changes colour and shadow only — never layout bounds, so a button in
 * a row can't nudge its neighbours.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2.5 cursor-pointer select-none",
    "font-sans font-medium tracking-wide rounded-sm",
    "transition-[background-color,color,box-shadow,border-color] duration-[240ms]",
    "[transition-timing-function:var(--ease-lux)]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ring)]",
    "disabled:pointer-events-none disabled:opacity-55",
  ],
  {
    variants: {
      variant: {
        /** The single conversion action. Gold, one per viewport. */
        gold: "bg-gold text-gold-foreground hover:brightness-110 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
        /** Brand-neutral solid. Flips correctly inside .act-dark. */
        solid:
          "bg-primary text-primary-foreground hover:opacity-90 shadow-[var(--shadow-sm)]",
        outline:
          "border border-[var(--border)] text-foreground hover:border-[var(--gold)] hover:text-gold bg-transparent",
        ghost: "text-foreground hover:text-gold bg-transparent",
      },
      size: {
        sm: "h-11 px-5 text-sm",
        md: "h-12 px-7 text-[0.9375rem]",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
