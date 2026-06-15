import { Gift } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

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
          {registry.links?.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {registry.links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-navy px-6 py-3 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-blue"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
