"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Close, Menu } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Route change closes the drawer.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Escape to close, Tab trapped inside the panel, focus restored on close.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      (triggerRef.current ?? previouslyFocused)?.focus();
    };
  }, [open, close]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-md">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label={`${site.fullName} — home`}
        >
          <span className="font-display text-2xl tracking-tight">
            {site.name}
          </span>
          <span className="eyebrow mt-1 text-muted-foreground transition-colors duration-200 group-hover:text-gold">
            Superfood Truck
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative py-2 text-[0.9375rem] transition-colors duration-200 hover:text-gold",
                  isActive(item.href) ? "text-gold" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ButtonLink
            href="/order"
            variant="gold"
            size="sm"
            className="hidden md:inline-flex"
          >
            Pre-order
          </ButtonLink>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
            className="-mr-2 inline-flex h-12 w-12 cursor-pointer items-center justify-center text-foreground transition-colors duration-200 hover:text-gold md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-pointer bg-black/55 backdrop-blur-sm"
            />
            <div
              id="mobile-nav"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              className="act-dark absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col gap-2 p-6 shadow-[var(--shadow-lg)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="eyebrow text-gold">Menu</span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="-mr-2 inline-flex h-12 w-12 cursor-pointer items-center justify-center text-foreground transition-colors duration-200 hover:text-gold"
                >
                  <Close size={24} />
                </button>
              </div>

              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-[var(--border)] py-4 font-display text-2xl text-foreground transition-colors duration-200 hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}

              <ButtonLink href="/order" variant="gold" size="lg" className="mt-8">
                Pre-order
              </ButtonLink>

              <p className="mt-auto text-sm text-muted-foreground">
                {site.slogan}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
