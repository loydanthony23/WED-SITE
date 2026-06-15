import { Mail, Phone } from "lucide-react";
import { config } from "../lib/config";

export default function Footer() {
  const { couple, event, contact } = config;
  return (
    <footer className="bg-navy px-6 py-16 text-center text-white">
      <p className="font-sans text-xs uppercase tracking-[0.28em] text-butter">
        {event.dateLabel}
      </p>
      <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
        {couple.partnerA} <span className="text-gold">&amp;</span> {couple.partnerB}
      </h2>
      <p className="mt-3 font-sans text-sm tracking-widest text-white/70">
        {couple.hashtag}
      </p>

      <div className="mx-auto mt-8 flex max-w-md flex-col items-center justify-center gap-3 text-sm text-white/80 sm:flex-row sm:gap-8">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2 transition-colors hover:text-gold"
        >
          <Mail size={16} /> {contact.email}
        </a>
        <a
          href={`tel:${contact.phone}`}
          className="flex items-center gap-2 transition-colors hover:text-gold"
        >
          <Phone size={16} /> {contact.phone}
        </a>
      </div>

      <p className="mt-10 font-sans text-xs text-white/40">
        With love, {couple.partnerA} &amp; {couple.partnerB}
      </p>
    </footer>
  );
}
