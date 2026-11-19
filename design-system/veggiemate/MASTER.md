# Veggiemate Superfood Truck — Design System

> **Where organic meets authentic.**
>
> Source of truth for the built site. Tokens live in `src/app/globals.css`;
> this file explains the reasoning behind them. If the two disagree, the CSS is
> what ships — fix this file.
>
> Generated from the `ui-ux-pro-max` design database, then corrected against
> measured contrast. Run `npm run audit:contrast` after any colour change.

**Style:** Luxury/Premium Brand — black, gold, warm white, minimal accent.
**Pattern:** Video-First Hero + Storytelling-Driven.
**Dials:** Variance 5 (balanced) · Motion 7 (standard, slow) · Density 3 (spacious).

The DB also returned *Modern Dark (Cinema Mobile)*. That entry is
**native-mobile-scoped** — Reanimated, BlurView, haptics — so we took its visual
language (ambient gradient wash, `expo.out` easing, never pure `#000000`) and
dropped the React Native mechanics, which don't transfer to a Next.js web build.

---

## The two-act system

The site alternates between **light acts** (menu, nutrition, ordering — anywhere
text works hard) and **dark cinematic acts** (hero, platter, flavour, story,
footer). Wrapping any element in `.act-dark` rebinds the entire semantic token
set beneath it.

Components therefore only ever write `bg-background`, `text-foreground`,
`text-gold`, `border-[var(--border)]` — and are correct in both acts with no
conditional logic anywhere.

```tsx
<section className="act-dark">  {/* everything inside flips */}
  <p className="text-muted-foreground">…</p>
</section>
```

### Light act

| Role | Token | Hex | Measured |
|---|---|---|---|
| Background | `--background` | `#faf9f7` | — |
| Foreground | `--foreground` | `#0c0a09` | 18.78:1 |
| Card | `--card` | `#ffffff` | — |
| Muted surface | `--muted` | `#f0eeea` | — |
| Muted foreground | `--muted-foreground` | `#57534e` | 7.25:1 on bg · 6.58:1 on muted |
| Primary | `--primary` | `#1c1917` | on-primary 16.62:1 |
| **Gold** | `--gold` | `#8f5606` | 5.70 bg · 5.18 muted · 6.00 card · white-on 6.00 |
| Decorative rule | `--border` | `#ddd8d1` | 1.35:1 — **decorative only** |
| Control boundary | `--input` | `#8f857a` | 3.44 bg · 3.62 card · 3.12 muted |
| Destructive | `--destructive` | `#b91c1c` | 6.15:1 on bg |
| Spice gentle / warm / fierce | `--spice-1/2/3` | `#636d3f` `#8f5606` `#b91c1c` | 5.27 · 5.70 · 6.15 |

### Dark act

| Role | Token | Hex | Measured |
|---|---|---|---|
| Background | `--background` | `#0c0a09` | never `#000` — pure black smears on OLED |
| Foreground | `--foreground` | `#faf9f7` | 18.78:1 |
| Card | `--card` | `#1a1614` | — |
| Muted foreground | `--muted-foreground` | `#a8a29e` | 7.83:1 |
| **Gold** | `--gold` | `#c9a227` | 8.17 bg · 7.43 card · dark-on-gold 8.17 |
| Border / input | `--border` `--input` | `#78716c` | 4.12 bg · 3.75 card |
| Destructive | `--destructive` | `#f87171` | 7.14:1 |

---

## Four corrections to the raw DB output

The database's palette shipped values that fail in this layout. All four were
caught by `scripts/contrast-audit.mjs`, not by eye.

| DB value | Measured | Fix |
|---|---|---|
| `--accent: #a16207` (flagged "adjusted for WCAG **3:1**") | 4.25:1 on `--muted` | Deepened to `#8f5606`. Gold eyebrows sit on muted panels across the site; 3:1 was never enough for them. |
| Same gold reused on the dark ground | **4.01:1 — fails** | Dark act gets its own `#c9a227` at 8.17:1. One gold token would have silently broken half the site. |
| `--muted-foreground: #64748B` | 4.56:1, and a *cool slate* on a warm ivory | `#57534e` warm stone at 7.25:1 |
| `--border` used for input strokes too | 1.35:1 | Split. Decorative rules are exempt from WCAG 1.4.11; **control boundaries are not**, so `--input` is a genuinely darker `#8f857a`. |

The DB's own note — *"Accent adjusted from `#CA8A04` for WCAG 3:1"* — is the
tell. 3:1 is the large-text/non-text threshold. Anything carrying body copy
needs 4.5:1, and this palette carries body copy.

---

## Typography

**Playfair Display · Playfair Display SC · Karla**, via `next/font` with
`display: "swap"`.

The DB pairing named *Playfair Display SC* as the heading face. Small caps
across sentence-length headlines is mannered and hurts readability at display
sizes, so the roles were split — a deliberate deviation:

| Face | Used for |
|---|---|
| Playfair Display | All headlines (`h1`–`h4`, `.display-*`) |
| Playfair Display SC | `.eyebrow` only — section markers, labels |
| Karla | All body copy |

Karla weights 200/300 are **not loaded**: at body size on the ivory ground they
drift under comfortable contrast. 400 is the floor.

| Class | Size | Notes |
|---|---|---|
| `.display-1` | `clamp(2.75rem, 7vw, 5.5rem)` | Hero only |
| `.display-2` | `clamp(2rem, 4.5vw, 3.25rem)` | Section headings |
| `.display-3` | `clamp(1.375rem, 2.5vw, 1.75rem)` | Sub-headings |
| `.lede` | `clamp(1.0625rem, 1.6vw, 1.25rem)` | Opening paragraphs |
| body | `1rem` / 1.65 | 16px floor, never smaller |
| `.eyebrow` | `0.75rem`, `0.22em` tracking | **Only** permitted sub-14px text |
| `.prose-measure` | `max-width: 68ch` | Mandatory on long-form |

---

## Motion

The DB names **"cheap visuals + fast animations"** as the anti-pattern for this
style, so everything is slow: `expo.out` / `cubic-bezier(0.16, 1, 0.3, 1)` at
420–900ms, not the usual 200ms.

Three effects for the entire site:

1. **`<Reveal variant="fade">`** — section enters, `opacity + y:24`, 900ms
2. **`<Reveal variant="stagger">`** — direct children, 0.09s apart, **capped at 8**
3. **`<FlavourScrub>`** — the single pinned scrub section, on dish pages only

`FlavourScrub` is gated to `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`.
The DB warns that pinning fights native scroll on mobile, so below 1024px the
identical markup renders as a static grid.

**Content is visible by default.** GSAP hides elements only *inside* a
`matchMedia("no-preference")` block. Nothing is `opacity: 0` in CSS — verified:
`grep -o 'opacity:0'` returns zero matches on every rendered page. Reduced-motion
visitors, no-JS visitors and crawlers all get the complete page.

`SplitText` is not used — it is a paid GSAP Club plugin and nothing here should
depend on a licence check.

---

## Component rules

| Component | Rule |
|---|---|
| `Button` / `ButtonLink` | `cva` variants `gold` (the one conversion action) · `solid` · `outline` · `ghost`. Sizes `sm/md/lg` = `h-11/12/14` — every one clears 44px. |
| `DishCard` | Whole card is a single `<Link>`; accessible name is the dish, not "read more". **No nested interactives.** Hover changes shadow only, never bounds. |
| `Plate` | Renders `next/image` when `src` exists, otherwise a composed placeholder exposed as `role="img"` with the real alt text. Aspect ratio fixed either way, so adding photography shifts nothing. |
| `Field` | Enforces a visible `<label>`, `aria-describedby`, `aria-invalid`, and an error beside the field. No field can ship without a label. |
| `NutritionPanel` | Real `<table>`, values always visible, bars `aria-hidden`. |
| `VideoPlayer` | `preload="none"`, poster-first, click-to-play, pauses off-screen, captions required by the type. |
| Icons | One inline family, stroke 1.5, sizes 20/24/32. Zero emoji. |

### Z-index ladder

`z-10` raised · `z-20` sticky header · `z-30` popovers · `z-50` modal + drawer ·
`z-[60]` skip link. Nothing else.

---

## Nutrition: no donuts

DB chart guidance is unambiguous — pie/donut grade **C** and fail WCAG because
slices carry meaning by colour alone; radar grades **B** and needs a grouped-bar
alternative; **bar charts grade AAA**.

So macros render as a `<table>` with values always visible and a decorative bar
behind. Bars scale to the largest macro on that plate — grams against grams, no
invented reference-intake percentages.

Nutrition figures are recipe calculations, not lab analysis, and the UI says so
via `NUTRITION_DISCLAIMER`. Do not remove that line.

---

## Anti-patterns

- ❌ **Cheap visuals** — the #1 failure mode for this style. See the photography note below.
- ❌ Raw hex in components — semantic tokens only
- ❌ Reusing light-act gold on a dark ground (4.01:1, fails)
- ❌ `--border` as a control boundary — that's `--input`
- ❌ Emoji as icons
- ❌ `cursor-pointer` on non-interactive cards
- ❌ `"use client"` on static sections
- ❌ Donut or radar charts for nutrition
- ❌ Autoplaying video loops
- ❌ CAPTCHA on the order form

### The photography risk

Every placeholder in this build is deliberate and looks composed, but a premium
design carried by phone-snapshot food photos will read as **less** premium than
a modest design with good ones. Photography is the highest-leverage spend on
this project — higher than any code in the repo.

---

## Pre-delivery checklist

Run `npm run verify` (contrast audit → validation tests → production build),
then by hand:

**Accessibility**
- [ ] Tab the whole site with no mouse: skip link first, focus ring visible everywhere
- [ ] Mobile drawer traps focus and restores it to the trigger on close
- [ ] `npm run audit:contrast` passes 48/48
- [ ] Spice, diet and allergen states legible in greyscale
- [ ] Order form: submit empty, submit a bad email — errors land beside their field and are announced
- [ ] Nutrition readable as a table, independent of the bars

**Motion**
- [ ] OS reduced-motion on → all content visible, nothing animates
- [ ] JS disabled → every section renders
- [ ] Pinned flavour section tested on a mid-tier laptop, and confirmed absent below 1024px

**Responsive**
- [ ] 375 / 768 / 1024 / 1440, no horizontal scroll at any width
- [ ] Nothing hidden behind the sticky header (`scroll-margin-top: 7rem`)

**Performance**
- [ ] Lighthouse on `/` and `/menu/[slug]`: CLS < 0.1, LCP < 2.5s
- [ ] `"use client"` confined to header, order form, video player, and the two motion wrappers

**Content truth**
- [ ] Every health claim names the ingredient that earns it
- [ ] Allergens present on every dish — a safety issue, not polish
- [ ] Nutrition disclaimer still present

---

## Placeholders that must be replaced before launch

Everything here is invented or unconfirmed and marked in the source. Nothing
about the design depends on these values, but shipping them would be worse
than shipping nothing.

| What | Where | Note |
|---|---|---|
| **Platter price** | `src/content/dishes/index.ts` | `$48.00` is a round ~25%-off guess against the six dishes' full price. Not given explicitly — confirm. |
| **Crimea Park / Scarborough hours** | `src/lib/site.ts` | Days are confirmed, exact trading hours are assumed `17:00–21:00` |
| **Nutrition figures** | every dish | Recipe estimates, not lab-analysed. The disclaimer says so — keep it. |
| **Order delivery** | `src/app/order/actions.ts` | **Not wired.** Orders are logged server-side and reach nobody. |
| **All photography and video** | `Plate` / `DishVideo` | Placeholders render as composed frames until `src` is filled in |
| **Jhaal Muri photo licence** | `public/dishes/jhaal-muri.webp` | Carries a visible Adobe Stock watermark — used on the site at Kirtan's instruction, licence status not independently verified. |
