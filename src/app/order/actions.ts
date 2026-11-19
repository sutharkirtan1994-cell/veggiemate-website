"use server";

import { dishes, PLATTER_PRICE } from "@/content/dishes";
import { getPitch, pitches } from "@/lib/site";
import type { OrderState } from "@/lib/order-state";
import { validateOrder, type OrderValues } from "@/lib/order-validation";
import { sendOrderEmail } from "@/lib/send-order-email";

export async function submitOrder(
  _prev: OrderState,
  formData: FormData,
): Promise<OrderState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const values: OrderValues = {
    dish: get("dish"),
    quantity: get("quantity"),
    pitch: get("pitch"),
    date: get("date"),
    slot: get("slot"),
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    notes: get("notes"),
  };

  // --- Spam: honeypot + timing. No CAPTCHA; on a form this short it is the
  // worst accessibility regression available. ---
  if (get("company") !== "") {
    // Silently accept so a bot learns nothing from the response.
    return { status: "ok", fieldErrors: {}, values: {} };
  }
  const startedAt = Number(get("startedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 2500) {
    return {
      status: "error",
      message: "That came through a little too fast. Please try once more.",
      fieldErrors: {},
      values: { ...values },
    };
  }

  const fieldErrors = validateOrder(values, {
    orderable: ["platter", ...dishes.map((d) => d.slug)],
    pitchIds: pitches.map((p) => p.id),
    slotsByPitch: Object.fromEntries(pitches.map((p) => [p.id, p.slots])),
    today: new Date().toISOString().slice(0, 10),
  });

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Some details need another look.",
      fieldErrors,
      values: { ...values },
    };
  }

  const dish = dishes.find((d) => d.slug === values.dish);
  const quantity = Number(values.quantity);

  const unitPrice = values.dish === "platter" ? PLATTER_PRICE : (dish?.price ?? 0);
  const itemName = values.dish === "platter" ? "The Veggie Mate Platter" : dish?.name;

  const order = {
    receivedAt: new Date().toISOString(),
    item: itemName,
    quantity,
    estimatedTotal: unitPrice * quantity,
    collection: {
      pitch: getPitch(values.pitch)?.name,
      date: values.date,
      slot: values.slot,
    },
    customer: {
      name: values.name,
      email: values.email,
      phone: values.phone,
    },
    notes: values.notes || null,
  };

  // Always logged first, so the order survives even if Resend is down, the
  // key is missing, or the request fails for any reason — this line is the
  // fallback record, not a placeholder waiting to be replaced.
  console.info("[veggiemate] pre-order received", order);

  // Best-effort: a notification failure must never block the customer's
  // order from completing. If this returns false, the console.info above is
  // still the record of what happened — check the server logs.
  await sendOrderEmail(order);

  return {
    status: "ok",
    message: `Thank you, ${values.name.split(" ")[0]}. We will confirm by phone or email within a few hours.`,
    fieldErrors: {},
    values: {},
  };
}
