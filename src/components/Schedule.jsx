import { Church, Camera, Utensils, Music, Sparkles, Heart } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const ICONS = {
  church: Church,
  camera: Camera,
  utensils: Utensils,
  music: Music,
  sparkles: Sparkles,
  heart: Heart,
};

export default function Schedule() {
  const { schedule } = config;
  return (
    <section id="schedule" className="section-pad bg-cream">
      <div className="mx-auto max-w-2xl">
        <SectionHeading kicker="The Day" title="Order of Events" />

        <div className="relative mt-14">
          <span className="absolute bottom-4 left-6 top-4 w-px bg-gold/30 sm:left-7" />
          <ul className="space-y-8">
            {schedule.map((item, i) => {
              const Icon = ICONS[item.icon] || Heart;
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="relative flex items-start gap-5 pl-0">
                    <span className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-paper text-gold-deep shadow-sm sm:h-14 sm:w-14">
                      <Icon size={22} />
                    </span>
                    <div className="pt-1">
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-deep">
                        {item.time}
                      </p>
                      <h3 className="mt-0.5 font-serif text-2xl text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-sans text-sm text-muted">
                        {item.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
