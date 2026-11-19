/**
 * Kept out of actions.ts on purpose: a "use server" module may only export
 * async functions. Exporting this object from there compiles to `undefined`
 * on the client and the form blows up on first render.
 */

export interface OrderState {
  status: "idle" | "ok" | "error";
  /** Form-level message. Field-level problems go in fieldErrors. */
  message?: string;
  fieldErrors: Record<string, string>;
  /** Echoed back so a failed submit never wipes what was typed. */
  values: Record<string, string>;
}

export const initialOrderState: OrderState = {
  status: "idle",
  fieldErrors: {},
  values: {},
};
