export const site = {
  name: "Veggie Mate",
  fullName: "Veggie Mate Superfood",
  slogan: "Crafted with Care and Spice",
  city: "Perth",
  region: "Western Australia",
  description:
    "A superfood truck in Perth serving vegan and vegetarian Indian street food — sev usal, misal pav, kachori and chaat, made from organic produce.",
  contactName: "Kirtan Suthar",
  // PLACEHOLDER: Kirtan's personal inbox, used temporarily for launch so
  // pre-orders and customer emails go somewhere real. Swap for a proper
  // business inbox (e.g. hello@veggiematefoodtruck.au) once one exists.
  email: "sutharkirtan1994@gmail.com",
  phone: "+61466987232",
  phoneDisplay: "0466 987 232",
  instagram: "https://instagram.com/veggiemate",
} as const;

/** Half-hour slots from `from` up to (but not including) `to`. */
function slots(from: string, to: string): string[] {
  const mins = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const out: string[] = [];
  for (let t = mins(from); t < mins(to); t += 30) {
    out.push(
      `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`,
    );
  }
  return out;
}

export interface Pitch {
  id: string;
  name: string;
  area: string;
  days: string;
  hours: string;
  /**
   * Collection times offered at this pitch. Per-pitch rather than global —
   * otherwise a customer can book a lunchtime slot at an evening-only pitch
   * and nobody finds out until they turn up to a closed hatch.
   */
  slots: string[];
  note?: string;
}

export const pitches: Pitch[] = [
  {
    id: "crimea-park",
    name: "Crimea Park",
    area: "Morley",
    days: "Wednesday and Friday",
    // TODO(kirtan): trading hours for Crimea Park are not confirmed —
    // these are assumed evening hours. Correct before launch.
    hours: "17:00 – 21:00",
    slots: slots("17:00", "20:30"),
    note: "Hours to be confirmed.",
  },
  {
    id: "scarborough",
    name: "Scarborough Food Market",
    area: "Scarborough",
    days: "Thursday evening",
    // TODO(kirtan): exact start and finish not given — assumed 17:00–21:00.
    hours: "17:00 – 21:00",
    slots: slots("17:00", "20:30"),
  },
  {
    id: "bardon-park",
    name: "Bardon Park",
    area: "Maylands",
    days: "Saturday and Sunday",
    hours: "10:00 – 22:00",
    slots: slots("10:00", "21:30"),
    note: "Our long day. Kitchen runs right through.",
  },
];

export function getPitch(id: string): Pitch | undefined {
  return pitches.find((p) => p.id === id);
}

/** Union of every pitch's slots — used only as a validation fallback. */
export const ALL_SLOTS = [...new Set(pitches.flatMap((p) => p.slots))].sort();

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/#find-us", label: "Find us" },
] as const;
