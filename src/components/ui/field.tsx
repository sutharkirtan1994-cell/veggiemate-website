import type { ReactNode } from "react";
import { Warning } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * One wrapper so no field on this site can ship without a visible label, and
 * so every error lands beside its own input rather than in a pile at the top.
 *
 * Inputs are h-12 with 16px text — below 16px iOS zooms on focus and the
 * layout jumps mid-form.
 */

export const fieldClasses = cn(
  "h-12 w-full rounded-sm border bg-[var(--card)] px-4 text-base text-foreground",
  "border-[var(--input)] transition-colors duration-200",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
  "aria-[invalid=true]:border-[var(--destructive)]",
);

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean;
    required: boolean;
  }) => ReactNode;
}

export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  className,
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-[0.9375rem] font-medium">
        {label}
        {required && (
          <>
            {/* Marked twice: the asterisk is a sighted convention, `required`
                on the control is what assistive tech actually reads. */}
            <span aria-hidden="true" className="ml-1 text-gold">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": Boolean(error),
        required,
      })}

      {hint && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-2 text-sm"
          style={{ color: "var(--destructive)" }}
        >
          <Warning size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
