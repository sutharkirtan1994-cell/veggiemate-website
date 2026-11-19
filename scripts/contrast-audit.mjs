/**
 * WCAG contrast audit for the Veggiemate token set.
 *
 *   node scripts/contrast-audit.mjs
 *
 * Every foreground/background pair the site actually renders is listed here.
 * Run it after touching globals.css — the whole two-act system depends on
 * these staying true, and a single wrong gold silently breaks half the site.
 */

const hex = (h) => {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
};

const lum = (h) => {
  const [r, g, b] = hex(h).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const LIGHT = {
  background: "#f7f1e1",
  foreground: "#0b1f14",
  card: "#ffffff",
  muted: "#eee6d2",
  mutedForeground: "#55635a",
  primary: "#0b1f14",
  primaryForeground: "#f7f1e1",
  gold: "#8f5606",
  goldForeground: "#ffffff",
  herb: "#3f6b34",
  chilli: "#a83522",
  border: "#ddd4bd",
  input: "#7f7d70",
  destructive: "#a83522",
  spice1: "#3f6b34",
  spice2: "#8f5606",
  spice3: "#a83522",
};

const DARK = {
  background: "#0a1710",
  foreground: "#f7f1e1",
  card: "#111d16",
  muted: "#16241c",
  mutedForeground: "#a9b5a6",
  primary: "#f7f1e1",
  primaryForeground: "#0a1710",
  gold: "#e8a93d",
  goldForeground: "#0a1710",
  herb: "#96c47f",
  chilli: "#e9705a",
  border: "#2a3a30",
  input: "#667a6a",
  destructive: "#e9705a",
  spice1: "#96c47f",
  spice2: "#e8a93d",
  spice3: "#e9705a",
};

// [label, fg, bg, threshold]
// 4.5 = body text · 3.0 = large text (>=24px) and non-text UI boundaries
const cases = (t, p) => [
  [`${p} body on background`, t.foreground, t.background, 4.5],
  [`${p} body on card`, t.foreground, t.card, 4.5],
  [`${p} body on muted`, t.foreground, t.muted, 4.5],
  [`${p} muted-fg on background`, t.mutedForeground, t.background, 4.5],
  [`${p} muted-fg on card`, t.mutedForeground, t.card, 4.5],
  [`${p} muted-fg on muted`, t.mutedForeground, t.muted, 4.5],
  [`${p} gold text on background`, t.gold, t.background, 4.5],
  [`${p} gold text on card`, t.gold, t.card, 4.5],
  [`${p} gold text on muted`, t.gold, t.muted, 4.5],
  [`${p} on-gold on gold (CTA label)`, t.goldForeground, t.gold, 4.5],
  [`${p} on-primary on primary`, t.primaryForeground, t.primary, 4.5],
  [`${p} destructive on background`, t.destructive, t.background, 4.5],
  [`${p} destructive on card`, t.destructive, t.card, 4.5],
  [`${p} destructive on muted`, t.destructive, t.muted, 4.5],
  [`${p} spice-1 on background`, t.spice1, t.background, 4.5],
  [`${p} spice-2 on background`, t.spice2, t.background, 4.5],
  [`${p} spice-3 on background`, t.spice3, t.background, 4.5],
  [`${p} spice-1 on muted`, t.spice1, t.muted, 4.5],
  [`${p} herb text on background`, t.herb, t.background, 4.5],
  [`${p} herb text on muted`, t.herb, t.muted, 4.5],
  [`${p} chilli text on background`, t.chilli, t.background, 4.5],
  [`${p} chilli text on card`, t.chilli, t.card, 4.5],
  // --input is a control boundary: WCAG 1.4.11 applies, 3:1 required.
  [`${p} input border on background`, t.input, t.background, 3.0],
  [`${p} input border on card`, t.input, t.card, 3.0],
  [`${p} input border on muted`, t.input, t.muted, 3.0],
  [`${p} focus ring on background`, t.gold, t.background, 3.0],
  [`${p} focus ring on card`, t.gold, t.card, 3.0],
  // --border is decorative (rules, card edges) and exempt from 1.4.11 —
  // listed at 1.0 purely so its value is visible in the report.
  [`${p} decorative rule on background`, t.border, t.background, 1.0],
];

const all = [...cases(LIGHT, "LIGHT"), ...cases(DARK, "DARK ")];

let failed = 0;
for (const [label, fg, bg, min] of all) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${label}`,
  );
}

console.log(
  `\n${all.length - failed}/${all.length} passed` +
    (failed ? ` — ${failed} FAILING` : ""),
);
process.exit(failed ? 1 : 0);
