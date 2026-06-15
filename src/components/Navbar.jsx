import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { config, navLinks } from "../lib/config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { partnerA, partnerB } = config.couple;
  const monogram = `${partnerA[0]} & ${partnerB[0]}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-cream/90 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-serif text-2xl tracking-wide text-navy">
          {monogram}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-sans text-sm uppercase tracking-widest text-ink/80 transition-colors hover:text-gold-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#rsvp"
          className="hidden rounded-full bg-navy px-5 py-2 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-blue md:inline-block"
        >
          RSVP
        </a>

        <button
          className="text-navy md:hidden"
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
