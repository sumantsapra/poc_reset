# Tennis Partner

One Edge Delivery project for the four Tennis Partner microsites. Each site keeps its own pages and stylesheet. The URL path picks the theme.

| Site | Path |
| --- | --- |
| AO Exchange | `/ao-exchange`, `/ao-exchange/agenda`, `/ao-exchange/speakers` |
| Find your play | `/reset`, `/reset/agenda`, `/reset/speakers` |
| The Champion's Set | `/champions-set` |
| Future Champions | `/future-champions`, `/future-champions/how-does-it-work` |

`/` is a short index of the four sites. AO Exchange registration stays at `/ao-exchange#form`. The Reset prize form stays at `/reset#form` and still opens the Typeform `wcPNpVJ2`. Future Champions nominations open `https://0dtcfr6wi77.typeform.com/futurechampion`. Questions go to `futurechampions@tennis.com.au`.

## Preview locally

```bash
npm run preview
```

Open http://127.0.0.1:3000 and visit each path above. These `index.html` files are only for local preview. Once the code bus is live, the page body comes from Document Authoring. Paste the matching file from `content/` into each document.

## Deploy

This is the existing Reset code bus. The preview host is `https://main--poc-reset--sumantsapra.aem.page` (the GitHub repo name uses an underscore, which the preview hostname cannot). Push `main` on that repository. Do not create a second project.

After the push, create or replace these Document Authoring documents and set each title from the matching local page:

- `/` from `content/index.html` — Tennis Partner
- `/ao-exchange` from `content/ao-exchange.html` — AO Exchange
- `/ao-exchange/agenda` from `content/ao-exchange/agenda.html`
- `/ao-exchange/speakers` from `content/ao-exchange/speakers.html`
- `/reset` from `content/reset.html` — Find your play
- `/reset/agenda` from `content/reset/agenda.html`
- `/reset/speakers` from `content/reset/speakers.html`
- `/champions-set` from `content/champions-set.html` — The Champion's Set
- `/future-champions` from `content/future-champions.html` — Future Champions
- `/future-champions/how-does-it-work` from `content/future-champions/how-does-it-work.html`

Preview each path, then publish. Map `tennispartner.com.au` to this one site so the root-relative links resolve.

Images in `/media` are served from this repository.

## Fonts

The Framer sites use Sequel 100 Wide, which is licensed. This project uses [Anybody](https://fonts.google.com/specimen/Anybody) until the woff2 files are added. See the comment in `styles/fonts.css`.
