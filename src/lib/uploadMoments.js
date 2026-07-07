const ENDPOINT = import.meta.env.VITE_UPLOAD_ENDPOINT;

// Turns a File into a bare base64 string (no "data:...;base64," prefix), which
// is what the Apps Script backend decodes with Utilities.base64Decode.
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const comma = result.indexOf(",");
      resolve(comma === -1 ? result : result.slice(comma + 1));
    };
    reader.onerror = () => reject(new Error("Could not read that photo."));
    reader.readAsDataURL(file);
  });
}

// Uploads one photo to the Google Apps Script web app, which saves it to Drive.
//
// IMPORTANT — CORS: Apps Script web apps can't answer a CORS *preflight*
// (OPTIONS) request. To avoid one we must send a "simple request": a plain
// fetch POST with Content-Type text/plain and NO custom/forbidden headers.
// (This is the same trick the RSVP form uses.) That rules out
// XMLHttpRequest.upload progress events — attaching an upload listener alone
// forces a preflight and gets the request blocked. So real byte-progress isn't
// available here; instead onProgress() is driven by a smooth time-based
// estimate that eases toward ~90% while the request is in flight and snaps to
// 100% when it completes. For a few-MB photo that finishes in a second or two,
// it reads exactly like a real progress bar.
//
// onProgress(percent) is called with 0–100.
export async function uploadMoment(
  { file, guestName, message, honeypot } = {},
  { onProgress } = {},
) {
  if (!ENDPOINT) {
    // Local dev without a backend: fake a smooth upload so the UI is testable.
    if (import.meta.env.DEV) {
      for (let p = 0; p <= 100; p += 20) {
        onProgress?.(p);
        await new Promise((r) => setTimeout(r, 120));
      }
      return {
        ok: true,
        simulated: true,
        file: { id: `local-${Date.now()}`, name: file.name },
      };
    }
    throw new Error("Photo sharing isn't set up yet.");
  }

  onProgress?.(0);
  const dataBase64 = await fileToBase64(file);
  const body = JSON.stringify({
    fileName: file.name,
    mimeType: file.type || "application/octet-stream",
    dataBase64,
    guestName: guestName || "",
    message: message || "",
    company: honeypot || "", // honeypot — server ignores rows where this is set
  });

  // Ease an estimated bar toward ~92% while the upload is in flight. The
  // asymptote means it never falsely hits 100% early; completion snaps it there.
  let pct = 3;
  onProgress?.(pct);
  const ramp = setInterval(() => {
    pct = pct + (92 - pct) * 0.12;
    onProgress?.(Math.round(pct));
  }, 150);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Upload failed (status ${res.status}).`);
    const json = await res.json().catch(() => ({ ok: true }));
    if (json.ok === false) throw new Error(json.error || "Upload failed.");
    onProgress?.(100);
    return json;
  } catch (err) {
    // Normalise the browser's opaque network/CORS failure into a friendly line.
    if (err instanceof TypeError) {
      throw new Error("Network error — check your connection and try again.");
    }
    throw err;
  } finally {
    clearInterval(ramp);
  }
}

// Fetches the live gallery list from the backend (doGet). A plain GET with no
// custom headers is also a "simple request", so it isn't blocked by CORS.
// Returns { ok, files: [{ id, name, guestName, message, createdAt,
// thumbnailUrl, fullUrl }] }.
export async function fetchMoments() {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) return { ok: true, files: [] };
    throw new Error("Photo sharing isn't set up yet.");
  }

  const res = await fetch(ENDPOINT, { method: "GET", redirect: "follow" });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  const json = await res.json().catch(() => ({ ok: true, files: [] }));
  if (json.ok === false) throw new Error(json.error || "Could not load the gallery.");
  return { ok: true, files: Array.isArray(json.files) ? json.files : [] };
}
