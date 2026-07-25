import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Gallery() {
  const { gallery } = config;
  const images = gallery.images;
  // Index of the photo shown fullscreen, or null when the lightbox is closed.
  const [active, setActive] = useState(null);

  const isOpen = active !== null;
  const open = (i) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  if (!images?.length) return null;

  return (
    <section id="gallery" className="section-pad bg-paper">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Memories" title="Moments" />
        <Reveal className="mx-auto mt-4 max-w-xl text-center">
          <p className="font-sans text-sm text-muted">{gallery.intro}</p>
        </Reveal>

        <div className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-4">
          {images.map((img, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.05}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`View ${img.alt || "photo"} fullscreen`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-lg shadow-sm ring-1 ring-line"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
            >
              <X size={20} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:left-4"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:right-4"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={images[active].src}
                alt={images[active].alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -80) next();
                  else if (info.offset.x > 80) prev();
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-full cursor-grab rounded-xl object-contain shadow-2xl active:cursor-grabbing"
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
