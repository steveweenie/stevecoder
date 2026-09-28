# stevecoder.com

A portfolio built like a game save file. Next.js App Router, TypeScript, Tailwind v4, Motion, deployed on Vercel.

```bash
npm install
cp .env.example .env.local   # FEEDS_MODE=mock serves the design's mock data
npm run dev
```

## Where things live

| Path | What |
| --- | --- |
| `app/globals.css` | Tokens and the three themes (`dark`, `light`, `devroom`) on `<html data-theme>`, keyframes (all `steps(n)`), reduced-motion rule |
| `lib/content.ts` | Quest Log, stats, achievements, inventory, guestbook seed |
| `lib/levels.ts` | Level Select + all six case studies. Invented copy starts with `TODO:` |
| `lib/slots.ts` | Home page image slots |
| `lib/feeds.ts` | GitHub, Last.fm, YouTube, Steam, Open-Meteo. Each resolves to live or offline; loading is the Suspense fallback |
| `components/game/` | Theme, Konami, presence, terminal |
| `components/home/` | One file per home section |
| `app/levels/[slug]/` | Case study template + OG images |
| `lib/og.tsx` | OG templates (home dark/light, project, case study) |

## Images

Every `insert: …` box is a slot rendered with `next/image` (label = alt text). Placeholder files in
`public/images/` are transparent PNGs, so the labeled box shows through. To fill a slot, drop a real image at the
same path, or change its `src` in `lib/levels.ts` / `lib/slots.ts`. `npm run placeholders` recreates any missing
placeholder.

Real images already in place: the headshot, and Undead Presidents crops (hero, featured, gallery split-screen,
Steam capsule) plus the Code Quantum team photo, all from the old site.

OG project cards use `assets/og/<slug>.jpg` (600x630) when present.

## Environment

See `.env.example`. Without keys, a widget shows its offline state; the contact form and guestbook return
their error states. `FEEDS_MODE=mock` fakes everything for local work. Never set it in production.

Guestbook, rate limits, and "players online" use Upstash Redis. Add it from the Vercel Marketplace
(`vercel integration add upstash`); it provisions `KV_REST_API_URL` and `KV_REST_API_TOKEN`.

### Moderating the guestbook

Entries land as pending. With `GUESTBOOK_ADMIN_TOKEN` set:

```bash
curl -H "Authorization: Bearer $TOKEN" https://stevecoder.com/api/guestbook/moderate
curl -X POST -H "Authorization: Bearer $TOKEN" -d '{"id":"<id>","action":"approve"}' https://stevecoder.com/api/guestbook/moderate
```

Approving revalidates `/`.

## Fonts

Self-hosted in `public/fonts`, subset to Latin: Departure Mono (replaces the Silkscreen stand-in from the
designs), Satoshi 400/500/700, JetBrains Mono 400. Full `.otf`/`.ttf` copies for OG rendering live in
`assets/og-fonts`.
