/**
 * node scripts/test-order-validation.mjs
 *
 * Exercises the pre-order rules directly. Node 24 strips the TypeScript, so
 * this needs no build step and no browser.
 */

import { validateOrder } from "../src/lib/order-validation.ts";

const ctx = {
  orderable: ["platter", "sev-usal", "misal-pav", "raj-kachori", "jhaal-muri", "dahi-puri", "ragda-pattice"],
  pitchIds: ["crimea-park", "bardon-park"],
  // Per-pitch: an evening-only pitch and an all-day one.
  slotsByPitch: {
    "crimea-park": ["17:00", "18:00"],
    "bardon-park": ["10:00", "12:00", "18:00", "21:00"],
  },
  today: "2026-07-28",
};

const valid = {
  dish: "platter",
  quantity: "2",
  pitch: "crimea-park",
  date: "2026-07-30",
  slot: "18:00",
  name: "Priya Shah",
  email: "priya@example.com",
  phone: "07700 900123",
  notes: "",
};

let failures = 0;

function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures++;
    console.log(`FAIL  ${name}`);
    console.log(`      expected ${JSON.stringify(expected)}`);
    console.log(`      actual   ${JSON.stringify(actual)}`);
  } else {
    console.log(`PASS  ${name}`);
  }
}

const keys = (v) => Object.keys(validateOrder(v, ctx)).sort();

check("a complete valid order has no errors", keys(valid), []);

// Slot is deliberately absent here. Valid times depend on the pitch, so with
// no pitch chosen there is nothing to check the slot against — flagging both
// would just be noise, and the UI populates a valid default the moment a pitch
// is picked.
check("empty form flags every required field except slot", keys({
  dish: "", quantity: "", pitch: "", date: "", slot: "",
  name: "", email: "", phone: "", notes: "",
}), ["date", "dish", "email", "name", "phone", "pitch", "quantity"]);

check("malformed email is caught", keys({ ...valid, email: "priya@example" }), ["email"]);
check("email with no @ is caught", keys({ ...valid, email: "priya.example.com" }), ["email"]);
check("past date is rejected", keys({ ...valid, date: "2026-07-27" }), ["date"]);
check("today is accepted", keys({ ...valid, date: ctx.today }), []);
check("quantity 0 rejected", keys({ ...valid, quantity: "0" }), ["quantity"]);
check("quantity 21 rejected", keys({ ...valid, quantity: "21" }), ["quantity"]);
check("fractional quantity rejected", keys({ ...valid, quantity: "2.5" }), ["quantity"]);
check("non-numeric quantity rejected", keys({ ...valid, quantity: "two" }), ["quantity"]);
check("short phone rejected", keys({ ...valid, phone: "0770" }), ["phone"]);
check("formatted phone accepted", keys({ ...valid, phone: "+44 (0) 7700 900123" }), []);
check("one-character name rejected", keys({ ...valid, name: "P" }), ["name"]);
check("whitespace-only name rejected", keys({ ...valid, name: "   " }), ["name"]);
check("unknown dish rejected", keys({ ...valid, dish: "pizza" }), ["dish"]);
check("each menu dish is individually orderable", keys({ ...valid, dish: "jhaal-muri" }), []);
check("unknown pitch rejected", keys({ ...valid, pitch: "moon" }), ["pitch"]);
check("unknown slot rejected", keys({ ...valid, slot: "03:00" }), ["slot"]);

/* ---------------- Per-pitch opening hours ---------------- */
check(
  "a morning slot is rejected at an evening-only pitch",
  keys({ ...valid, pitch: "crimea-park", slot: "10:00" }),
  ["slot"],
);
check(
  "that same morning slot is fine at the all-day pitch",
  keys({ ...valid, pitch: "bardon-park", slot: "10:00" }),
  [],
);
check(
  "a late slot is rejected at the evening-only pitch",
  keys({ ...valid, pitch: "crimea-park", slot: "21:00" }),
  ["slot"],
);
check(
  "slot is not also flagged when the pitch itself is invalid",
  keys({ ...valid, pitch: "moon", slot: "10:00" }),
  ["pitch"],
);
check("notes are optional", keys({ ...valid, notes: "" }), []);

console.log(failures ? `\n${failures} FAILING` : "\nAll passed");
process.exit(failures ? 1 : 0);
