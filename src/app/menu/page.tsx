import type { Metadata } from "next";
import { CATEGORY_ORDER, dishes, dishesByCategory } from "@/content/dishes";
import { CATEGORY_BLURB, CATEGORY_LABEL } from "@/lib/types";
import { DishCard } from "@/components/sections/dish-card";
import { Eyebrow } from "@/components/ui/badges";
import { Reveal } from "@/components/motion/reveal";
import { PlatterBand } from "@/components/sections/platter-band";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Sev usal, misal pav and chaats — every dish vegan or vegetarian, with full ingredients, allergens and nutrition for each.",
};

export default function MenuPage() {
  return (
    <>
      <section className="shell pb-8 pt-20 md:pt-28">
        <Eyebrow>The menu</Eyebrow>
        <h1 className="display-2 mt-5 max-w-3xl">
          Every single thing on it is vegan or vegetarian.
        </h1>
        <p className="lede prose-measure mt-7 text-muted-foreground">
          {dishes.length} dishes, two categories, and nothing padded onto the
          board that does not need to be there. Each one opens onto everything
          we know about it: where it comes from, what is in it, and what it
          does for you.
        </p>
      </section>

      {CATEGORY_ORDER.map((category) => {
        const items = dishesByCategory(category);
        if (items.length === 0) return null;

        return (
          <section key={category} className="shell py-16 md:py-20">
            <div className="rule mb-12" />
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="display-3 font-display">
                {CATEGORY_LABEL[category]}
              </h2>
              <p className="max-w-md text-muted-foreground md:text-right">
                {CATEGORY_BLURB[category]}
              </p>
            </div>

            <Reveal
              variant="stagger"
              className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((dish) => (
                <DishCard key={dish.slug} dish={dish} />
              ))}
            </Reveal>
          </section>
        );
      })}

      <PlatterBand />
    </>
  );
}
