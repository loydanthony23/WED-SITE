import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Images } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Uploader from "./moments/Uploader";
import LiveGallery from "./moments/LiveGallery";

const TABS = [
  { key: "share", label: "Share a photo", icon: Upload },
  { key: "gallery", label: "Live gallery", icon: Images },
];

export default function SharedMoments() {
  const { sharedMoments: sm } = config;
  const [tab, setTab] = useState("share");
  const [refresh, setRefresh] = useState(0);

  // Bumping this makes the gallery refetch right away after an upload,
  // instead of waiting for its next poll.
  const bumpGallery = useCallback(() => setRefresh((n) => n + 1), []);
  const goToGallery = useCallback(() => setTab("gallery"), []);

  return (
    <section id="shared-moments" className="section-pad bg-cream">
      <div className="mx-auto max-w-3xl">
        <SectionHeading kicker={sm.kicker} title={sm.title} />
        <Reveal className="mx-auto mt-4 max-w-xl text-center">
          <p className="font-sans text-sm text-muted">{sm.intro}</p>
        </Reveal>

        {/* Tabs */}
        <div className="mt-9 flex justify-center">
          <div className="inline-flex rounded-full border border-line bg-paper p-1">
            {TABS.map((t) => {
              const active = tab === t.key;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-widest transition-colors ${
                    active ? "text-navy" : "text-muted hover:text-navy"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="moments-tab"
                      className="absolute inset-0 rounded-full bg-butter/70"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon size={14} /> {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panels */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {tab === "share" ? (
              <motion.div
                key="share"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Uploader
                  onUploaded={bumpGallery}
                  onViewGallery={goToGallery}
                />
              </motion.div>
            ) : (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <LiveGallery refreshSignal={refresh} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
