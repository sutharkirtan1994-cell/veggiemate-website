import { site } from "@/lib/site";

export interface OrderEmailPayload {
  receivedAt: string;
  item: string | undefined;
  quantity: number;
  estimatedTotal: number;
  collection: {
    pitch: string | undefined;
    date: string;
    slot: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  notes: string | null;
}

/**
 * Sends the pre-order to Resend's REST API directly — no SDK dependency for
 * what is a single POST request. Returns false on any failure (missing key,
 * network error, Resend rejecting the request) rather than throwing, because
 * a notification failure should never be what stops a customer's order from
 * completing — see the caller in actions.ts for how that's handled.
 */
export async function sendOrderEmail(order: OrderEmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[veggiemate] RESEND_API_KEY is not set — order was NOT emailed. " +
        "See .env.local.example.",
    );
    return false;
  }

  // Resend's own sandbox sender. Works immediately, no domain verification —
  // the right default until veggiematefoodtruck.au is verified in Resend.
  const from = process.env.ORDER_FROM_EMAIL || "Veggie Mate Orders <onboarding@resend.dev>";
  const to = process.env.ORDER_TO_EMAIL || site.email;

  const total = (order.estimatedTotal / 100).toFixed(2);

  const text = [
    `New pre-order — ${order.item} x${order.quantity}`,
    "",
    `Collect: ${order.collection.pitch ?? "—"}`,
    `When:    ${order.collection.date} at ${order.collection.slot}`,
    `Total:   AUD $${total} (paid at the truck)`,
    "",
    `Name:    ${order.customer.name}`,
    `Phone:   ${order.customer.phone}`,
    `Email:   ${order.customer.email}`,
    "",
    `Notes:   ${order.notes ?? "(none)"}`,
    "",
    `Received: ${order.receivedAt}`,
  ].join("\n");

  const html = `
    <h2 style="margin:0 0 12px">New pre-order</h2>
    <p style="margin:0 0 16px"><strong>${order.item}</strong> &times; ${order.quantity} — AUD $${total}</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0;color:#666">Collect</td><td>${order.collection.pitch ?? "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">When</td><td>${order.collection.date} at ${order.collection.slot}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${order.customer.name}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td><a href="tel:${order.customer.phone}">${order.customer.phone}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${order.customer.email}">${order.customer.email}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Notes</td><td>${order.notes ?? "(none)"}</td></tr>
    </table>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: order.customer.email,
        subject: `Pre-order — ${order.item} x${order.quantity}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[veggiemate] Resend rejected the order email:", await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[veggiemate] Failed to send order email:", err);
    return false;
  }
}
