import { useState } from "react";
import { Eye, EyeOff, Gift } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Inline SVG shown when a QR image file isn't in /public yet, so the section
// never displays a broken-image icon. Drop the real QR into /public and it
// replaces this automatically — no code changes needed.
function qrPlaceholder(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" rx="10" fill="#ffffff"/><rect x="12" y="12" width="136" height="136" rx="6" fill="none" stroke="#c2dbee" stroke-width="2" stroke-dasharray="6 6"/><text x="80" y="76" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#1f3a5f">${name}</text><text x="80" y="97" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#6b7480">Add your QR</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function Registry() {
  const { registry } = config;
  // Tracks which QR codes are revealed. Hidden by default so the codes only
  // show when a guest taps the eye icon for that card.
  const [revealed, setRevealed] = useState({});

  const toggle = (name) =>
    setRevealed((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <section id="registry" className="section-pad bg-paper">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading kicker="With Gratitude" title="Gifts" />
        <Reveal className="mt-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-butter text-gold-deep">
            <Gift size={24} />
          </span>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-muted sm:text-base">
            {registry.note}
          </p>
        </Reveal>
      </div>

      {registry.qrCodes?.length > 0 && (
        <Reveal className="mx-auto mt-12 max-w-5xl">
          <div className="mx-auto grid max-w-xs gap-5 sm:max-w-none sm:grid-cols-3 sm:gap-6">
            {registry.qrCodes.map((qr) => {
              const isShown = !!revealed[qr.name];
              return (
                <div
                  key={qr.name}
                  className="group flex flex-col items-center rounded-2xl border border-line/60 bg-line/40 p-4 shadow-[0_18px_40px_-28px_rgba(31,58,95,0.45)] sm:p-6"
                >
                  <p
                    className="font-sans text-xs uppercase tracking-[0.2em] text-gold-deep"
                    style={qr.color ? { color: qr.color } : undefined}
                  >
                    {qr.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggle(qr.name)}
                    aria-pressed={isShown}
                    aria-label={`${isShown ? "Hide" : "Show"} ${qr.name} QR code`}
                    className="relative mt-5 flex aspect-square w-full flex-col items-center justify-center rounded-2xl bg-white p-6 transition"
                  >
                    {isShown ? (
                      <>
                        <img
                          src={qr.image}
                          alt={`${qr.name} QR code for sending a gift`}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = qrPlaceholder(qr.name);
                          }}
                          className="h-32 w-32 object-contain sm:h-36 sm:w-36"
                        />
                        <span className="absolute right-3 top-3 text-muted/50 transition group-hover:text-muted">
                          <EyeOff size={16} />
                        </span>
                      </>
                    ) : (
                      <Eye size={32} className="text-gold/70 transition group-hover:text-gold" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center font-sans text-xs uppercase tracking-[0.15em] text-muted">
            Scan with GCash, Maya, or any bank app
          </p>
        </Reveal>
      )}
    </section>
  );
}
