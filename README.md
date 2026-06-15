# Wedding RSVP Website

A modern, mobile-first wedding site with a live countdown, all the details, and
an RSVP form that saves responses straight to a Google Sheet.

**Stack:** React 19 + Vite · Tailwind CSS v4 · motion (animations) ·
lucide-react (icons) · Google Apps Script + Google Sheet (RSVP storage).
Deploys as a static site to Cloudflare Pages.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

The form works immediately in dev (it simulates a successful submit until you
wire up the Google Sheet endpoint).

## Edit your content

Everything — names, date, venues, schedule, FAQ, photos, registry links — lives
in **`src/lib/config.js`**. That's the only file you need to touch for content.

- The **countdown** reads `event.dateISO` (keep the `+08:00` timezone offset).
- Swap the placeholder **gallery/hero photos** (currently `picsum.photos`) for
  your own image URLs, or drop files in `public/` and reference `/yourphoto.jpg`.
- Colors live as tokens in `src/index.css` under `@theme` (gold + navy on white).

## Connect the RSVP form to your Google Sheet

See [`google-apps-script/README.md`](./google-apps-script/README.md) for the
full click-by-click guide. Short version:

1. Create a Google Sheet → **Extensions → Apps Script** → paste
   `google-apps-script/Code.gs`.
2. **Deploy → New deployment → Web app** (Execute as *Me*, access *Anyone*).
3. Copy the `/exec` URL into a `.env` file:

   ```
   VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```

4. Restart `npm run dev` and submit a test RSVP — it lands in your Sheet.

## Build

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

## Deploy to Cloudflare Pages

**Option A — direct upload (fastest):**

```bash
npm i -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name wed-site
```

**Option B — Git integration:** push this repo to GitHub, then in the Cloudflare
dashboard: **Workers & Pages → Create → Pages → Connect to Git**. Set:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:** `VITE_RSVP_ENDPOINT` = your `/exec` URL

> Set `VITE_RSVP_ENDPOINT` in the Pages project settings (Variables) so the
> production build talks to your Sheet. Vite inlines `VITE_*` vars at build time.

## Point your Hostinger domain at it

**Recommended (full Cloudflare):**

1. In Cloudflare: **Add a site** → enter your domain → choose Free plan.
2. Cloudflare gives you two nameservers. In **Hostinger → Domains → DNS /
   Nameservers**, switch to *custom nameservers* and paste those two.
3. Wait for activation (minutes to a few hours), then in your Pages project:
   **Custom domains → Set up a domain** → add your domain. SSL is automatic.

**Without moving nameservers:** in Hostinger DNS, add a `CNAME` for your domain
(or `www`) pointing to your `wed-site.pages.dev` hostname, then add the custom
domain in the Pages project.

## Project structure

```
src/
  lib/config.js      ← all wedding content (edit this)
  lib/submitRsvp.js  ← posts the form to Apps Script
  components/        ← Hero, Countdown, OurStory, Gallery, EventDetails,
                       Schedule, Registry, Faq, Travel, Rsvp, Navbar, Footer
google-apps-script/  ← Code.gs + setup guide for the Google Sheet backend
```
