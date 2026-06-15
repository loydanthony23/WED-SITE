# RSVP backend — Google Sheet + Apps Script

This connects the website's RSVP form to a Google Sheet. It's free, needs no
server, and stores no credentials in the website.

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **"Wedding RSVPs"**. (You don't need to add headers —
   the script creates them on the first submission.)

## 2. Add the Apps Script

1. In the Sheet, click **Extensions → Apps Script**.
2. Delete any starter code in `Code.gs`, then paste the entire contents of
   [`Code.gs`](./Code.gs) from this folder.
3. *(Optional)* Near the top, set:
   - `SEND_CONFIRMATION = true` to email guests a confirmation.
   - `NOTIFY_EMAIL = "you@gmail.com"` to get an email on every RSVP.
4. Click the **Save** icon.

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear ⚙️ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** Wedding RSVP
   - **Execute as:** *Me*
   - **Who has access:** **Anyone**
4. Click **Deploy**. Approve the permissions when prompted (it's your own
   script — choose your account, then "Advanced → Go to … (unsafe)" → Allow).
5. Copy the **Web app URL** — it ends in `/exec`.

> Test it: paste that URL into a browser. You should see
> `{"ok":true,"message":"RSVP endpoint is live."}`.

## 4. Connect the website

In the project root, create a `.env` file (copy from `.env.example`) and set:

```
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
```

Restart `npm run dev`. Submit a test RSVP — a new row should appear in your
Sheet within a second or two.

## Updating the script later

If you edit `Code.gs`, re-deploy: **Deploy → Manage deployments → ✏️ (edit) →
Version: New version → Deploy.** The `/exec` URL stays the same.

## Columns the script writes

`Timestamp | Primary Name | Email | Phone | Attending | Party Size | Guest Names | Meal Preferences | Dietary | Song Request | Message`
