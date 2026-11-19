import { NUTRITION_DISCLAIMER, type Nutrition } from "@/lib/types";

/**
 * Macros render as a real <table> with values always visible. The bars are
 * aria-hidden decoration sitting behind the numbers — the numbers are the
 * truth, so this reads identically to a screen reader and in greyscale.
 *
 * Deliberately not a donut or radar: the design DB grades pie/donut at C and
 * notes they fail WCAG because slices carry meaning by colour alone. Bar
 * charts grade AAA.
 *
 * Bars are scaled to the largest macro on the plate — grams against grams,
 * no invented reference-intake percentages.
 */

const MACROS = [
  { key: "protein", label: "Protein" },
  { key: "carbs", label: "Carbohydrate" },
  { key: "fat", label: "Fat" },
  { key: "fibre", label: "Fibre" },
] as const;

export function NutritionPanel({ nutrition }: { nutrition: Nutrition }) {
  const max = Math.max(
    ...MACROS.map((m) => nutrition[m.key as keyof Nutrition] as number),
  );

  return (
    <div>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Nutrition per serving, with macronutrients in grams
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th scope="col" className="eyebrow py-3 text-muted-foreground">
              Per serving
            </th>
            <th
              scope="col"
              className="eyebrow py-3 text-right text-muted-foreground"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[var(--border)]">
            <th scope="row" className="py-4 font-sans font-normal">
              Energy
            </th>
            <td className="py-4 text-right font-display text-2xl tabular-nums">
              {nutrition.kcal}
              <span className="ml-1 font-sans text-sm text-muted-foreground">
                kcal
              </span>
            </td>
          </tr>

          {MACROS.map((m) => {
            const value = nutrition[m.key as keyof Nutrition] as number;
            const pct = max > 0 ? Math.round((value / max) * 100) : 0;
            return (
              <tr key={m.key} className="border-b border-[var(--border)]">
                <th
                  scope="row"
                  className="w-[45%] py-4 font-sans font-normal align-middle"
                >
                  {m.label}
                </th>
                <td className="py-4 align-middle">
                  <div className="flex items-center justify-end gap-4">
                    <span
                      aria-hidden="true"
                      className="hidden h-2 flex-1 overflow-hidden rounded-full bg-[var(--muted)] sm:block"
                    >
                      <span
                        className="block h-full rounded-full bg-gold"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="shrink-0 font-display text-xl tabular-nums">
                      {value}
                      <span className="ml-0.5 font-sans text-sm text-muted-foreground">
                        g
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}

          <tr>
            <th scope="row" className="py-4 font-sans font-normal">
              Salt
            </th>
            <td className="py-4 text-right font-display text-xl tabular-nums">
              {nutrition.sodium}
              <span className="ml-1 font-sans text-sm text-muted-foreground">
                mg
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-6 text-sm text-muted-foreground prose-measure">
        {NUTRITION_DISCLAIMER}
      </p>
    </div>
  );
}
