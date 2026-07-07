/**
 * Shared Moments — Google Apps Script backend.
 * Receives photo uploads from the website and saves them to a Google Drive
 * folder (organised by date, renamed to avoid duplicates), then logs each one
 * to this Sheet. The same Sheet powers the live gallery on the site: doGet()
 * returns every row that isn't marked "Hidden".
 *
 * Setup instructions: see README.md in this folder.
 */

// ── Settings ────────────────────────────────────────────────────────────────
// Where photos are stored in your Drive. Paste a folder ID — the long string in
// the folder's URL: drive.google.com/drive/folders/THIS_PART — or leave "" to
// auto-create a folder named ROOT_FOLDER_NAME in "My Drive" on first upload.
const ROOT_FOLDER_ID = "";
const ROOT_FOLDER_NAME = "Shared Moments";

// Get an email when a guest shares a photo. Leave "" to disable.
const NOTIFY_EMAIL = "";

// Most recent photos returned to the live gallery (newest first).
const GALLERY_LIMIT = 400;

// Defence in depth (the website already enforces these too).
const MAX_BYTES = 20 * 1024 * 1024; // hard cap per file: 20 MB
// ────────────────────────────────────────────────────────────────────────────

const HEADERS = [
  "Timestamp",
  "File Name",
  "File ID",
  "Guest Name",
  "Message",
  "MIME",
  "Hidden", // tick this checkbox to pull a photo from the gallery
];

// Guests upload a photo. Saves to Drive + logs a row, then returns the file.
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: the website sends "company" only when a bot fills a hidden
    // field. Accept it silently so the bot thinks it worked, but store nothing.
    if (data.company) return json({ ok: true, ignored: true });

    if (!data.dataBase64) return json({ ok: false, error: "No photo data." });

    const mime = data.mimeType || "";
    if (mime.indexOf("image/") !== 0) {
      return json({ ok: false, error: "Only photos can be shared." });
    }

    const bytes = Utilities.base64Decode(data.dataBase64);
    if (bytes.length > MAX_BYTES) {
      return json({ ok: false, error: "That photo is too large." });
    }

    const folder = getDatedFolder_();
    const guest = sanitize_(data.guestName);
    const name = uniqueName_(folder, guest, data.fileName, mime);
    const file = folder.createFile(Utilities.newBlob(bytes, mime, name));

    // The gallery loads thumbnails by public URL, so the file must be
    // viewable by anyone with the link.
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      // Some Workspace domains block public sharing — keep the file, log a note.
      Logger.log("Sharing failed: " + shareErr);
    }

    logRow_(file, data);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "New shared photo 📷",
        `${data.guestName || "A guest"} shared a photo.\n` +
          `${data.message ? data.message + "\n" : ""}\n` +
          file.getUrl(),
      );
    }

    return json({ ok: true, file: view_(file, data) });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// The live gallery fetches this — every non-hidden photo, newest first.
function doGet() {
  try {
    const sheet = getSheet_();
    const last = sheet.getLastRow();
    const out = [];
    if (last > 1) {
      const rows = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
      for (let i = rows.length - 1; i >= 0 && out.length < GALLERY_LIMIT; i--) {
        const r = rows[i];
        const id = r[2];
        if (!id) continue;
        const hidden = r[6] === true || String(r[6]).toLowerCase() === "true";
        if (hidden) continue;
        out.push({
          id: id,
          name: r[1],
          guestName: r[3],
          message: r[4],
          createdAt: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
          thumbnailUrl: thumb_(id, 600),
          fullUrl: thumb_(id, 1600),
        });
      }
    }
    return json({ ok: true, files: out });
  } catch (err) {
    return json({ ok: false, error: String(err), files: [] });
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function getRoot_() {
  if (ROOT_FOLDER_ID) return DriveApp.getFolderById(ROOT_FOLDER_ID);
  const it = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(ROOT_FOLDER_NAME);
}

// A subfolder named for today's date, e.g. "Shared Moments/2026-09-19".
function getDatedFolder_() {
  const root = getRoot_();
  const tz = Session.getScriptTimeZone() || "GMT";
  const name = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd");
  const it = root.getFoldersByName(name);
  return it.hasNext() ? it.next() : root.createFolder(name);
}

// A collision-proof file name: timestamp + guest, with a counter if needed.
function uniqueName_(folder, guest, original, mime) {
  const tz = Session.getScriptTimeZone() || "GMT";
  const stamp = Utilities.formatDate(new Date(), tz, "yyyyMMdd-HHmmss");
  const ext = extFor_(original, mime);
  const base = guest ? stamp + "_" + guest : stamp;
  let candidate = base + ext;
  let n = 1;
  while (folder.getFilesByName(candidate).hasNext()) {
    candidate = base + "_" + pad3_(n) + ext;
    n++;
  }
  return candidate;
}

function extFor_(name, mime) {
  const m = String(name || "").match(/(\.[a-z0-9]+)$/i);
  if (m) return m[1].toLowerCase();
  const map = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/heic": ".heic",
    "image/heif": ".heif",
  };
  return map[mime] || ".jpg";
}

function sanitize_(s) {
  return String(s || "")
    .trim()
    .replace(/[^\w\- ]+/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
}

function pad3_(n) {
  return (n < 10 ? "00" : n < 100 ? "0" : "") + n;
}

// Public, hotlink-friendly image URL that works for "anyone with link" files.
function thumb_(id, width) {
  return "https://drive.google.com/thumbnail?id=" + id + "&sz=w" + width;
}

function view_(file, data) {
  const id = file.getId();
  return {
    id: id,
    name: file.getName(),
    guestName: data.guestName || "",
    message: data.message || "",
    thumbnailUrl: thumb_(id, 600),
    fullUrl: thumb_(id, 1600),
  };
}

function getSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = sheet.getLastRow() === 0 ? [] : range.getValues()[0];
  const matches = HEADERS.every((h, i) => current[i] === h);
  if (!matches) range.setValues([HEADERS]);
  return sheet;
}

function logRow_(file, data) {
  getSheet_().appendRow([
    new Date(),
    file.getName(),
    file.getId(),
    data.guestName || "",
    data.message || "",
    file.getMimeType(),
    false,
  ]);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// Run this once from the editor (pick "setup" → Run) to write the header row
// and grant the Drive/Sheets permissions before your first upload.
function setup() {
  getSheet_();
}
