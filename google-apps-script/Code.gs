/**
 * Wedding RSVP — Google Apps Script backend.
 * Receives RSVP submissions from the website and appends them to this Sheet.
 *
 * Setup instructions: see README.md in this folder.
 */

// ── Options ────────────────────────────────────────────────────────────────
// Email a confirmation to the guest (only if they provided an email).
const SEND_CONFIRMATION = false;
// Get a heads-up email yourself on every RSVP. Leave "" to disable.
const NOTIFY_EMAIL = "";
// ────────────────────────────────────────────────────────────────────────────

const HEADERS = [
  "Timestamp",
  "Primary Name",
  "Email",
  "Phone",
  "Attending",
  "Party Size",
  "Guest Names",
  "Meal Preferences",
  "Dietary",
  "Song Request",
  "Message",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Create the header row the first time.
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    sheet.appendRow([
      new Date(),
      data.primaryName || "",
      data.email || "",
      data.phone || "",
      data.attending || "",
      data.partySize || 0,
      data.guestNames || "",
      data.mealPreferences || "",
      data.dietary || "",
      data.song || "",
      data.message || "",
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "New RSVP: " + (data.primaryName || ""),
        `${data.primaryName} — ${data.attending} (party of ${data.partySize})\n\n` +
          `Guests: ${data.guestNames}\n` +
          `Meals: ${data.mealPreferences}\n` +
          `Dietary: ${data.dietary}\n` +
          `Song: ${data.song}\n` +
          `Message: ${data.message}`,
      );
    }

    if (SEND_CONFIRMATION && data.email) {
      const msg =
        data.attending === "Yes"
          ? "We can't wait to celebrate with you!"
          : "We're sorry you can't make it, but thank you for letting us know.";
      MailApp.sendEmail(
        data.email,
        "We received your RSVP 💛",
        `Hi ${data.primaryName},\n\nThank you for your RSVP! ${msg}\n\nWith love.`,
      );
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Opening the /exec URL in a browser hits this — a simple health check.
function doGet() {
  return json({ ok: true, message: "RSVP endpoint is live." });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
