import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Camera, RefreshCw, Loader2 } from "lucide-react";
import { fetchMoments } from "../../lib/uploadMoments";

// How often the gallery quietly checks for new photos.
const POLL_MS = 20000;

export default function LiveGallery({ refreshSignal = 0 }) {
  const [files, setFiles] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | error
  const [lightbox, setLightbox] = useState(null);
  const seenRef = useRef(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const { files: next } = await fetchMoments();
        if (!alive) return;
        setFiles(next);
        setState("ready");
        seenRef.current = true;
      } catch {
        if (!alive) return;
        // Don't blow away photos we already have on a transient poll failure.
        setState((s) => (seenRef.current ? s : "error"));
      }
    }

    load();
    const timer = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [refreshSignal]);

  // Close the lightbox with Escape.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (state === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 py-16 font-sans text-sm text-muted">
        <Loader2 size={16} className="animate-spin" /> Loading the gallery…
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="py-16 text-center font-sans text-sm text-muted">
        <p>We couldn't load the gallery just now.</p>
        <button
          type="button"
          onClick={() => setState("loading")}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-xs uppercase tracking-widest text-navy transition-colors hover:bg-sky/50"
        >
          <RefreshCw size={14} /> Try again
        </button>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-paper/60 px-6 py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky/60 text-navy">
          <Camera size={26} />
        </span>
        <p className="mt-4 font-serif text-xl text-navy">No moments yet</p>
        <p className="mx-auto mt-1 max-w-xs font-sans text-sm text-muted">
          Be the first to share a photo — it'll appear right here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
        {files.map((f, i) => (
          <motion.button
            type="button"
            key={f.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
            onClick={() => setLightbox(f)}
            className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg ring-1 ring-line sm:mb-4"
          >
            <img
              src={f.thumbnailUrl}
              alt={f.message || f.guestName || "A shared moment"}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
            {(f.guestName || f.message) && (
              <div className="bg-paper px-3 py-2 text-left">
                {f.guestName && (
                  <p className="font-sans text-xs font-medium text-navy">
                    {f.guestName}
                  </p>
                )}
                {f.message && (
                  <p className="mt-0.5 line-clamp-2 font-sans text-xs text-muted">
                    {f.message}
                  </p>
                )}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
            >
              <X size={20} />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-3xl overflow-hidden rounded-xl bg-paper"
            >
              <img
                src={lightbox.fullUrl || lightbox.thumbnailUrl}
                alt={lightbox.message || lightbox.guestName || "A shared moment"}
                referrerPolicy="no-referrer"
                className="max-h-[76vh] w-full object-contain bg-ink/5"
              />
              {(lightbox.guestName || lightbox.message) && (
                <figcaption className="px-5 py-4">
                  {lightbox.guestName && (
                    <p className="font-serif text-lg text-navy">
                      {lightbox.guestName}
                    </p>
                  )}
                  {lightbox.message && (
                    <p className="mt-1 font-sans text-sm text-muted">
                      {lightbox.message}
                    </p>
                  )}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
