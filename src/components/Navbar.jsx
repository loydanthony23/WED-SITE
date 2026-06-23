import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { config, navLinks } from "../lib/config";
import AddToCalendar from "./AddToCalendar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { partnerA, partnerB, navIcon } = config.couple;

  // At the top of the page the navbar sits over the dark hero photo, so
  // switch to light text for contrast. Once scrolled (or the mobile menu
  // is open) the bar turns cream and we go back to dark text.
  const onDark = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-cream/90 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center" aria-label="Home">
          {/* icon is white — show as-is over the dark hero, darken it once
              the bar turns cream so it stays visible. */}
          <img
            src={navIcon}
            alt={`${partnerA} & ${partnerB}`}
            className={`h-9 w-auto transition-[filter] sm:h-10 ${
              onDark ? "" : "brightness-0"
            }`}
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`font-sans text-sm uppercase tracking-widest transition-colors hover:text-gold ${
                  onDark ? "text-white/85" : "text-ink/80 hover:text-gold-deep"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <AddToCalendar variant="navbar" onDark={onDark} align="right" />
          <a
            href="#rsvp"
            className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-widest transition-colors ${
              onDark
                ? "border border-white/50 text-white hover:bg-white hover:text-navy"
                : "bg-navy text-white hover:bg-blue"
            }`}
          >
            RSVP
          </a>
        </div>

        <button
          className={`transition-colors md:hidden ${
            onDark ? "text-white" : "text-navy"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-cream/95 backdrop-blur md:hidden">
          <ul className="flex flex-col px-5 py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-sm uppercase tracking-widest text-ink/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
