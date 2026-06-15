import { BedDouble, ExternalLink } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Travel() {
  const { travel } = config;
  if (!travel.hotels?.length) return null;

  return (
    <section id="travel" className="section-pad bg-cream">
      <div className="mx-auto max-w-3xl">
        <SectionHeading kicker="Out of Town" title="Where to Stay" />
        <Reveal className="mx-auto mt-4 max-w-xl text-center">
          <p className="font-sans text-sm text-muted">{travel.note}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {travel.hotels.map((h, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm transition-colors hover:border-gold/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky text-navy">
                  <BedDouble size={20} />
                </span>
                <div>
                  <h3 className="flex items-center gap-1.5 font-serif text-xl text-navy">
                    {h.name}
                    <ExternalLink
                      size={14}
                      className="text-muted transition-colors group-hover:text-gold-deep"
                    />
                  </h3>
                  <p className="mt-1 font-sans text-sm text-muted">{h.info}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
