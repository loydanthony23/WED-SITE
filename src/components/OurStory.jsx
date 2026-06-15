import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function OurStory() {
  const { story } = config;
  return (
    <section id="story" className="section-pad bg-cream">
      <div className="mx-auto max-w-4xl">
        <SectionHeading kicker="Our Journey" title="Our Story" />

        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-serif text-xl italic text-blue sm:text-2xl">
            {story.intro}
          </p>
          <div className="mt-6 space-y-4 font-sans text-sm leading-relaxed text-muted sm:text-base">
            {story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-xl">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-gold/30" />
          <ul className="space-y-10">
            {story.timeline.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="relative pl-10">
                  <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-cream" />
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-deep">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-muted">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
