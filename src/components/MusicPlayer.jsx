import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { config } from "../lib/config";

export default function MusicPlayer() {
  const { music } = config;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !music?.src) return;

    const targetVol = music.volume ?? 0.4;
    audio.volume = targetVol;

    // Gently ramp the volume from silent up to the target so the music
    // eases in alongside the hero reveal instead of snapping on.
    let fadeId = null;
    const fadeIn = () => {
      if (fadeId) clearInterval(fadeId);
      audio.volume = 0;
      const step = targetVol / 30;
      fadeId = setInterval(() => {
        const next = Math.min(targetVol, audio.volume + step);
        audio.volume = next;
        if (next >= targetVol) {
          clearInterval(fadeId);
          fadeId = null;
        }
      }, 60); // ~1.8s total
    };

    const events = ["pointerdown", "keydown", "touchstart", "scroll"];
    const removeGestureListeners = () =>
      events.forEach((e) => window.removeEventListener(e, onGesture));

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          fadeIn();
          removeGestureListeners();
        })
        .catch(() => {});
    };

    // Browsers block autoplay with sound, so if the first attempt is
    // rejected we wait for the guest's first interaction and start then.
    function onGesture() {
      removeGestureListeners();
      tryPlay();
    }

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // The welcome gate dispatches this on the guest's "enter" click —
    // a real user gesture, so playback is allowed.
    const onEnter = () => tryPlay();
    window.addEventListener("wed:enter", onEnter);

    if (music.autoPlay !== false) {
      events.forEach((e) =>
        window.addEventListener(e, onGesture, { passive: true })
      );
      tryPlay();
    }

    return () => {
      if (fadeId) clearInterval(fadeId);
      removeGestureListeners();
      window.removeEventListener("wed:enter", onEnter);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [music]);

  if (!music?.src) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="auto" />
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-label={playing ? "Mute music" : "Play music"}
        title={playing ? "Mute music" : "Play music"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-cream/90 text-navy shadow-md backdrop-blur transition-colors hover:bg-cream hover:text-gold-deep"
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </>
  );
}
