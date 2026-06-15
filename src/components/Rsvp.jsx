import { useState } from "react";
import { Check, Heart, Plus, X, PartyPopper, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { config } from "../lib/config";
import { submitRsvp } from "../lib/submitRsvp";
import SectionHeading from "./SectionHeading";

const inputCls =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold focus:ring-1 focus:ring-gold/40";
const labelCls =
  "mb-1.5 block font-sans text-xs uppercase tracking-widest text-navy";

export default function Rsvp() {
  const { rsvp, couple } = config;
  const blankGuest = () => ({ name: "", meal: rsvp.mealOptions[0] });

  const [form, setForm] = useState({
    primaryName: "",
    email: "",
    phone: "",
    attending: "", // "yes" | "no"
    primaryMeal: rsvp.mealOptions[0],
    dietary: "",
    song: "",
    message: "",
    company: "", // honeypot — must stay empty
  });
  const [guests, setGuests] = useState([]); // additional guests beyond primary
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const attending = form.attending === "yes";
  const maxAdditional = Math.max(0, (rsvp.maxPartySize || 1) - 1);

  const addGuest = () =>
    guests.length < maxAdditional && setGuests([...guests, blankGuest()]);
  const removeGuest = (i) => setGuests(guests.filter((_, idx) => idx !== i));
  const updateGuest = (i, key, value) =>
    setGuests(guests.map((g, idx) => (idx === i ? { ...g, [key]: value } : g)));

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot: a filled hidden field means a bot — fake success, send nothing.
    if (form.company) {
      setStatus("success");
      return;
    }
    if (!form.primaryName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!form.attending) {
      setErrorMsg("Please let us know if you can make it.");
      return;
    }
    if (attending && guests.some((g) => !g.name.trim())) {
      setErrorMsg("Please enter a name for each guest (or remove empty ones).");
      return;
    }

    const allNames = attending
      ? [form.primaryName.trim(), ...guests.map((g) => g.name.trim())]
      : [];
    const meals = attending
      ? [
          `${form.primaryName.trim()}: ${form.primaryMeal}`,
          ...guests.map((g) => `${g.name.trim()}: ${g.meal}`),
        ]
      : [];

    const payload = {
      primaryName: form.primaryName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      attending: attending ? "Yes" : "No",
      partySize: attending ? allNames.length : 0,
      guestNames: allNames.join(", "),
      mealPreferences: meals.join("; "),
      dietary: form.dietary.trim(),
      song: form.song.trim(),
      message: form.message.trim(),
    };

    try {
      setStatus("submitting");
      await submitRsvp(payload);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your RSVP. Please try again, or contact us directly.",
      );
    }
  }

  return (
    <section id="rsvp" className="section-pad bg-paper">
      <div className="mx-auto max-w-xl">
        <SectionHeading kicker="Will We See You?" title="RSVP" />
        <p className="mx-auto mt-4 max-w-md text-center font-sans text-sm text-muted">
          Kindly respond by{" "}
          <span className="font-medium text-gold-deep">{rsvp.deadline}</span>.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-2xl border border-gold/40 bg-butter/30 px-8 py-12 text-center"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy">
                <PartyPopper size={28} />
              </span>
              <h3 className="mt-5 font-serif text-3xl text-navy">Thank you!</h3>
              <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-muted">
                {attending
                  ? `We've got your RSVP and can't wait to celebrate with you. See you there!`
                  : `We're sorry you can't make it, but thank you for letting us know. You'll be missed!`}
              </p>
              <p className="mt-5 font-serif text-lg text-blue">
                — {couple.partnerA} &amp; {couple.partnerB}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >
              {/* Name */}
              <div>
                <label className={labelCls} htmlFor="primaryName">
                  Your Full Name *
                </label>
                <input
                  id="primaryName"
                  className={inputCls}
                  value={form.primaryName}
                  onChange={set("primaryName")}
                  placeholder="Juan Dela Cruz"
                  autoComplete="name"
                />
              </div>

              {/* Contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={inputCls}
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+63 900 000 0000"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Attendance */}
              <div>
                <span className={labelCls}>Will you be attending? *</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "yes", label: "Joyfully accepts", icon: Heart },
                    { val: "no", label: "Regretfully declines", icon: X },
                  ].map((opt) => {
                    const active = form.attending === opt.val;
                    const Icon = opt.icon;
                    return (
                      <button
                        type="button"
                        key={opt.val}
                        onClick={() => setForm({ ...form, attending: opt.val })}
                        className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3.5 font-sans text-sm transition-colors ${
                          active
                            ? "border-gold bg-butter/40 text-navy"
                            : "border-line bg-paper text-muted hover:border-gold/50"
                        }`}
                      >
                        <Icon
                          size={16}
                          className={active ? "text-gold-deep" : ""}
                        />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Attending-only fields */}
              <AnimatePresence initial={false}>
                {attending && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    {/* Primary meal */}
                    <div>
                      <label className={labelCls} htmlFor="primaryMeal">
                        Your Meal Preference
                      </label>
                      <select
                        id="primaryMeal"
                        className={inputCls}
                        value={form.primaryMeal}
                        onChange={set("primaryMeal")}
                      >
                        {rsvp.mealOptions.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Additional guests */}
                    {guests.map((g, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-line bg-cream/60 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-sans text-xs uppercase tracking-widest text-gold-deep">
                            Guest {i + 2}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeGuest(i)}
                            className="flex items-center gap-1 font-sans text-xs text-muted hover:text-navy"
                          >
                            <X size={13} /> Remove
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <input
                            className={inputCls}
                            value={g.name}
                            onChange={(e) =>
                              updateGuest(i, "name", e.target.value)
                            }
                            placeholder="Guest full name"
                          />
                          <select
                            className={inputCls}
                            value={g.meal}
                            onChange={(e) =>
                              updateGuest(i, "meal", e.target.value)
                            }
                          >
                            {rsvp.mealOptions.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}

                    {guests.length < maxAdditional && (
                      <button
                        type="button"
                        onClick={addGuest}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gold/60 py-3 font-sans text-xs uppercase tracking-widest text-gold-deep transition-colors hover:bg-butter/30"
                      >
                        <Plus size={15} /> Add a guest
                      </button>
                    )}

                    {/* Dietary */}
                    <div>
                      <label className={labelCls} htmlFor="dietary">
                        Dietary Restrictions / Allergies
                      </label>
                      <input
                        id="dietary"
                        className={inputCls}
                        value={form.dietary}
                        onChange={set("dietary")}
                        placeholder="e.g. nut allergy, vegan"
                      />
                    </div>

                    {/* Song */}
                    <div>
                      <label className={labelCls} htmlFor="song">
                        Song Request
                      </label>
                      <input
                        id="song"
                        className={inputCls}
                        value={form.song}
                        onChange={set("song")}
                        placeholder="A song to get you on the dance floor"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div>
                <label className={labelCls} htmlFor="message">
                  A Note for the Couple
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className={`${inputCls} resize-none`}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Share your well-wishes…"
                />
              </div>

              {/* Honeypot (hidden from humans) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                value={form.company}
                onChange={set("company")}
              />

              {errorMsg && (
                <p className="flex items-center gap-2 font-sans text-sm text-red-600">
                  <AlertCircle size={16} /> {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] text-navy transition-colors hover:bg-gold-deep hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? (
                  "Sending…"
                ) : (
                  <>
                    <Check size={16} /> Send RSVP
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
