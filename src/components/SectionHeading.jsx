// Consistent centered heading with a small gold diamond rule beneath.
export default function SectionHeading({ kicker, title, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      {kicker && (
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.28em] text-gold-deep md:text-sm">
          {kicker}
        </p>
      )}
      <h2 className="font-serif text-4xl text-navy md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-2">
        <span className="h-px w-10 bg-gold/60" />
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
        <span className="h-px w-10 bg-gold/60" />
      </div>
    </div>
  );
}
