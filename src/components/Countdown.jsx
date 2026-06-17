import { useState, useEffect } from "react";

function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown({ dateISO, light = false }) {
  const target = new Date(dateISO).getTime();
  const [t, setT] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) {
    return (
      <p
        className={`font-serif text-2xl ${light ? "text-white" : "text-navy"}`}
      >
        The big day is here! 🎉
      </p>
    );
  }

  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="flex items-start justify-center gap-4 sm:gap-7">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span
            className={`font-serif text-4xl tabular-nums sm:text-5xl ${
              light ? "text-white" : "text-navy"
            }`}
          >
            {String(u.value).padStart(2, "0")}
          </span>
          <span
            className={`mt-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] sm:text-xs ${
              light ? "text-white/70" : "text-navy/75"
            }`}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
