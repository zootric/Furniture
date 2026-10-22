"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNavLeft, headerNavRight } from "@/data/site";
import { RollLink } from "@/components/ui/RollLink";
import { BrandLogo } from "./BrandLogo";
import { CartPanel } from "./CartPanel";

/** Routes that open on a full-bleed dark image; the header sits over it in light type. */
const OVERLAY_ROUTES = new Set(["/", "/contact"]);

type Panel = "menu" | "cart" | null;

export function SiteHeader() {
  const pathname = usePathname();
  const overlayRoute = OVERLAY_ROUTES.has(pathname);
  const [pastHero, setPastHero] = useState(false);
  const [openPath, setOpenPath] = useState<{ panel: Panel; path: string }>({ panel: null, path: pathname });
  // Panels close on navigation without an effect: a panel only counts as open on the route it was opened on.
  const panel = openPath.path === pathname ? openPath.panel : null;
  const setPanel = (next: Panel) => setOpenPath({ panel: next, path: pathname });

  useEffect(() => {
    if (!overlayRoute) return;
    const update = () => setPastHero(window.scrollY >= window.innerHeight - 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [overlayRoute]);

  useEffect(() => {
    if (!panel) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenPath((s) => ({ ...s, panel: null }));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  const light = (overlayRoute && !pastHero) || panel !== null;
  const solid = !overlayRoute || pastHero;
  const close = () => setPanel(null);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const linkRest = light ? "text-cream" : "text-muted";
  const linkHover = light ? "text-cream" : "text-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        panel ? "bg-footer-background" : solid ? "bg-background" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-10 focus:bg-surface focus:px-3 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>

      {/* Tablet & desktop bar */}
      <div className="hidden px-5 pt-4 tablet:block">
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between border-b pb-2 ${
            light ? "border-cream-muted" : "border-border-strong"
          }`}
        >
          <ul className="flex items-center gap-[22px]">
            {headerNavLeft.map((link) => (
              <li key={link.href}>
                <RollLink href={link.href} current={isCurrent(link.href)} restClassName={linkRest} hoverClassName={linkHover}>
                  {link.label}
                </RollLink>
              </li>
            ))}
          </ul>
          <BrandLogo className={light ? "text-cream" : "text-foreground"} />
          <ul className="flex items-center gap-8">
            {headerNavRight.map((link) => (
              <li key={link.href}>
                <RollLink href={link.href} current={isCurrent(link.href)} restClassName={linkRest} hoverClassName={linkHover}>
                  {link.label}
                </RollLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Phone bar */}
      <div className={`px-2.5 tablet:hidden ${panel ? "pt-4" : "pt-2"}`}>
        <div
          className={`flex items-center justify-between pb-[7px] ${
            panel ? "" : `border-b ${light ? "border-cream-muted" : "border-border-strong"}`
          }`}
        >
          <BrandLogo onClick={close} className={light ? "text-cream" : "text-foreground"} />
          <div className="flex items-center gap-4">
            <button
              type="button"
              className={`type-nav p-0.5 ${light ? "text-cream" : "text-muted"}`}
              aria-expanded={panel === "cart"}
              aria-controls="cart-panel"
              onClick={() => setPanel(panel === "cart" ? null : "cart")}
            >
              Cart
            </button>
            <button
              type="button"
              className={`grid size-[26px] place-items-center ${light ? "text-cream" : "text-foreground"}`}
              aria-label={panel === "menu" ? "Close menu" : "Open menu"}
              aria-expanded={panel === "menu"}
              aria-controls="mobile-menu"
              onClick={() => setPanel(panel === "menu" ? null : "menu")}
            >
              {panel === "menu" ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
                  <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {panel === "menu" && (
          <nav id="mobile-menu" aria-label="Mobile" className="pb-10 pt-1">
            <ul className="flex flex-col items-center gap-[22px]">
              {[...headerNavLeft, ...headerNavRight].map((link) => (
                <li key={link.href}>
                  <RollLink href={link.href} onClick={close} current={isCurrent(link.href)} restClassName="text-cream" hoverClassName="text-cream">
                    {link.label}
                  </RollLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {panel === "cart" && <CartPanel onClose={close} />}
      </div>
    </header>
  );
}
