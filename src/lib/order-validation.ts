/**
 * Pure validation for the pre-order form.
 *
 * Deliberately free of imports and path aliases so it can be exercised
 * directly by scripts/test-order-validation.mjs without a Next runtime — the
 * validation rules are the part most worth testing, and burying them inside a
 * server action would make them reachable only through a browser.
 */

export interface OrderValues {
  dish: string;
  quantity: string;
  pitch: string;
  date: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface ValidationContext {
  orderable: string[];
  pitchIds: string[];
  /**
   * Collection times per pitch id. Checked against the *chosen* pitch, not a
   * global list — a lunchtime slot at an evening-only pitch has to be rejected
   * here, or the customer turns up to a closed hatch.
   */
  slotsByPitch: Record<string, string[]>;
  /** ISO yyyy-mm-dd. Injected so tests aren't time-dependent. */
  today: string;
}

/** Loose on purpose — real addresses are stranger than most regexes allow. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateOrder(
  v: OrderValues,
  ctx: ValidationContext,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!ctx.orderable.includes(v.dish)) {
    errors.dish = "Choose what you would like.";
  }

  const qty = Number(v.quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
    errors.quantity = "Enter a whole number between 1 and 20.";
  }

  if (!ctx.pitchIds.includes(v.pitch)) {
    errors.pitch = "Choose where you will collect.";
  }

  if (!v.date) {
    errors.date = "Choose a collection date.";
  } else if (v.date < ctx.today) {
    errors.date = "That date has passed. Pick today or later.";
  }

  // Only meaningful once the pitch itself is valid.
  if (!errors.pitch) {
    const allowed = ctx.slotsByPitch[v.pitch] ?? [];
    if (!allowed.includes(v.slot)) {
      errors.slot = v.slot
        ? "We are not open at that time on this pitch. Pick another."
        : "Choose a collection time.";
    }
  }

  if (v.name.trim().length < 2) {
    errors.name = "Tell us the name for the order.";
  }

  if (!EMAIL.test(v.email)) {
    errors.email = "Enter an email we can reply to.";
  }

  const digits = (v.phone.match(/\d/g) ?? []).length;
  if (digits < 10) {
    errors.phone = "Enter a phone number we can reach you on.";
  }

  return errors;
}
