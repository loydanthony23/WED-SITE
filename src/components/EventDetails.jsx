import { Church, GlassWater, MapPin, Shirt } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function VenueCard({ icon: Icon, data }) {
  return (
    <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-paper p-8 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky text-navy">
        <Icon size={24} />
      </span>
      <h3 className="mt-5 font-serif text-2xl text-navy">{data.title}</h3>
      <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-gold-deep">
        {data.time}
      </p>
      <p className="mt-4 font-serif text-xl text-ink">{data.venue}</p>
      <p className="mt-1 font-sans text-sm text-muted">{data.address}</p>
      <a
        href={data.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-navy px-5 py-2 font-sans text-xs uppercase tracking-widest text-navy transition-colors hover:bg-navy hover:text-white"
      >
        <MapPin size={14} /> View Map
      </a>
    </div>
  );
}

export default function EventDetails() {
  const { details } = config;
  return (
    <section id="details" className="section-pad bg-sky/40">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="When &amp; Where" title="The Details" />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <VenueCard icon={Church} data={details.ceremony} />
          </Reveal>
          <Reveal delay={0.1}>
            <VenueCard icon={GlassWater} data={details.reception} />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-line bg-paper shadow-sm md:grid md:grid-cols-2">
            {/* Clipart of a couple in formal attire */}
            <div className="flex items-center justify-center bg-linear-to-br from-sky/60 to-butter/50 p-8">
              <img
                src={details.dressCode.image}
                alt="Illustration of a couple in formal wedding attire"
                loading="lazy"
                className="h-56 w-full object-contain md:h-72"
              />
            </div>

            {/* Details + color palette */}
            <div className="flex flex-col px-8 py-8 text-center sm:text-left">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-butter text-gold-deep sm:mx-0">
                <Shirt size={22} />
              </span>
              <h3 className="mt-4 font-serif text-2xl text-navy">
                {details.dressCode.title}
              </h3>
              <p className="mt-2 font-sans text-sm text-muted">
                {details.dressCode.text}
              </p>

              <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-gold-deep">
                Our Palette
              </p>
              <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-3 sm:justify-start">
                {details.dressCode.palette.map((color) => (
                  <li
                    key={color.hex}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className="h-11 w-11 rounded-full border border-line shadow-sm"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <span className="font-sans text-[10px] uppercase tracking-wide text-muted">
                      {color.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
