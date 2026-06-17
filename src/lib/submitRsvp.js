const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT;

// Sends the RSVP to the Google Apps Script web app, which appends a row to
// the Google Sheet. We POST as text/plain so the browser treats it as a
// "simple request" and skips the CORS preflight that Apps Script can't answer.
export async function submitRsvp(data) {
  if (!ENDPOINT) {
    // Only fake success in local dev so you can test the UI. In production a
    // missing endpoint is a real misconfiguration — surface it loudly instead
    // of silently showing a fake "Thank you!" while sending nothing.
    if (import.meta.env.DEV) {
      console.warn(
        "VITE_RSVP_ENDPOINT is not set — simulating a successful submit (dev only).",
      );
      await new Promise((r) => setTimeout(r, 900));
      return { ok: true, simulated: true };
    }
    throw new Error("RSVP endpoint is not configured.");
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
    redirect: "follow",
  });

  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

  // Apps Script returns JSON; tolerate an empty/odd body just in case.
  const json = await res.json().catch(() => ({ ok: true }));
  if (json.ok === false) throw new Error(json.error || "Submission failed");
  return json;
}
