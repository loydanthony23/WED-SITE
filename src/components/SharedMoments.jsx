import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { config } from "../lib/config";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import LiveGallery from "./moments/LiveGallery";
import { MOMENT_UPLOADED_EVENT, openUploadModal } from "../lib/shareEntry";

export default function SharedMoments() {
  const { sharedMoments: sm } = config;
  const [refresh, setRefresh] = useState(0);

  // A photo uploaded through the modal fires this event — refetch the gallery
  // right away instead of waiting for its next poll.
  useEffect(() => {
    const bump = () => setRefresh((n) => n + 1);
    window.addEventListener(MOMENT_UPLOADED_EVENT, bump);
    return () => window.removeEventListener(MOMENT_UPLOADED_EVENT, bump);
  }, []);

  return (
    <section id="shared-moments" className="section-pad bg-cream">
      <div className="mx-auto max-w-3xl">
        <SectionHeading kicker={sm.kicker} title={sm.title} />
        <Reveal className="mx-auto mt-4 max-w-xl text-center">
          <p className="font-sans text-sm text-muted">{sm.intro}</p>
          <button
            type="button"
            onClick={openUploadModal}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:bg-gold-deep hover:text-white"
          >
            <Upload size={16} /> Share a photo
          </button>
        </Reveal>

        <div className="mt-10">
          <LiveGallery refreshSignal={refresh} />
        </div>
      </div>
    </section>
  );
}
