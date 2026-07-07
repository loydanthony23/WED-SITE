# Shared Moments backend — Google Drive + Apps Script

This connects the website's **Shared Moments** photo wall to your Google Drive.
Guests scan a QR code at their table, upload photos from their phone, and the
photos:

- save straight to a folder in **your** Drive, organised into dated subfolders,
- get renamed so two photos never collide, and
- appear in the **live gallery** on the site automatically.

It's free, needs no server, and stores no credentials in the website — the same
approach as the RSVP backend, just writing files to Drive instead of rows to a
Sheet.

> Use a **personal Gmail account** if you can. Some Google Workspace (company/
> school) accounts block "anyone with the link" sharing, which the gallery needs
> to show thumbnails.

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **"Shared Moments"**. This Sheet is both the log of
   uploads and the on/off switch for the gallery — you don't need to add headers,
   the script creates them.

## 2. (Optional) Create the Drive folder

The script auto-creates a folder called **Shared Moments** in *My Drive* on the
first upload, so you can skip this. To use a specific folder instead:

1. Create a folder in <https://drive.google.com>.
2. Open it and copy the ID from the URL — the part after `/folders/`:
   `drive.google.com/drive/folders/`**`1A2b3C...`**
3. Paste it into `Code.gs` as `ROOT_FOLDER_ID`.

## 3. Add the Apps Script

1. In the Sheet, click **Extensions → Apps Script**.
2. Delete any starter code in `Code.gs`, then paste the entire contents of
   [`Code.gs`](./Code.gs) from this folder.
3. *(Optional)* Near the top, set `NOTIFY_EMAIL = "you@gmail.com"` to get an
   email whenever a guest shares a photo.
4. Click **Save**.
5. In the toolbar, choose the function **`setup`** and click **Run**. Approve the
   permissions when prompted (it's your own script — pick your account, then
   **Advanced → Go to … (unsafe) → Allow**). This grants Drive access and writes
   the header row.

## 4. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear ⚙️ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** Shared Moments
   - **Execute as:** *Me*
   - **Who has access:** **Anyone**
4. Click **Deploy** and copy the **Web app URL** — it ends in `/exec`.

> Test it: paste that URL into a browser. You should see
> `{"ok":true,"files":[]}`.

## 5. Connect the website

In the project root, open your `.env` file (create it from `.env.example` if you
don't have one) and add:

```
VITE_UPLOAD_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
```

Restart `pnpm dev` (or `npm run dev`). Open the site, go to **Shared Moments →
Share a photo**, and upload one — it should appear in the **Live gallery** tab
within a few seconds, and a file should show up in your Drive folder.

## 6. Make the table QR code

Generate a QR code that points to your deployed site's Shared Moments section:

```
https://your-wedding-site.com/#shared-moments
```

Any free QR generator works (e.g. search "QR code generator"). Print it on the
table cards. Scanning it **skips the welcome-gate envelope** and drops guests
straight onto the photo uploader (no music autoplay either). The shorter
`#share` and `#upload` links behave the same way.

## Moderating photos (auto-publish)

Uploads appear in the gallery **immediately** — there's no approval step. If you
ever need to remove a photo:

- Open the Sheet, find its row, and tick the **Hidden** checkbox
  (type `TRUE` in the last column). It disappears from the gallery within ~20s.
- The file stays in your Drive; delete it there too if you want it gone entirely.

## How files are organised

```
Shared Moments/
  2026-09-19/
    20260919-142530_maria.jpg
    20260919-142531_maria_001.jpg   ← counter added to avoid a duplicate name
    20260919-143012.jpg             ← guest left their name blank
```

## Updating the script later

If you edit `Code.gs`, re-deploy: **Deploy → Manage deployments → ✏️ (edit) →
Version: New version → Deploy.** The `/exec` URL stays the same.

## Columns the script writes

`Timestamp | File Name | File ID | Guest Name | Message | MIME | Hidden`
