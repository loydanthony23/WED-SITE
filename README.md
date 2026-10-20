# Wedding Website

A modern, mobile-first wedding site with a welcome envelope, background music,
live countdown, story, photo gallery, entourage, gift QR codes, FAQ, an **RSVP
form** that saves to a Google Sheet, and a **Shared Moments** photo wall where
guests upload photos straight to your Google Drive.

**Stack:** React 19 + Vite · Tailwind CSS v4 · motion (animations) ·
lucide-react (icons) · Google Apps Script (RSVP + photo uploads, free, no
server). Deploys to Cloudflare as a static site.

This guide walks you from zero to a live site, in order:

1. [Install the tools](#1-install-the-tools)
2. [Get the code and run it locally](#2-get-the-code-and-run-it-locally)
3. [Make it yours — edit `config.js`](#3-make-it-yours--edit-srclibconfigjs)
4. [Replace photos, music, and page metadata](#4-replace-photos-music-and-page-metadata)
5. [Set up the RSVP form (Google Sheet)](#5-set-up-the-rsvp-form-google-sheet)
6. [Set up Shared Moments (Google Drive uploads)](#6-set-up-shared-moments-google-drive-uploads)
7. [Deploy to Cloudflare](#7-deploy-to-cloudflare)
8. [Connect your own domain](#8-connect-your-own-domain)
9. [Print the table QR code](#9-print-the-table-qr-code)

---

## 1. Install the tools

You need these once on your computer:

| Tool | Why | Get it |
| --- | --- | --- |
| **Node.js 22.15+** | Runs the site locally and builds it | <https://nodejs.org> (LTS) — or `nvm use` (the repo has an `.nvmrc`) |
| **pnpm** | Package manager this repo uses | `corepack enable` (ships with Node) — or `npm i -g pnpm` |
| **Git** | Download / version the code | <https://git-scm.com> |
| **A code editor** | To edit `config.js` | [VS Code](https://code.visualstudio.com) recommended |
| **A Google account** | RSVP Sheet + photo Drive | A personal Gmail works best (see note in step 6) |
| **A Cloudflare account** | Free hosting | <https://dash.cloudflare.com/sign-up> |

Check everything is installed:

```bash
node -v     # v22.15 or higher
pnpm -v
git --version
```

## 2. Get the code and run it locally

```bash
git clone <repo-url> my-wedding-site
cd my-wedding-site
pnpm install
pnpm dev          # open http://localhost:5173
```

> Prefer npm? `npm install` and `npm run dev` work too.

**Start your own repo** (so you aren't pushing to the original): create an
empty repo on GitHub, then:

```bash
git remote set-url origin https://github.com/<you>/<your-repo>.git
git push -u origin main
```

Create your local env file now — you'll fill it in during steps 5 and 6:

```bash
cp .env.example .env
```

> In local dev, the RSVP form and photo uploader **pretend to succeed** until
> you connect the Google backends, so you can design everything first.

## 3. Make it yours — edit `src/lib/config.js`

**All wedding content lives in [`src/lib/config.js`](./src/lib/config.js).**
You don't need to touch any component to change names, dates, venues, or text.
Save the file and the browser refreshes instantly while `pnpm dev` is running.

A few rules of thumb:

- Text goes inside quotes: `"like this"`. If your text has a `"` in it, use
  `\"` or switch to curly quotes.
- Keep the commas at the end of each line and each `{ ... }` item.
- Lists (`[ ... ]`) can have as many or as few items as you like — add or
  delete whole lines.
- Images and music paths that start with `/` point to files in the `public/`
  folder (e.g. `"/hero.webp"` → `public/hero.webp`).
- If the page goes blank after an edit, you probably broke a quote or comma —
  check the terminal for the error line.

Go through each section in order:

### `couple`

```js
couple: {
  partnerA: "Groom",          // first name shown in the hero, footer, etc.
  partnerB: "Bride",
  hashtag: "#GroomAndBride",
  logo: "/monogram.png",      // white monogram on the dark hero (public/)
  navIcon: "/icon-nav.png",   // small white mark in the navbar (public/)
},
```

Make your monogram and nav icon as **white, transparent PNGs** (Canva works
well).

### `event` — date and countdown

```js
event: {
  dateISO: "2027-02-14T15:00:00+08:00",  // powers the countdown
  dateLabel: "February 14, 2027",       // what guests read
  dayLabel: "Sunday",
  timeLabel: "3:00 in the afternoon",
  cityLabel: "Tagaytay City",
},
```

`dateISO` must stay in this exact format: `YYYY-MM-DDTHH:MM:SS+08:00`. Change
`+08:00` only if you're not in Philippine time. The `*Label` fields are free
text.

### `hero` — top banner

- `kicker` / `subline`: the small lines above and below your names.
- `image`: wide desktop photo (landscape).
- `imageMobile`: portrait **1080 × 1920** version for phones. Set to `""` to
  reuse `image`. Set `image` to `""` for a text-only hero.

### `welcome` — opening envelope

The "tap to open" overlay. It exists so browsers allow the music to play.
Edit the text, or set `enabled: false` to skip it.

### `music` — background song

- `src`: an MP3 in `public/` (e.g. `"/our-song.mp3"`). Use `""` for no music.
- `volume`: `0` to `1` (0.4 is gentle).

### `story` — Our Story

- `intro`: one sentence at the top.
- `paragraphs`: as many paragraphs as you want.
- `timeline`: milestones, each `{ year, title, text }`.

### `gallery` — your photos

```js
gallery: {
  intro: "A few of our favorite moments.",
  previewCount: 6,    // photos shown before "View more" (0 = show all)
  images: [
    { src: "/900x1100/1.webp", alt: "Short description" },
    // ...add as many as you like
  ],
},
```

Recommended: portrait ~**900 × 1100 px**, JPG/WebP, **under ~500 KB** each.
Put them in `public/900x1100/` (or any folder) and list them here.

### `sharedMoments` — guest photo wall text

Edit `kicker`, `title`, `intro`. `maxFiles` (photos per upload) and
`maxFileSizeMB` are guardrails. The backend is set up in [step 6](#6-set-up-shared-moments-google-drive-uploads).

### `details` — ceremony, reception, dress code

For both `ceremony` and `reception`: `title`, `time`, `venue`, `address`, and
`mapUrl` (in Google Maps, tap **Share → Copy link**).

`dressCode`:

- `text`: your attire note.
- `image`: optional illustration in `public/` (transparent PNG).
- `palette`: your motif colors, each `{ name, hex }`. Find hex codes with any
  "color picker" search.

### `schedule` — order of the day

Each item: `{ time, title, text, icon }`. `icon` must be one of:
`heart`, `church`, `glassCheers`, `utensils`, `music`, `camera`, `sparkles`.

### `entourage` — wedding party

`groups` is a list; each group uses one of three layouts:

```js
// 1. "columns" (default) — his side | her side
{
  title: "Principal Sponsors",
  leftLabel: "Groom's side",   // optional captions
  rightLabel: "Bride's side",
  pairs: [
    ["Mr. Juan Dela Cruz", "Mrs. Maria Dela Cruz"],
    ["", "Ms. Ana Santos"],     // "" leaves one side blank
  ],
},

// 2. "roles" — task → name
{
  title: "Keepers of Love Symbols",
  layout: "roles",
  roles: [
    { label: "Ring Bearer", name: "Jose" },
    { label: "Coin Bearer", name: "Pedro" },
  ],
},

// 3. "list" — plain centered names
{
  title: "Officiant",
  layout: "list",
  names: ["Rev. Fr. Name"],
},
```

Add `emphasis: true` to any group to print names larger (good for the couple
and parents). Delete groups you don't need.

### `registry` — gifts

- `note`: your gift message.
- `qrCodes`: one entry per wallet/bank. To get the QR image, open GCash / Maya /
  your bank app → **Receive Money / My QR** → save the image (leave the amount
  blank). Put it in `public/` and set `image`, `accountName`, `accountNumber`,
  and a brand `color`. Remove entries you don't use.

### `faq`

A list of `{ q: "Question?", a: "Answer." }`. Add or delete freely.

### `rsvp`

```js
rsvp: {
  enabled: true,                 // false hides the form + all RSVP buttons
  deadline: "January 15, 2027",
  mealOptions: ["Chicken", "Beef", "Fish", "Vegetarian"],
  maxPartySize: 6,
},
```

Set `enabled: false` after your deadline to close RSVPs.

### `contact`

`email` and `phone` shown in the footer.

### `navLinks` (bottom of the file)

The navbar menu. Each `href` must match a section id (`#story`,
`#shared-moments`, `#details`, `#schedule`, `#entourage`, `#faq`, `#rsvp`).
Remove a line to hide that link.

### Colors and fonts (optional)

The color theme lives in [`src/index.css`](./src/index.css) under `@theme`
(`--color-navy`, `--color-gold`, etc.). Change the hex values to match your
motif. Fonts are loaded in `index.html` from Google Fonts and set by
`--font-serif` / `--font-sans`.

## 4. Replace photos, music, and page metadata

The `public/` folder still holds the original couple's files. Replace or delete
them so none of them ship with your site:

- `monogram.png`, `icon-nav.png` — your logo marks
- `hero-*.webp` / `hero-mobile.webp` — hero photos
- `900x1100/` — gallery photos
- `dresscode-couple.png` — dress code illustration
- `gcash.png`, `gtm.png`, `lbp.png` — **gift QR codes (must replace!)**
- `musicbg.mp3` — background music
- `aip.png` — link-preview image

Then edit **[`index.html`](./index.html)** — this is what shows in the browser
tab and when the link is shared on Messenger/Facebook/Viber:

- `<title>` and `<meta name="description">`
- every `og:*` and `twitter:*` tag (title, description, image)
- `og:url`, `og:image`, `twitter:image`, and `<link rel="canonical">` → your
  own domain
- For the best preview, make a **1200 × 630** image and point `og:image` at it.

Finally, rename the project in **[`wrangler.jsonc`](./wrangler.jsonc)**:
`"name": "wedsite"` → e.g. `"name": "juan-and-maria"`. This becomes your free
`*.workers.dev` URL.

## 5. Set up the RSVP form (Google Sheet)

Guests' RSVPs land as rows in a Google Sheet you own. Full details:
[`google-apps-script/README.md`](./google-apps-script/README.md).

1. **Create the Sheet.** Go to <https://sheets.google.com> → blank spreadsheet
   → name it **"Wedding RSVPs"**. No headers needed.
2. **Add the script.** In the Sheet: **Extensions → Apps Script**. Delete the
   starter code and paste all of
   [`google-apps-script/Code.gs`](./google-apps-script/Code.gs).
3. *(Optional)* At the top of the script:
   - `SEND_CONFIRMATION = true` — email guests a confirmation.
   - `NOTIFY_EMAIL = "you@gmail.com"` — get an email for every RSVP.
4. Click **Save** 💾.
5. **Deploy.** **Deploy → New deployment** → gear ⚙️ → **Web app**:
   - Description: `Wedding RSVP`
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** and approve permissions (choose your account →
   **Advanced → Go to … (unsafe) → Allow** — it's your own script).
7. **Copy the Web app URL** (ends in `/exec`). Paste it into a browser — you
   should see `{"ok":true,"message":"RSVP endpoint is live."}`.
8. **Connect the site.** In `.env`:

   ```
   VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

9. Make sure `rsvp.enabled: true` in `config.js`, restart `pnpm dev`, and
   submit a test RSVP. A new row should appear in the Sheet within seconds.

Columns written: `Timestamp | Primary Name | Email | Phone | Attending | Party Size | Guest Names | Meal Preferences | Dietary | Song Request | Message`

> **Edited `Code.gs` later?** Re-deploy with **Deploy → Manage deployments →
> ✏️ → Version: New version → Deploy**. The `/exec` URL stays the same.

## 6. Set up Shared Moments (Google Drive uploads)

Guests scan a QR code, upload photos from their phone, and the photos save to
your Google Drive and appear in the site's live gallery. Full details:
[`google-apps-script/uploads/README.md`](./google-apps-script/uploads/README.md).

> Use a **personal Gmail** if possible. Some Workspace (work/school) accounts
> block "anyone with the link" sharing, which the gallery needs to show
> thumbnails.

1. **Create a second Sheet** named **"Shared Moments"**. It logs every upload
   and lets you hide photos. No headers needed.
2. *(Optional)* **Pick a Drive folder.** By default the script creates a
   **Shared Moments** folder in My Drive on the first upload. To use your own
   folder, open it in Drive, copy the ID after `/folders/` in the URL, and set
   `ROOT_FOLDER_ID` in the script.
3. **Add the script.** In this Sheet: **Extensions → Apps Script**, delete the
   starter code, paste all of
   [`google-apps-script/uploads/Code.gs`](./google-apps-script/uploads/Code.gs).
   *(Optional)* set `NOTIFY_EMAIL` to get an email per upload. **Save.**
4. **Run `setup` once.** In the toolbar function dropdown pick **`setup`** →
   **Run** → approve permissions (**Advanced → Go to … (unsafe) → Allow**).
   This grants Drive access and writes the header row.
5. **Deploy.** **Deploy → New deployment** → ⚙️ → **Web app**:
   - Description: `Shared Moments`
   - Execute as: **Me**
   - Who has access: **Anyone**
6. **Copy the Web app URL** (`/exec`). Opening it in a browser should show
   `{"ok":true,"files":[]}`.
7. **Connect the site.** In `.env`:

   ```
   VITE_UPLOAD_ENDPOINT=https://script.google.com/macros/s/YYYYYYYY/exec
   ```

8. Restart `pnpm dev` → **Shared Moments → Share a photo** → upload one. It
   should appear in the **Live gallery** tab within seconds and in your Drive
   folder (organised into dated subfolders).

**Removing a photo:** in the Shared Moments Sheet, set the **Hidden** column of
its row to `TRUE`. It disappears from the gallery within ~20 seconds. Delete the
file in Drive too if you want it gone entirely.

> ⚠️ The RSVP and Shared Moments scripts are **two separate deployments** with
> **two different `/exec` URLs**. Don't mix them up in `.env`.

Your finished `.env` should look like:

```
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
VITE_UPLOAD_ENDPOINT=https://script.google.com/macros/s/YYYYYYYY/exec
```

`.env` is git-ignored, so it won't be committed.

## 7. Deploy to Cloudflare

The site is hosted for free on **Cloudflare Workers** (static assets). The
project is already configured for it — `wrangler.jsonc` holds the settings and
`@cloudflare/vite-plugin` prepares the build.

> **Important:** the `VITE_RSVP_ENDPOINT` and `VITE_UPLOAD_ENDPOINT` values are
> baked into the site **when it's built**. Wherever the build runs (your
> computer or Cloudflare), those two values must be available — otherwise the
> live site will say RSVP / photo sharing isn't set up.

### 7.1 Create your Cloudflare account

1. Sign up at <https://dash.cloudflare.com/sign-up> and verify your email.
2. In the dashboard, open **Workers & Pages** once. The first time, Cloudflare
   asks you to pick a free **`workers.dev` subdomain** (e.g. `juanmaria`) —
   your site will live at `https://<project-name>.<subdomain>.workers.dev`.
3. Make sure you've set your project name in `wrangler.jsonc` (step 4), e.g.:

   ```jsonc
   "name": "juan-and-maria",
   ```

Then pick **one** of the two ways to deploy below. Option B is recommended if
your code is on GitHub — every push updates the live site automatically.

### 7.2 Option A — deploy from your computer

Uses the values in your local `.env`.

1. **Log in once** (opens the browser; click **Allow**):

   ```bash
   pnpm wrangler login
   ```

   Check it worked with `pnpm wrangler whoami`.

2. **Test the production build locally** (optional but recommended):

   ```bash
   pnpm preview
   ```

3. **Deploy:**

   ```bash
   pnpm run deploy
   ```

   This builds the site and uploads it. At the end it prints your live URL:
   `https://juan-and-maria.<subdomain>.workers.dev`.

4. **Updating later:** after any change to `config.js`, photos, etc., just run
   `pnpm run deploy` again.

### 7.3 Option B — auto-deploy from GitHub (recommended)

1. Push your code to your own GitHub repo (step 2).
2. In the Cloudflare dashboard go to **Workers & Pages → Create application**.
3. Choose **Import a repository** (Continue with GitHub). Authorize Cloudflare
   and give it access to your wedding repo, then select it.
4. Fill in the project settings:

   | Setting | Value |
   | --- | --- |
   | **Project name** | exactly the `name` in `wrangler.jsonc` (e.g. `juan-and-maria`) — they **must match** or the deploy fails |
   | **Build command** | `pnpm run build` |
   | **Deploy command** | `npx wrangler deploy` |
   | **Root directory** | `/` (leave default) |

5. Open **Advanced settings → Build variables** and add:

   | Variable name | Value |
   | --- | --- |
   | `VITE_RSVP_ENDPOINT` | your RSVP `/exec` URL (step 5) |
   | `VITE_UPLOAD_ENDPOINT` | your Shared Moments `/exec` URL (step 6) |
   | `NODE_VERSION` | `22` |

   Your `.env` file is git-ignored, so Cloudflare can only get these values from
   here. They must be **build variables** (not runtime variables/secrets),
   because Vite inserts them during the build.

6. Click **Create and deploy**. Watch the build log — when it finishes you'll
   see the `*.workers.dev` link.
7. **Updating later:** just `git push`. Cloudflare rebuilds and redeploys
   automatically (see progress under your project → **Deployments**).

**Changing a build variable later:** project → **Settings → Build → Variables
and secrets** → edit → then trigger a new build (push a commit, or
**Deployments → Retry/Redeploy**). The old deployment keeps the old values
until it's rebuilt.

### 7.4 Verify the live site

On the `workers.dev` URL (try it on your phone too):

- [ ] The welcome envelope opens and the music plays.
- [ ] The countdown shows the right number of days.
- [ ] Submit a test RSVP → new row in your RSVP Sheet.
- [ ] Upload a test photo → appears in **Live gallery** and in Drive.
- [ ] Delete the test row / hide the test photo afterwards.

### Cloudflare troubleshooting

| Problem | Fix |
| --- | --- |
| Live site says **"RSVP endpoint is not configured"** or **"Photo sharing isn't set up yet"** | The `VITE_*` values weren't present at build time. Option A: check `.env` then redeploy. Option B: add them as **build variables** and rebuild. |
| Build fails: **project name mismatch** | The Cloudflare project name and `name` in `wrangler.jsonc` must be identical. |
| Build fails on **Node / pnpm version** | Add build variable `NODE_VERSION` = `22`. |
| `wrangler login` fails or opens the wrong account | `pnpm wrangler logout`, then log in again. |
| RSVP/upload works locally but not live | Make sure the Apps Script is deployed with **Who has access: Anyone**, and you re-deployed a **New version** after editing it. |

## 8. Connect your own domain

Optional — the `workers.dev` URL works fine on its own.

1. **Buy a domain** (Hostinger, Namecheap, or Cloudflare Registrar — buying it
   on Cloudflare skips step 3).
2. **Add it to Cloudflare:** dashboard → **Add a domain** (Account Home →
   Onboard a domain) → enter your domain → choose the **Free** plan → continue
   through the DNS review (you can leave the records as they are).
3. **Change nameservers:** Cloudflare shows two nameservers (e.g.
   `ada.ns.cloudflare.com`). At your registrar — for Hostinger: **Domains →
   your domain → DNS / Nameservers → Change nameservers → custom** — replace
   the existing ones with Cloudflare's two. Wait until Cloudflare emails that
   the domain is **Active** (minutes to a few hours).
4. **Attach it to the site:** **Workers & Pages → your project → Settings →
   Domains & Routes → Add → Custom domain** → enter `yourdomain.com` (repeat
   for `www.yourdomain.com` if you want both). Cloudflare creates the DNS
   record and SSL certificate automatically.
5. **Update the site's links:** change the URLs in `index.html` (step 4) to the
   new domain, then redeploy (`pnpm run deploy` or `git push`).
6. Open `https://yourdomain.com` and run the checks in 7.4 again.

## 9. Print the table QR code

Point a QR code at your Shared Moments section:

```
https://your-domain.com/#shared-moments
```

Any free QR generator works. This link **skips the welcome envelope** and opens
the uploader directly (no music autoplay). `#share` and `#upload` work the same.

Test it on your phone before printing! 📸

---

## Final checklist

- [ ] Names, date, venues, schedule, entourage, FAQ updated in `config.js`
- [ ] All photos, music, and **gift QR codes** in `public/` replaced
- [ ] `index.html` title, description, and link-preview tags updated
- [ ] `wrangler.jsonc` `name` changed
- [ ] RSVP test submission appears in the Sheet
- [ ] Test photo appears in Drive and the live gallery
- [ ] Production env vars set (local `.env` or Cloudflare **build variables**)
- [ ] Live `workers.dev` (or custom domain) site tested on a phone
- [ ] QR code scanned and tested on a phone

## Project structure

```
src/
  lib/config.js        ← ALL wedding content (edit this)
  lib/submitRsvp.js    ← sends RSVPs to the Apps Script
  lib/uploadMoments.js ← uploads/fetches Shared Moments photos
  components/          ← Hero, OurStory, Gallery, SharedMoments, EventDetails,
                         Schedule, Entourage, Registry, Faq, Rsvp, Navbar, …
  index.css            ← colors & fonts (@theme)
public/                ← images, music, QR codes
index.html             ← page title + link-preview tags
google-apps-script/
  Code.gs, README.md          ← RSVP backend (Google Sheet)
  uploads/Code.gs, README.md  ← Shared Moments backend (Google Drive)
.env.example           ← copy to .env, add your two /exec URLs
wrangler.jsonc         ← Cloudflare project name/config
```

## Commands

```bash
pnpm dev          # local dev server
pnpm build        # build to dist/
pnpm preview      # build + run the production version locally
pnpm run deploy   # build + deploy to Cloudflare
```
