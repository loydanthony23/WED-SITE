import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { config } from "../lib/config";
import Countdown from "./Countdown";

export default function Hero() {
  const { couple, event, hero } = config;

  const fadeUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      {/* Photo background with a soft center glow so the dark monogram +
          text stay readable, while the photo shows around the edges. */}
      {hero.image && (
        <div className="absolute inset-0 -z-10">
          <img
            src={hero.image}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          {/* airy overall wash keeps the dominant-white feel */}
          <div className="absolute inset-0 bg-cream/40" />
          {/* center glow behind the monogram + text */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 42%, rgba(253,252,249,0.94) 0%, rgba(253,252,249,0.45) 45%, rgba(253,252,249,0) 72%)",
            }}
          />
          {/* fades into the navbar above and the section below */}
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-cream to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-cream to-transparent" />
        </div>
      )}

      <motion.p
        {...fadeUp}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-sans text-xs uppercase tracking-[0.32em] text-navy sm:text-sm"
      >
        {hero.kicker}
      </motion.p>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6"
      >
        <h1 className="sr-only">
          {couple.partnerA} &amp; {couple.partnerB}
        </h1>
        {couple.logo ? (
          <img
            src={couple.logo}
            alt={`${couple.partnerA} & ${couple.partnerB}`}
            // multiply blend drops the logo's white background on light bg
            className="mx-auto w-64 mix-blend-multiply sm:w-80 md:w-96"
          />
        ) : (
          <p
            aria-hidden="true"
            className="font-serif leading-[0.95] text-navy"
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
        {...fadeUp}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 max-w-md font-sans text-sm leading-relaxed text-muted sm:text-base"
      >
        {hero.subline}
      </motion.p>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 flex flex-col items-center gap-2 font-sans text-sm tracking-widest text-ink/80"
      >
        <span className="uppercase">
          {event.dayLabel} &middot; {event.dateLabel}
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <MapPin size={15} className="text-gold-deep" /> {event.cityLabel}
        </span>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <Countdown dateISO={event.dateISO} />
      </motion.div>

      <motion.a
        {...fadeUp}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        href="#rsvp"
        className="mt-12 inline-block rounded-full bg-gold px-9 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-navy shadow-sm transition-colors hover:bg-gold-deep hover:text-white"
      >
        RSVP
      </motion.a>
    </section>
  );
}
