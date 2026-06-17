import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { config } from "../lib/config";
import Countdown from "./Countdown";

export default function Hero() {
  const { couple, event, hero, welcome } = config;

  // Stay hidden until the welcome gate is opened — then everything fades
  // in slowly. If the gate is disabled, reveal right away on load.
  const [revealed, setRevealed] = useState(
    () => welcome?.enabled === false
  );

  useEffect(() => {
    const onReveal = () => setRevealed(true);
    window.addEventListener("wed:reveal", onReveal);
    return () => window.removeEventListener("wed:reveal", onReveal);
  }, []);

  // Per-element fade-up that only plays once `revealed` flips to true.
  const reveal = (delay) => ({
    initial: false,
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      {/* Full-bleed photo with layered scrims. Hidden until the gate opens,
          then it fades in as the slow reveal. */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={false}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        {hero.image && (
          <img
            src={hero.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        )}
        {/* overall wash for baseline legibility */}
        <div className="absolute inset-0 bg-black/45" />
        {/* soft dark glow centered behind the logo + text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 72%)",
          }}
        />
        {/* soft top scrim keeps the navbar links legible */}
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/40 to-transparent" />
        {/* gentle fade into the cream section below */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-cream to-transparent" />
      </motion.div>

      <motion.p
        {...reveal(0)}
        className="font-sans text-xs uppercase tracking-[0.32em] text-white/85 sm:text-sm"
      >
        {hero.kicker}
      </motion.p>

      <motion.div {...reveal(0.1)} className="mt-6">
        <h1 className="sr-only">
          {couple.partnerA} &amp; {couple.partnerB}
        </h1>
        {couple.logo ? (
          <img
            src={couple.logo}
            alt={`${couple.partnerA} & ${couple.partnerB}`}
            className="mx-auto w-64 sm:w-80 md:w-96"
          />
        ) : (
          <p
            aria-hidden="true"
            className="font-serif leading-[0.95] text-white"
          >
            <span className="block text-6xl sm:text-7xl md:text-8xl">
              {couple.partnerA}
            </span>
            <span className="my-1 block text-3xl text-gold sm:text-4xl">
              &amp;
            </span>
            <span className="block text-6xl sm:text-7xl md:text-8xl">
              {couple.partnerB}
            </span>
          </p>
        )}
      </motion.div>

      <motion.p
        {...reveal(0.25)}
        className="mt-7 max-w-md font-sans text-sm leading-relaxed text-white/85 sm:text-base"
      >
        {hero.subline}
      </motion.p>

      <motion.div
        {...reveal(0.35)}
        className="mt-7 flex flex-col items-center gap-2 font-sans text-sm tracking-widest text-white/80"
      >
        <span className="uppercase">
          {event.dayLabel} &middot; {event.dateLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={15} className="text-gold" /> {event.cityLabel}
        </span>
      </motion.div>

      <motion.div {...reveal(0.5)} className="mt-10">
        <Countdown dateISO={event.dateISO} light />
      </motion.div>

      <motion.div
        {...reveal(0.65)}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#rsvp"
          className="inline-block min-w-48 rounded-full bg-gold px-9 py-3.5 text-center font-sans text-xs uppercase tracking-[0.2em] text-navy shadow-sm transition-colors hover:bg-gold-deep hover:text-white"
        >
          RSVP
        </a>
        <a
          href="#story"
          className="inline-block min-w-48 rounded-full border border-white/60 px-9 py-3.5 text-center font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-navy"
        >
          Our Story
        </a>
      </motion.div>
    </section>
  );
}
