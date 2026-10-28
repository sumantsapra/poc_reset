# Find your play

Adobe Edge Delivery Services rebuild of [tennispartner.com.au/reset](https://tennispartner.com.au/reset).

This is a single page. The navigation matches the live Framer site and points Home, Agenda, Speakers, and Register now at AO Exchange. The prize form is the same Typeform (`wcPNpVJ2`). Contact us opens `newpartnerships@tennis.com.au`.

## Preview locally

```bash
npm run preview
```

Open http://127.0.0.1:3000. `index.html` is only for this local preview. Once the code bus is live, the page body comes from Document Authoring.

## Deploy

Use the same GitHub account that hosts AO Exchange. That account can install the AEM Code Sync app. The repository name must be `reset` (lowercase, no underscores). An underscore makes the preview hostname invalid.

1. Create a GitHub repository named `reset`.
2. Push this project to `main`.
3. Install [AEM Code Sync](https://github.com/apps/aem-code-sync/installations/new) on that account only, limited to this repository. Leave the content step empty if the wizard asks.
4. Confirm the code bus: `https://main--reset--OWNER.aem.page/scripts/aem.js` should return JavaScript. `OWNER` is the GitHub account name, in lowercase.
5. Open `https://main--reset--OWNER.aem.page/`. The first view is the Document Authoring starter page. Replace the home document with `content/home.html`, set the title to **Find your play** and the description to the line in `head.html`, then Preview.
6. Publish when the preview looks right. The live host is `https://main--reset--OWNER.aem.live/`.

Images in `/media` are served from this repository. The page references them as `/media/...`.

## Fonts

The Framer site uses Sequel 100 Wide, which is licensed. This project uses [Anybody](https://fonts.google.com/specimen/Anybody) until the woff2 files are added. See the comment in `styles/fonts.css`.
