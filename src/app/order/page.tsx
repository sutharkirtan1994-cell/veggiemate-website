import type { Metadata } from "next";
import { Clock, Pin } from "@/components/icons";
import { OrderForm } from "@/components/sections/order-form";
import { Eyebrow } from "@/components/ui/badges";
import { dishes } from "@/content/dishes";
import { pitches } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-order",
  description:
    "Reserve a platter or a dish for collection from the truck. No payment online — you pay when you collect.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ dish?: string }>;
}) {
  const { dish } = await searchParams;

  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
        <div>
          <Eyebrow>Pre-order</Eyebrow>
          <h1 className="display-2 mt-5">Reserve it, then walk straight up.</h1>
          <p className="lede prose-measure mt-7 text-muted-foreground">
            Tell us what you want and when you will be there. We will confirm by
            phone or email, cook it to land at your slot, and you pay at the
            truck. Nothing is taken now.
          </p>

          <div className="mt-14">
            <OrderForm
              dishes={dishes.map((d) => ({
                slug: d.slug,
                name: d.name,
                price: d.price,
                unit: d.unit,
              }))}
              preselected={dish}
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-sm border border-[var(--border)] bg-[var(--muted)] p-8">
            <h2 className="eyebrow text-muted-foreground">Where we are</h2>
            <ul className="mt-7 space-y-8">
              {pitches.map((pitch) => (
                <li key={pitch.id}>
                  <p className="flex items-start gap-3 font-display text-xl">
                    <Pin size={20} className="mt-1 shrink-0 text-gold" />
                    {pitch.name}
                  </p>
                  <p className="mt-2 pl-8 text-muted-foreground">
                    {pitch.area}
                  </p>
                  <p className="mt-2 flex items-center gap-2 pl-8 text-sm text-muted-foreground">
                    <Clock size={15} className="shrink-0 text-gold" />
                    {pitch.days} · {pitch.hours}
                  </p>
                  {pitch.note && (
                    <p className="mt-2 pl-8 text-sm text-gold">{pitch.note}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
