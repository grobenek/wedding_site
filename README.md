# svadba.szathmary.sk

Wedding website built with Astro, deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

Push to `main` → GitHub Actions deploys automatically.

---

## DNS setup (one-time)

In your DNS provider, add:

```
Type:  CNAME
Name:  svadba
Value: YOUR_GITHUB_USERNAME.github.io
TTL:   3600
```

In GitHub repo Settings → Pages → Custom domain: `svadba.szathmary.sk`
Enable "Enforce HTTPS" once the cert provisions (a few minutes).

---

## Checklist: what to fill in

### `src/layouts/Layout.astro`
- [ ] `COUPLE_A` and `COUPLE_B` — your first names

### `src/pages/index.astro`
- [ ] `COUPLE_A`, `COUPLE_B`
- [ ] `DATE_DAY` — day number (used for the background watermark, e.g. `'12'`)
- [ ] `DATE_FULL` — full date string in Slovak, e.g. `'12. septembra 2026'`
- [ ] `DAY_NAME` — day of week in Slovak, e.g. `'Sobota'`
- [ ] `LOCATION` — venue name and town

### `src/pages/rsvp/index.astro`
- [ ] `FORMSPREE_ID` — your Formspree form ID (see below)
- [ ] RSVP deadline in the intro text

### `src/pages/details.astro`
- [ ] Ceremony time, location, address, note
- [ ] Reception time, location, address, note
- [ ] Contact email

### `src/pages/photos.astro`
- [ ] `PHOTOS_URL` — your Google Photos shared album URL
- [ ] `PASSWORD` — something simple guests will know
- [ ] Uncomment the Photos link in `src/layouts/Layout.astro`

---

## Formspree setup

1. Go to [formspree.io](https://formspree.io) → sign up (free)
2. New form → give it a name (e.g. "Svadba RSVP")
3. Copy the form ID from the endpoint URL:  
   `https://formspree.io/f/xrgjoqkz` → ID is `xrgjoqkz`
4. Paste into `FORMSPREE_ID` in `src/pages/rsvp/index.astro`
5. Formspree will email you each submission. You can also view them in the dashboard.

---

## QR code generation

### Your master spreadsheet (keep this private, not in the repo)

Columns:
```
token | name        | plus1 | night | url                                                          | rsvp_status | notes
xk3z  | Jana Kovač  | 1     | 1     | https://svadba.szathmary.sk/rsvp?id=xk3z&name=Jana+Kovač&p=1&n=1 | pending |
9mwp  | Peter Novák | 0     | 0     | https://svadba.szathmary.sk/rsvp?id=9mwp&name=Peter+Novák        | pending |
```

**URL formula** (Google Sheets):
```
="https://svadba.szathmary.sk/rsvp?id="&A2&"&name="&SUBSTITUTE(B2," ","+")&IF(C2=1,"&p=1","")&IF(D2=1,"&n=1","")
```

### Generating QR codes in bulk

1. Export the `url` column as a plain .txt file (one URL per line)
2. Go to [goqr.me/qr-code-generator](https://goqr.me) or use the bulk tool at [qr-code-generator.com](https://www.qr-code-generator.com)
3. Generate one QR code per household → download as PNG or SVG
4. Name each file by token (e.g. `xk3z.png`) so you know which is which
5. Print each QR code on the corresponding physical invite

### Token generation (simple approach)

Run this in your browser console to generate N tokens:
```javascript
Array.from({length: 50}, () => Math.random().toString(36).slice(2, 6)).join('\n')
```

---

## Photos page

The password gate is client-side only — not cryptographically secure,
but sufficient to keep the link off casual discovery. The password is
visible in the built JS if someone inspects it. Acceptable for a wedding.

Activate when your album is ready:
1. Create a Google Photos shared album
2. Copy the share link
3. Paste into `PHOTOS_URL` in `src/pages/photos.astro`
4. Set a memorable `PASSWORD`
5. Uncomment the nav link in `src/layouts/Layout.astro`

---

## Structure

```
src/
├── layouts/
│   └── Layout.astro        # base layout, nav, fonts
├── styles/
│   └── global.css          # design tokens, all shared styles
└── pages/
    ├── index.astro          # hero / landing
    ├── details.astro        # ceremony, reception, accommodation
    ├── photos.astro         # password-gated photo album
    └── rsvp/
        ├── index.astro      # RSVP form
        └── thanks.astro     # confirmation page
```
