import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Gallery() {
  const { gallery } = config;
  if (!gallery.images?.length) return null;

  return (
    <section id="gallery" className="section-pad bg-paper">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Memories" title="Moments" />
        <Reveal className="mx-auto mt-4 max-w-xl text-center">
          <p className="font-sans text-sm text-muted">{gallery.intro}</p>
        </Reveal>

        <div className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-4">
          {gallery.images.map((img, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.05}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full rounded-lg object-cover shadow-sm ring-1 ring-line transition-transform duration-500 hover:scale-[1.02]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
