import { Clock, Pin } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badges";
import { Reveal } from "@/components/motion/reveal";
import { pitches } from "@/lib/site";

/**
 * A pre-order is worthless if nobody can find the truck, so the pitches are
 * on the home page rather than buried on a page of their own.
 */
export function FindUs() {
  return (
    <Reveal as="section" id="find-us" className="shell py-20 md:py-28">
      <div className="rule mb-14" />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <Eyebrow>Find us</Eyebrow>
          <h2 className="display-2 mt-5">Three pitches, one truck.</h2>
          <p className="prose-measure mt-6 text-muted-foreground">
            We cook where we are parked. Check the day before you travel — if
            the weather turns we post it on Instagram first.
          </p>
          <ButtonLink href="/order" variant="outline" size="md" className="mt-8">
            Pre-order for collection
          </ButtonLink>
        </div>

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {pitches.map((pitch) => (
            <li key={pitch.id}>
              <Pin size={22} className="text-gold" />
              <h3 className="mt-4 font-display text-2xl">{pitch.name}</h3>
              <p className="mt-2 text-muted-foreground">{pitch.area}</p>
              <p className="mt-4 flex items-center gap-2 text-[0.9375rem]">
                <Clock size={16} className="shrink-0 text-gold" />
                {pitch.days}
              </p>
              <p className="mt-1 pl-6 text-[0.9375rem] text-muted-foreground">
                {pitch.hours}
              </p>
              {pitch.note && (
                <p className="mt-4 border-l border-[var(--border)] pl-4 text-sm text-muted-foreground">
                  {pitch.note}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
