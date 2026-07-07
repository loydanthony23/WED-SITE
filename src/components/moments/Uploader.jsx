import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ImagePlus,
  Camera,
  X,
  RotateCw,
  Check,
  PartyPopper,
  AlertCircle,
  Images,
} from "lucide-react";
import { config } from "../../lib/config";
import { uploadMoment } from "../../lib/uploadMoments";

const inputCls =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold focus:ring-1 focus:ring-gold/40";
const labelCls =
  "mb-1.5 block font-sans text-xs uppercase tracking-widest text-navy";

// Monotonic id so React keys stay stable as items come and go.
let seq = 0;
const MAX_CONCURRENT = 3;

export default function Uploader({ onUploaded, onViewGallery }) {
  const { sharedMoments: sm } = config;
  const maxBytes = sm.maxFileSizeMB * 1024 * 1024;

  const [items, setItems] = useState([]); // { id, file, url, status, progress, error }
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — must stay empty
  const [phase, setPhase] = useState("idle"); // idle | uploading | done
  const [notice, setNotice] = useState("");

  const pickRef = useRef(null);
  const camRef = useRef(null);

  // Revoke every object URL we ever created when the component unmounts.
  useEffect(() => {
    return () => items.forEach((it) => it.url && URL.revokeObjectURL(it.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patch = (id, next) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...next } : it)));

  function addFiles(fileList) {
    setNotice("");
    const incoming = Array.from(fileList || []);
    const accepted = [];

    for (const file of incoming) {
      if (!file.type.startsWith("image/")) {
        setNotice("Only photos can be shared here.");
        continue;
      }
      if (file.size > maxBytes) {
        setNotice(`Each photo needs to be under ${sm.maxFileSizeMB} MB.`);
        continue;
      }
      accepted.push({
        id: ++seq,
        file,
        url: URL.createObjectURL(file),
        status: "queued",
        progress: 0,
        error: "",
      });
    }

    setItems((prev) => {
      let combined = [...prev, ...accepted];
      if (combined.length > sm.maxFiles) {
        setNotice(`You can share up to ${sm.maxFiles} photos at a time.`);
        combined
          .slice(sm.maxFiles)
          .forEach((it) => it.url && URL.revokeObjectURL(it.url));
        combined = combined.slice(0, sm.maxFiles);
      }
      return combined;
    });
  }

  function removeItem(id) {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it?.url) URL.revokeObjectURL(it.url);
      return prev.filter((x) => x.id !== id);
    });
  }

  async function uploadOne(item) {
    patch(item.id, { status: "uploading", progress: 0, error: "" });
    try {
      await uploadMoment(
        {
          file: item.file,
          guestName: guestName.trim(),
          message: message.trim(),
          honeypot: company,
        },
        { onProgress: (p) => patch(item.id, { progress: p }) },
      );
      patch(item.id, { status: "done", progress: 100 });
      return true;
    } catch (err) {
      patch(item.id, {
        status: "error",
        error: err?.message || "Upload failed.",
      });
      return false;
    }
  }

  async function shareAll() {
    // Honeypot: a filled hidden field means a bot — show success, send nothing.
    if (company) {
      setPhase("done");
      return;
    }
    const queue = items.filter(
      (it) => it.status === "queued" || it.status === "error",
    );
    if (!queue.length) return;

    setPhase("uploading");
    let index = 0;
    let okCount = 0;
    let failCount = 0;

    // Small worker pool so a table's worth of photos don't all fire at once.
    const workers = Array.from(
      { length: Math.min(MAX_CONCURRENT, queue.length) },
      async () => {
        while (index < queue.length) {
          const item = queue[index++];
          const ok = await uploadOne(item);
          if (ok) okCount++;
          else failCount++;
        }
      },
    );
    await Promise.all(workers);

    if (okCount > 0) onUploaded?.();
    setPhase(failCount === 0 && okCount > 0 ? "done" : "idle");
  }

  // Retry a single failed photo. If it was the last one outstanding, the
  // success screen appears on its own.
  async function retryOne(item) {
    const ok = await uploadOne(item);
    if (ok) {
      onUploaded?.();
      setItems((prev) => {
        if (prev.length && prev.every((it) => it.status === "done")) {
          setPhase("done");
        }
        return prev;
      });
    }
  }

  function reset() {
    items.forEach((it) => it.url && URL.revokeObjectURL(it.url));
    setItems([]);
    setMessage("");
    setCompany("");
    setNotice("");
    setPhase("idle");
    // Keep the guest's name so a second batch doesn't ask again.
  }

  const doneCount = items.filter((it) => it.status === "done").length;
  const hasErrors = items.some((it) => it.status === "error");
  const busy = phase === "uploading";
  const shareable = items.some(
    (it) => it.status === "queued" || it.status === "error",
  );

  // ---- Success screen ------------------------------------------------------
  if (phase === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/40 bg-butter/30 px-8 py-12 text-center"
      >
        <motion.span
          initial={{ scale: 0.6, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy"
        >
          <PartyPopper size={28} />
        </motion.span>
        <h3 className="mt-5 font-serif text-3xl text-navy">Thank you!</h3>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-muted">
          {doneCount > 0
            ? `${doneCount} ${doneCount === 1 ? "photo is" : "photos are"} on their way to our gallery. It means the world to see the day through your eyes.`
            : "Thanks for sharing with us!"}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:bg-gold-deep hover:text-white"
          >
            <ImagePlus size={16} /> Share more
          </button>
          {onViewGallery && (
            <button
              type="button"
              onClick={onViewGallery}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-7 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <Images size={16} /> See the gallery
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // ---- Upload form ---------------------------------------------------------
  return (
    <div>
      {/* Hidden inputs: one for the library, one for the camera. */}
      <input
        ref={pickRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={camRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Drop / pick zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="rounded-2xl border border-dashed border-line bg-paper/60 px-6 py-9 text-center"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky/60 text-navy">
          <ImagePlus size={26} />
        </span>
        <p className="mt-4 font-serif text-xl text-navy">Add your photos</p>
        <p className="mx-auto mt-1 max-w-xs font-sans text-xs text-muted">
          Up to {sm.maxFiles} at a time · under {sm.maxFileSizeMB} MB each
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => pickRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-blue"
          >
            <ImagePlus size={16} /> Choose photos
          </button>
          <button
            type="button"
            onClick={() => camRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <Camera size={16} /> Take a photo
          </button>
        </div>
      </div>

      {notice && (
        <p className="mt-3 flex items-center justify-center gap-2 font-sans text-xs text-gold-deep">
          <AlertCircle size={14} /> {notice}
        </p>
      )}

      {/* Selected thumbnails */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 grid grid-cols-3 gap-3 overflow-hidden sm:grid-cols-4"
          >
            {items.map((it) => (
              <div
                key={it.id}
                className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-line"
              >
                <img
                  src={it.url}
                  alt={it.file.name}
                  className="h-full w-full object-cover"
                />

                {/* Dim + status while uploading / after upload */}
                {it.status !== "queued" && (
                  <div className="absolute inset-0 bg-navy/35" />
                )}

                {/* Remove (only before it's committed) */}
                {(it.status === "queued" || it.status === "error") && !busy && (
                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    aria-label="Remove photo"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy/70 text-white transition-colors hover:bg-navy"
                  >
                    <X size={13} />
                  </button>
                )}

                {/* Done check */}
                {it.status === "done" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy">
                      <Check size={18} />
                    </span>
                  </span>
                )}

                {/* Retry on error */}
                {it.status === "error" && (
                  <button
                    type="button"
                    onClick={() => retryOne(it)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white"
                  >
                    <RotateCw size={18} />
                    <span className="font-sans text-[10px] uppercase tracking-wider">
                      Retry
                    </span>
                  </button>
                )}

                {/* Progress bar */}
                {it.status === "uploading" && (
                  <div className="absolute inset-x-1 bottom-1 h-1.5 overflow-hidden rounded-full bg-white/40">
                    <div
                      className="h-full rounded-full bg-gold transition-[width] duration-200"
                      style={{ width: `${it.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name + message */}
      <div className="mt-6 space-y-4">
        <div>
          <label className={labelCls} htmlFor="moment-name">
            Your name <span className="normal-case text-muted">(optional)</span>
          </label>
          <input
            id="moment-name"
            className={inputCls}
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="So we know who to thank"
            autoComplete="name"
            disabled={busy}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="moment-message">
            A note <span className="normal-case text-muted">(optional)</span>
          </label>
          <textarea
            id="moment-message"
            rows={2}
            className={`${inputCls} resize-none`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share a wish or a memory…"
            disabled={busy}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      {hasErrors && !busy && (
        <p className="mt-4 flex items-center gap-2 font-sans text-sm text-red-600">
          <AlertCircle size={16} /> Some photos didn't upload. Tap a photo to
          retry, or press share again.
        </p>
      )}

      <button
        type="button"
        onClick={shareAll}
        disabled={!shareable || busy}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:bg-gold-deep hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? (
          "Sharing…"
        ) : (
          <>
            <ImagePlus size={16} />
            {items.length > 0
              ? `Share ${items.filter((it) => it.status !== "done").length || items.length} ${
                  items.length === 1 ? "photo" : "photos"
                }`
              : "Share photos"}
          </>
        )}
      </button>
    </div>
  );
}
