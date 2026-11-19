"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Check, Spinner, Warning } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, fieldClasses } from "@/components/ui/field";
import { submitOrder } from "@/app/order/actions";
import { initialOrderState } from "@/lib/order-state";
import { PLATTER_PRICE } from "@/content/dishes";
import { getPitch, pitches, site } from "@/lib/site";
import type { Dish } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface OrderFormProps {
  dishes: Pick<Dish, "slug" | "name" | "price" | "unit">[];
  /** Preselected from /menu/[slug] via ?dish= */
  preselected?: string;
}

export function OrderForm({ dishes, preselected }: OrderFormProps) {
  const [state, formAction, pending] = useActionState(
    submitOrder,
    initialOrderState,
  );
  const [startedAt] = useState(() => Date.now());
  // Collection times depend on the pitch, so the pitch has to be state.
  const [pitchId, setPitchId] = useState(pitches[0].id);
  const pitch = getPitch(pitchId) ?? pitches[0];
  const statusRef = useRef<HTMLDivElement>(null);
  const errors = state.fieldErrors;

  // On any completed submit, move focus to the status message so keyboard and
  // screen-reader users are told what happened instead of being left mid-form.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "ok") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-10 outline-none"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-gold-foreground">
          <Check size={26} />
        </span>
        <h2 className="display-3 mt-7 font-display">Order received</h2>
        <p className="prose-measure mt-4 text-muted-foreground">
          {state.message}
        </p>
        <p className="prose-measure mt-4 text-muted-foreground">
          Nothing has been charged. You pay at the truck when you collect.
        </p>
      </div>
    );
  }

  const v = state.values;

  return (
    <form action={formAction} noValidate className="space-y-8">
      <input type="hidden" name="startedAt" value={startedAt} />

      {/* Honeypot. Off-screen rather than display:none — some bots skip
          hidden fields, and this stays out of the tab order either way. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="space-y-8 border-0 p-0">
        <legend className="eyebrow mb-6 text-gold">What and how many</legend>

        <div className="grid gap-8 sm:grid-cols-[2fr_1fr]">
          <Field id="dish" label="Dish" error={errors.dish} required>
            {(p) => (
              <select
                {...p}
                name="dish"
                defaultValue={v.dish || preselected || "platter"}
                className={fieldClasses}
              >
                <option value="platter">
                  The Veggie Mate Platter — {formatPrice(PLATTER_PRICE)}
                </option>
                {dishes.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                    {d.unit ? ` (${d.unit})` : ""} — {formatPrice(d.price)}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field id="quantity" label="How many" error={errors.quantity} required>
            {(p) => (
              <input
                {...p}
                name="quantity"
                type="number"
                inputMode="numeric"
                min={1}
                max={20}
                defaultValue={v.quantity || "1"}
                className={fieldClasses}
              />
            )}
          </Field>
        </div>
      </fieldset>

      <div className="rule" />

      <fieldset className="space-y-8 border-0 p-0">
        <legend className="eyebrow mb-6 text-gold">Where and when</legend>

        <Field
          id="pitch"
          label="Collection point"
          error={errors.pitch}
          hint="We only cook where the truck is parked — pick the pitch nearest you."
          required
        >
          {(p) => (
            <select
              {...p}
              name="pitch"
              value={pitchId}
              onChange={(e) => setPitchId(e.target.value)}
              className={fieldClasses}
            >
              {pitches.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}, {option.area} — {option.days}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="grid gap-8 sm:grid-cols-2">
          <Field id="date" label="Date" error={errors.date} required>
            {(p) => (
              <input
                {...p}
                name="date"
                type="date"
                defaultValue={v.date}
                min={new Date().toISOString().slice(0, 10)}
                className={fieldClasses}
              />
            )}
          </Field>

          {/* Times come from the chosen pitch, so an impossible combination
              can't be selected in the first place. The server revalidates. */}
          <Field
            id="slot"
            label="Time"
            error={errors.slot}
            hint={`${pitch.days} · ${pitch.hours}`}
            required
          >
            {(p) => (
              <select
                {...p}
                name="slot"
                defaultValue={
                  pitch.slots.includes(v.slot) ? v.slot : pitch.slots[0]
                }
                key={pitch.id}
                className={fieldClasses}
              >
                {pitch.slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      </fieldset>

      <div className="rule" />

      <fieldset className="space-y-8 border-0 p-0">
        <legend className="eyebrow mb-6 text-gold">You</legend>

        <Field id="name" label="Name" error={errors.name} required>
          {(p) => (
            <input
              {...p}
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={v.name}
              className={fieldClasses}
            />
          )}
        </Field>

        <div className="grid gap-8 sm:grid-cols-2">
          <Field id="email" label="Email" error={errors.email} required>
            {(p) => (
              <input
                {...p}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                defaultValue={v.email}
                className={fieldClasses}
              />
            )}
          </Field>

          <Field
            id="phone"
            label="Phone"
            error={errors.phone}
            hint="So we can call if there is a problem on the day."
            required
          >
            {(p) => (
              <input
                {...p}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                defaultValue={v.phone}
                className={fieldClasses}
              />
            )}
          </Field>
        </div>

        <Field
          id="notes"
          label="Allergies or anything else"
          hint="Tell us about any allergy here and we will call you to talk it through properly."
        >
          {(p) => (
            <textarea
              {...p}
              name="notes"
              rows={4}
              defaultValue={v.notes}
              className={`${fieldClasses} h-auto py-3 leading-relaxed`}
            />
          )}
        </Field>
      </fieldset>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" variant="gold" size="lg" disabled={pending}>
          {pending ? (
            <>
              <Spinner size={18} />
              Sending
            </>
          ) : (
            "Send pre-order"
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          No payment now. You pay at the truck.
        </p>
      </div>

      {/* Height reserved so the message never shoves the layout the moment
          someone starts reading it. */}
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="min-h-14 outline-none"
      >
        {state.status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-sm border p-4 text-sm"
            style={{
              borderColor: "var(--destructive)",
              color: "var(--destructive)",
            }}
          >
            <Warning size={18} className="mt-0.5 shrink-0" />
            <span>
              {state.message} If it keeps failing, call us on{" "}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="underline underline-offset-4"
              >
                {site.phoneDisplay}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
