import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music2 } from "lucide-react";
import { config } from "../lib/config";

// Envelope geometry (px). The whole thing is scaled responsively below.
const W = 360;
const H = 240;
const FLAP = 150; // height of the top flap / bottom pocket triangles

export default function WelcomeGate() {
  const { couple, event, welcome } = config;
  const enabled = welcome?.enabled !== false;
  const [open, setOpen] = useState(enabled);
  const [stage, setStage] = useState("sealed"); // "sealed" | "opening"

  const opening = stage === "opening";
  const initials = `${couple.partnerA[0]} & ${couple.partnerB[0]}`;

  // Lock background scroll while the gate is up.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!enabled) return null;

  const handleOpen = () => {
    if (opening) return;
    // The click is the user gesture that unlocks audio — tell the player.
    window.dispatchEvent(new Event("wed:enter"));

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      window.dispatchEvent(new Event("wed:reveal"));
      setOpen(false);
      return;
    }
    setStage("opening");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        >
          {/* Solid backdrop — the hero photo stays hidden behind the gate
              and is only revealed once the envelope is opened. */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, #24344b 0%, #16263e 45%, #0c1626 100%)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 font-sans text-xs uppercase tracking-[0.32em] text-white/85 sm:text-sm"
          >
            {welcome.kicker}
          </motion.p>

          {/* ---- Envelope ---- */}
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="origin-center scale-[0.82] sm:scale-100"
            style={{ perspective: 1400 }}
          >
            <button
              type="button"
              onClick={handleOpen}
              aria-label={welcome.button}
              className="relative block cursor-pointer focus:outline-none"
              style={{ width: W, height: H }}
            >
              {/* The letter — sits behind the envelope, slides up and out. */}
              <motion.div
                className="absolute overflow-hidden rounded-md bg-paper"
                style={{
                  left: 30,
                  top: 16,
                  width: W - 60,
                  height: 210,
                  zIndex: 10,
                  border: "1px solid #ece8df",
                  boxShadow: "0 18px 40px -16px rgba(0,0,0,0.45)",
                }}
                initial={false}
                animate={{ y: opening ? -168 : 0 }}
                transition={{
                  duration: 0.9,
                  delay: opening ? 0.5 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onAnimationComplete={() => {
                  if (opening) {
                    // start the hero's slow reveal as the gate fades away
                    window.dispatchEvent(new Event("wed:reveal"));
                    setOpen(false);
                  }
                }}
              >
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
                  <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-muted">
                    The wedding of
                  </p>
                  <p className="font-serif text-3xl leading-none text-navy">
                    {couple.partnerA}{" "}
                    <span className="text-gold">&amp;</span> {couple.partnerB}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
                    {event.dayLabel} &middot; {event.dateLabel}
                  </p>
                </div>
              </motion.div>

              {/* Envelope body (opaque front of the pocket). */}
              <div
                className="absolute inset-0 rounded-md"
                style={{
                  zIndex: 20,
                  background:
                    "linear-gradient(180deg, #fdfcf9 0%, #f7f1e6 100%)",
                  border: "1px solid #e7dec5",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55)",
                }}
              >
                {/* subtle fold seams for an envelope feel */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox={`0 0 ${W} ${H}`}
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d={`M0 ${H} L${W / 2} ${H - FLAP} L${W} ${H}`}
                    stroke="#e6dcc2"
                    strokeWidth="1"
                  />
                  <path
                    d={`M0 0 L${W / 2} ${FLAP - 30}`}
                    stroke="#efe7d4"
                    strokeWidth="1"
                  />
                  <path
                    d={`M${W} 0 L${W / 2} ${FLAP - 30}`}
                    stroke="#efe7d4"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Top flap — hinged at the top, swings open. */}
              <motion.div
                className="absolute left-0 top-0"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${W / 2}px solid transparent`,
                  borderRight: `${W / 2}px solid transparent`,
                  borderTop: `${FLAP}px solid #f4eedd`,
                  transformOrigin: "center top",
                  transformStyle: "preserve-3d",
                  zIndex: opening ? 5 : 30,
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.12))",
                }}
                initial={false}
                animate={{ rotateX: opening ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Wax seal over the flap tip. */}
              <motion.div
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  left: W / 2 - 34,
                  top: FLAP - 36,
                  width: 68,
                  height: 68,
                  zIndex: 40,
                  background:
                    "radial-gradient(circle at 35% 30%, #2b4a73, #1f3a5f)",
                  border: "2px solid #e2b33c",
                  boxShadow: "0 6px 14px -4px rgba(0,0,0,0.5)",
                }}
                initial={false}
                animate={{
                  scale: opening ? 0 : 1,
                  opacity: opening ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 1, 1] }}
              >
                <span className="font-serif text-lg tracking-wide text-gold">
                  {initials}
                </span>
              </motion.div>
            </button>
          </motion.div>

          {/* Tap hint. */}
          <AnimatePresence>
            {!opening && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 flex flex-col items-center gap-2"
              >
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="font-sans text-xs uppercase tracking-[0.25em] text-white/80"
                >
                  {welcome.button}
                </motion.span>
                {welcome.note && (
                  <span className="flex items-center gap-1.5 font-sans text-[11px] tracking-wide text-white/55">
                    <Music2 size={13} className="text-gold" />
                    {welcome.note}
                  </span>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
