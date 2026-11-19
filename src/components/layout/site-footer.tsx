import Link from "next/link";
import { Mail, Phone, Pin } from "@/components/icons";
import { nav, pitches, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="act-dark">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl">{site.name}</p>
            <p className="eyebrow mt-2 text-gold">{site.slogan}</p>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Vegan and vegetarian Indian street food, cooked to order from a
              truck. No shortcuts, no compromises, nothing from a packet.
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-muted-foreground">Where to find us</h2>
            <ul className="mt-5 space-y-4">
              {pitches.map((p) => (
                <li key={p.id} className="flex gap-3">
                  <Pin size={18} className="mt-1 shrink-0 text-gold" />
                  <span>
                    <span className="block">{p.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {p.area} · {p.days}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {p.hours}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-muted-foreground">Get in touch</h2>
            <p className="mt-5 text-muted-foreground">{site.contactName}</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center gap-3 py-2 transition-colors duration-200 hover:text-gold"
                >
                  <Mail size={18} className="shrink-0 text-gold" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center gap-3 py-2 transition-colors duration-200 hover:text-gold"
                >
                  <Phone size={18} className="shrink-0 text-gold" />
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>

            <nav aria-label="Footer" className="mt-8">
              <ul className="space-y-1">
                {[...nav, { href: "/order", label: "Pre-order" }].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center py-2 text-muted-foreground transition-colors duration-200 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="rule mt-16" />
        <p className="mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {site.fullName}. All dishes are vegan or
          vegetarian.
        </p>
      </div>
    </footer>
  );
}
