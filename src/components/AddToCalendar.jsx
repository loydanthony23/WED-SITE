import { useEffect, useRef, useState } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { config } from "../lib/config";

// Format a Date to the iCal / Google UTC basic format: YYYYMMDDTHHMMSSZ
function toICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// Adds the wedding to the guest's calendar. Offers a Google Calendar link
// (best on Android / desktop) and a downloadable .ics file (Apple / Outlook).
// All values come from config.js, so this stays in sync automatically.
//
// Props:
//   variant — "icon" (bare icon, for the hero date),
//             "navbar" (round icon button beside the RSVP link),
//             "pill" (full labelled button — default).
//   onDark  — true when sitting over the dark hero (light styling).
//   align   — "center" | "right": where the dropdown opens.
export default function AddToCalendar({
  variant = "pill",
  onDark = false,
  align = "center",
}) {
  const { event, details, couple } = config;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close the menu when clicking outside it.
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const start = new Date(event.dateISO);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000); // ~5-hour celebration
  const startStr = toICSDate(start);
  const endStr = toICSDate(end);

  const title = `${couple.partnerA} & ${couple.partnerB}'s Wedding`;
  const location = `${details.ceremony.venue}, ${details.ceremony.address}`;
  const description =
    `Ceremony at ${details.ceremony.time}, ${details.ceremony.venue}. ` +
    `Reception to follow at ${details.reception.venue}. ${couple.hashtag}`;

  const googleUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${startStr}/${endStr}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  function downloadICS() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Loyd & Sharah//Wedding//EN",
      "BEGIN:VEVENT",
      `UID:${startStr}-loydsharah@wedding`,
      `DTSTAMP:${startStr}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loyd-and-sharah-wedding.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  const toggle = () => setOpen((v) => !v);

  let trigger;
  if (variant === "icon") {
    trigger = (
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Add to calendar"
        className="inline-flex items-center justify-center text-gold transition-colors hover:text-white"
      >
        <CalendarPlus size={16} />
      </button>
    );
  } else if (variant === "navbar") {
    trigger = (
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Add to calendar"
        className={`rounded-full p-2 transition-colors ${
          onDark
            ? "border border-white/50 text-white hover:bg-white hover:text-navy"
            : "bg-navy text-white hover:bg-blue"
        }`}
      >
        <CalendarPlus size={16} />
      </button>
    );
  } else {
    trigger = (
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy"
      >
        <CalendarPlus size={16} /> Add to Calendar
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
    );
  }

  return (
    <div ref={ref} className="relative inline-block text-left">
      {trigger}

      {open && (
        <div
          className={`absolute z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-paper text-center shadow-lg ${
            align === "right" ? "right-0" : "left-1/2 -translate-x-1/2"
          }`}
        >
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 font-sans text-sm normal-case tracking-normal text-ink transition-colors hover:bg-sky/60"
          >
            Google Calendar
          </a>
          <button
            type="button"
            onClick={downloadICS}
            className="block w-full border-t border-line px-5 py-3 font-sans text-sm normal-case tracking-normal text-ink transition-colors hover:bg-sky/60"
          >
            Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
}
