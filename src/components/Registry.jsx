import { Gift } from "lucide-react";
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
          {registry.qrCodes?.length > 0 && (
            <>
              <div className="mx-auto mt-8 grid max-w-md gap-4 sm:grid-cols-3">
                {registry.qrCodes.map((qr) => (
                  <div
                    key={qr.name}
                    className="flex flex-col items-center rounded-xl border border-line/70 bg-cream p-3"
                  >
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.18em] text-gold-deep">
                      {qr.name}
                    </p>
                    <img
                      src={qr.image}
                      alt={`${qr.name} QR code for sending a gift`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = qrPlaceholder(qr.name);
                      }}
                      className="mt-2.5 h-24 w-24 rounded-md bg-white object-contain"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-6 font-sans text-xs uppercase tracking-[0.15em] text-muted">
                Scan with GCash, Maya, or any bank app
              </p>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
