import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { config } from "../../lib/config";
import Uploader from "./Uploader";
import {
  isDirectShareEntry,
  OPEN_UPLOAD_EVENT,
  MOMENT_UPLOADED_EVENT,
} from "../../lib/shareEntry";

// A globally mounted "share a photo" modal. It opens when any trigger fires
// the OPEN_UPLOAD_EVENT (navbar button, section CTA) and, so QR guests land
// straight on it, opens itself on a Shared Moments deep link.
export default function UploadModal() {
  const { sharedMoments: sm } = config;
  // Compute once on mount so a QR deep-link opens without a flash of the page.
  const [open, setOpen] = useState(isDirectShareEntry);

  const close = useCallback(() => setOpen(false), []);

  // Listen for open requests from anywhere on the page.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_UPLOAD_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_UPLOAD_EVENT, onOpen);
  }, []);

  // Lock background scroll and allow Escape to close while the modal is up.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Tell the live gallery a new photo just landed so it refetches now.
  const handleUploaded = useCallback(() => {
    window.dispatchEvent(new Event(MOMENT_UPLOADED_EVENT));
  }, []);

  // "See the gallery" from the success screen: close and scroll to it.
  const handleViewGallery = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      document
        .getElementById("shared-moments")
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, 250);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          className="fixed inset-0 z-[70] flex items-stretch justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={sm.title}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full w-full flex-col bg-cream shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4 sm:rounded-t-2xl">
              <div>
                {sm.kicker && (
                  <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-gold-deep">
                    {sm.kicker}
                  </p>
                )}
                <h2 className="mt-1 font-serif text-2xl leading-none text-navy">
                  {sm.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-sky/60 hover:text-navy"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 py-6">
              <p className="font-sans text-sm leading-relaxed text-muted">
                {sm.intro}
              </p>
              <div className="mt-6">
                <Uploader
                  onUploaded={handleUploaded}
                  onViewGallery={handleViewGallery}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
