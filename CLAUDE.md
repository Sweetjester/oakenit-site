# CLAUDE.md — OakenIT project memory

> This file is read automatically by Claude Code when working in this repo. It contains everything a fresh agent needs to resume development without re-discovering context.
>
> **Last updated**: 2026-08-25 (lantern-tree rebrand: real logo artwork, forest/lantern palette, Cormorant Garamond)

---

## 1. What this is

**OakenIT** (legal: **Oaken IT Ltd**) is one of the user's two brands. This repo is the public marketing site (`oakenit.com`), built to convert visitors into inquiry-form submissions.

**Sister project**: [SweetTech](https://github.com/Sweetjester/Sweettech-site) at `/Documents/Vibe/sweettech`. The OakenIT codebase was forked from SweetTech and rebranded — the two share **identical architecture** and **identical positioning** (three-pillar UK technical services). What differs: name, palette, logo, domain, and any brand-specific copy tweaks.

**Owner**: Andrew Hyslop ("Andy"). Trading email: `hello@oakenit.com` (planned — Google Workspace setup for the oakenit.com domain pending).

**Positioning** (locked, do not drift without permission):
- Three pillars: **Development · Systems & Infrastructure · Consulting**
- Voice: confident, plain English, slight edge, no hedging, no marketing fluff
- Brand promise: senior team + AI = the work of a much bigger firm, delivered fast and explained clearly
- Differentiator vs. agencies: faster, simpler, one contract
- Differentiator vs. MSPs: more senior, more strategic, AI-native

**Current hero** (identical to SweetTech's — change with permission):
- Eyebrow: `BESPOKE TECH · UK`
- Headline: `Tell us` / *`what you need.`*
- Sub: "Quick, bespoke technical work for UK businesses — software, infrastructure, or a sharp answer. Senior team. AI-augmented. Brief us below."
- Primary CTA: "Brief us" → `#contact`
- Secondary CTA: "How it works" → `#process`

---

## 2. Tech stack

Identical to SweetTech:

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **React**: 19
- **Styling**: Tailwind v3 with `darkMode: 'class'`
- **Motion**: Framer Motion 11
- **Icons**: Lucide React
- **Fonts** (`next/font/google`): Cormorant Garamond (display serif — matches the logo wordmark), Inter (sans), JetBrains Mono
- **Email**: Resend (zero-DNS path — see § 7)
- **Analytics**: Plausible + Microsoft Clarity (both env-gated)
- **Hosting**: Railway (Nixpacks, Node 20+, `npm start`)
- **DNS**: TBD — depends on where `oakenit.com` is registered
- **Node**: 20+ required (pinned in `.nvmrc` and `package.json` engines)

---

## 3. Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (catches TS + Tailwind errors)
npm start         # serve production build locally
```

Standard push flow:
```bash
npm run build && git add <files> && git commit -m "..." && git push origin main
```

---

## 4. Repository structure

```
oakenit/
├── app/
│   ├── layout.tsx              # Fonts, metadata, JSON-LD via StructuredData,
│   │                           # theme init script, Analytics, ThemeProvider
│   ├── page.tsx                # Composes: Cursor → Nav → Hero → CTA →
│   │                           # Services → WhyUs → Process → Footer
│   ├── globals.css             # Base styles, theme custom-props, grain,
│   │                           # scrollbar, marquee, .canopy, .text-lantern
│   ├── icon.png                # Favicon (file convention)
│   ├── apple-icon.png          # Apple touch icon (file convention)
│   ├── robots.ts               # Dynamic /robots.txt
│   ├── sitemap.ts              # Dynamic /sitemap.xml
│   ├── opengraph-image.tsx     # Dynamic 1200×630 branded OG card
│   └── actions/
│       └── inquiry.ts          # Server Action: form validation + Resend send
│
├── components/
│   ├── Nav.tsx                 # Sticky nav + theme toggle + Book a chat CTA
│   ├── Hero.tsx                # Headline, sub, CTAs, inline stats strip
│   ├── CTA.tsx                 # Contact section (pitch left, form right)
│   ├── InquiryForm.tsx         # useActionState form with honeypot + time-trap
│   ├── Services.tsx            # Three-pillar bento
│   ├── Process.tsx             # 4-step grid (Listen/Scope/Ship/Stay)
│   ├── WhyUs.tsx               # Sticky-left value points + pull quote
│   ├── Footer.tsx
│   ├── Logo.tsx                # mark.png + live-text wordmark
│   ├── Lantern.tsx             # <Lantern> + <LanternGlyph> SVG motifs
│   ├── SectionLabel.tsx        # Shared section eyebrow
│   ├── Cursor.tsx              # Desktop-only magnetic cursor
│   ├── ThemeProvider.tsx       # Theme context + no-flash init script
│   ├── ThemeToggle.tsx         # Sun/moon toggle
│   ├── StructuredData.tsx      # JSON-LD Organization + WebSite + Service
│   ├── Analytics.tsx           # Plausible + Clarity (env-gated)
│   └── Marquee.tsx             # Unused; kept for optional reuse
│
├── public/
│   └── mark.png                # The lantern-tree mark (transparent, 900px)
│
├── README.md
├── CLAUDE.md                   # This file
├── railway.json                # Nixpacks build/start config
├── next.config.mjs
├── tailwind.config.ts          # Brand palette: forest, lantern, cream
├── tsconfig.json
├── postcss.config.mjs
├── .nvmrc                      # 20
└── package.json
```

---

## 5. Brand system (OakenIT-specific)

### Colors (in `tailwind.config.ts`)

Sampled directly off the logo mark: the canopy greens and the lantern golds.

| Token | Hex | Use |
|---|---|---|
| `forest-950` | `#031507` | Dark-mode bg; footer bg in **both** themes |
| `forest-900` | `#06200d` | Dark-mode card bg |
| `forest-800` | `#0a2e12` | Body text (light mode), headings |
| `forest-700` | `#0f3f18` | **Light-mode primary button**, wordmark |
| `forest-600` | `#18551f` | Light-mode link hover, stat numerals |
| `forest-50` | `#eef5ef` | Process section band (light) |
| `lantern-200` | `#ffdb8a` | Dark-mode link hover |
| `lantern-300` | `#f7c04a` | **Dark-mode primary button**, lantern fill, glyphs |
| `lantern-400` | `#eda21b` | Glow colour, focus ring, selection |
| `lantern-500` | `#d4820c` | Light-mode accent line / glyphs |
| `lantern-600` | `#b46000` | Light-mode emphasis text (readable on cream) |
| `cream-50` | `#faf7f1` | Light-mode bg |
| `cream-100` | `#f3ece3` | Light-mode card bg / dark-mode text |

**Rule**: green is the ground, gold is the light. Gold is an *accent* — never a
large fill on cream (contrast dies). Primary CTA is solid `forest-700` in light
mode and solid `lantern-300` in dark mode.

Pattern:
```tsx
className="bg-cream-50 dark:bg-forest-950 text-forest-800 dark:text-cream-100"
```

### Typography

- **Display (Cormorant Garamond)**: all headlines and "feature" text. Set
  `font-semibold` at display sizes so the hairlines survive; emphasis words are
  `italic font-medium` + `.text-lantern` (gold gradient, theme-aware).
- **Sans (Inter)**: body, eyebrow labels, UI.
- **Mono (JetBrains)**: rare — footer status line only.

### Motifs

- `components/Lantern.tsx` — `<Lantern>` (hanging, sways) and `<LanternGlyph>`
  (~1em, used as the list bullet everywhere the old `✦` was).
- `components/SectionLabel.tsx` — the shared eyebrow: glyph + rule + label.
- `.canopy` (globals.css) — the soft green/gold light pooled behind the hero.
- The mark itself is used ghosted as a watermark in the hero and footer.

### Voice rules (same as SweetTech)

- Plain English. No "leverage", "synergize", "robust", "scalable solutions".
- Short declarative sentences. Full stops. Confident.
- Active verbs. "We build" not "we provide building".
- Pick fights with the alternatives (agencies, MSPs, freelancers).
- Italic lantern-gold word = the **transformation** or **value**, not the action.
- Headline pattern: `[plain statement]. [italic gradient promise].`

### Logo

Real artwork, delivered 2026-08-25: a deep-green tree hung with gold lanterns.

- `public/mark.png` (900px, transparent) — the mark. One file for both themes.
- `app/icon.png` + `app/apple-icon.png` — favicons, via Next's file conventions
  (there is deliberately **no** `icons` block in `layout.tsx` metadata).
- The wordmark is **not** an image — it's live text in Cormorant Garamond, so it
  recolours per theme. See `components/Logo.tsx`.

Andy supplied two files: a full-colour tree illustration and a flat cream
lockup. The palette is sampled from the **illustration** — the lockup's green
was off-brand.

---

## 6. Feature state — what's built

All features carry over from SweetTech identical:

### ✅ Theme system
- Class-based dark mode, default = dark
- Anti-flash inline script reads `localStorage['oakenit-theme']` → `prefers-color-scheme` → dark default
- Toggle in Nav (animated sun/moon)

### ✅ Inquiry form
- Server Action at `app/actions/inquiry.ts`
- Sends via Resend → `hello@oakenit.com` (default; override in `INQUIRY_TO_EMAIL`)
- Default sender: `OakenIT Inquiries <onboarding@resend.dev>` — works without domain verification
- Honeypot (`website` field) + 1.5s time-trap
- Falls back to `console.log` if `RESEND_API_KEY` unset
- Surfaces Resend's actual error to the UI on failure

### ✅ SEO foundation
- `/robots.txt`, `/sitemap.xml` (dynamic)
- JSON-LD `<script>`: Organization + WebSite + ProfessionalService + OfferCatalog
- `<head>` metadata, keywords, `en_GB` locale, canonical URL
- Dynamic OG image at `/opengraph-image` — oak palette, brand-matched
- Analytics wired, env-gated

### ✅ Polish
- Custom magnetic cursor (desktop only)
- Grain overlay (theme-aware opacity)
- Smooth scroll, custom scrollbar
- `text-oak-gradient` for italic emphasis (differs light/dark)

### ❌ Not yet built (Phase 2)
- Service landing pages (`/services/development`, etc.)
- Blog (`/insights/...`)
- Case studies
- Testimonials section
- Pricing anchor line
- Cal.com booking widget
- Email signup

---

## 7. Environment variables

Set in **Railway → OakenIT service → Variables**.

| Variable | Required? | Default | Purpose |
|---|---|---|---|
| `RESEND_API_KEY` | For email | — (logs only) | Resend API key |
| `RESEND_FROM_EMAIL` | No | `OakenIT Inquiries <onboarding@resend.dev>` | Sender. Override once oakenit.com is verified in Resend |
| `INQUIRY_TO_EMAIL` | No | `hello@oakenit.com` | Recipient. On Resend free tier this must match the Resend account email; use the account owner's address until domain verification |
| `NEXT_PUBLIC_SITE_URL` | No | `https://www.oakenit.com` | Used by sitemap/OG/schema |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | unset | Enables Plausible. Value: `oakenit.com` |
| `NEXT_PUBLIC_CLARITY_ID` | No | unset | Enables Microsoft Clarity |
| `GOOGLE_SITE_VERIFICATION` | No | unset | Search Console meta tag |
| `BING_SITE_VERIFICATION` | No | unset | Bing Webmaster meta tag |

`NEXT_PUBLIC_*` vars are baked into the client bundle at build time — not secrets, require rebuild to change.

---

## 8. External services & accounts

TBD for OakenIT — most of these need to be set up. Track them here as they are:

| Service | Owner | Email used | Status |
|---|---|---|---|
| **Railway** | Andy | — | ✅ Project `oakenit-site`, service `web`, deploys from GitHub `main`. URL: https://web-production-5eb08.up.railway.app |
| **GitHub** | Andy (`Sweetjester`) | — | ✅ `Sweetjester/oakenit-site` |
| **Domain registrar for oakenit.com** | Andy | — | ⏳ Need to confirm which registrar |
| **Google Workspace** | Andy | `hello@oakenit.com` / `andy@oakenit.com` | ⏳ Not yet set up for oakenit.com |
| **Resend** | — | — | ⏳ Consider a separate Resend account for OakenIT, or reuse SweetTech's account (in which case `INQUIRY_TO_EMAIL` must be that account's registered email until domain is verified) |
| **Plausible** | — | — | ⏳ Add oakenit.com as a second site (Plausible bills per site) |
| **Microsoft Clarity** | — | — | ⏳ Create OakenIT project |
| **Google Search Console** | — | — | ⏳ Verify oakenit.com |

### DNS for oakenit.com

Not yet configured. When it's set up:

1. **Get Railway's CNAME target** (something like `xxxxxxxx.up.railway.app`) from the Railway custom-domain dialog.
2. Add CNAME `www` → that target at whichever registrar hosts `oakenit.com`.
3. If the registrar blocks apex CNAME (Squarespace does; some don't), use domain forwarding or an HTTPS record for the apex.
4. Add the `_railway-verify.www` TXT record Railway shows.
5. If email through Google Workspace is planned, add MX + SPF + DKIM as per Workspace's setup wizard.

---

## 9. Marketing & SEO strategy

Same locked strategy as SweetTech:

- **ICP**: UK SMBs, 10–200 employees
- **Geo**: UK-wide (national)
- **Primary channel**: Organic SEO + content
- **Secondary channel** (later): LinkedIn founder-led

**Open strategic question**: is OakenIT competing with SweetTech for the same buyers, or targeting a different segment / different geography / different vertical? If they're targeting the same market, content and keyword strategy should differentiate — otherwise the two sites cannibalise each other in search.

Andy to decide before Phase 2 content build starts. Ask.

---

## 10. Next moves

1. ~~Real logo artwork~~ ✅ done 2026-08-25.
2. ~~Create GitHub repo~~ ✅ done.
3. **Add `RESEND_API_KEY`** in Railway (and reconsider `INQUIRY_TO_EMAIL` based on which Resend account is used) — the form logs to console until then.
4. **Point `oakenit.com` DNS** at Railway. Registrar-specific — steps depend on where the domain is registered.
5. **Set up Google Workspace** email for `hello@oakenit.com` (if not already).
6. **Answer the OakenIT vs SweetTech strategic question** (see § 9) before starting Phase 2 content work.

---

## 11. Known quirks & gotchas

Inherited from SweetTech, all still apply:

1. **OG image uses system serif, not Cormorant.** `next/og` needs font files as ArrayBuffers — skipped. It *does* inline `public/mark.png` as a base64 data URI (read with `node:fs`, so the route must stay on the Node runtime).
2. **`overflow-y-hidden` on AnimatedLine (Hero)** — not `overflow-hidden` — so italic glyph flourishes extend horizontally freely while the vertical slide-up animation still clips.
3. **`whitespace-nowrap` on key headline phrases** to prevent mid-phrase wraps. If you change copy, re-evaluate.
4. **If oakenit.com is at a registrar that blocks apex CNAME**, use domain forwarding or HTTPS records for the apex; only `www` gets the CNAME. Same pattern as SweetTech's Squarespace workaround.
5. **Resend free tier**: sender `onboarding@resend.dev` can only send TO the email the Resend account was registered with (until domain verification). Set `INQUIRY_TO_EMAIL` to that address.
6. **Tailwind dark variants are explicit**, not auto. Every styled element needs `X dark:Y`.
7. **Cormorant runs small and light.** Headlines need `font-semibold` and a larger `clamp()` than a normal serif; body-size display text needs `font-medium` minimum.
10. **Never use `-z-10` for full-bleed backdrops.** `html` has a background *and* `body` has an opaque background, so a negative-z child paints underneath the body background and vanishes. Use `z-0` on the backdrop + `relative z-10` on the content.
8. **Background command exit code 143** is SIGTERM from `kill`, not a real failure.
9. **`railway.json` buildCommand** = `npm run build`. Do not reintroduce `npm ci &&` — EBUSY race on Railway's cache.

---

## 12. Working with Andy

Same style as SweetTech project:

- **Direct, decisive feedback.** "I don't like this" = ship a new version + 1–2 alternatives, not a clarifying question.
- **Iteration speed matters.** Multiple hero versions per session is normal.
- **Push on his behalf.** He runs Railway, GitHub, DNS; you run the code.
- **Show don't tell.** Ship the diff, explain in 3–5 lines.
- **Brand consistency.** Update all surfaces (hero, OG, metadata) in the same commit.
- **He is non-technical for cloud/DNS/email accounts but technically literate.** Walk him through external-service setup step by step.
- **Default to pushing immediately** unless the change is risky or needs his call.
- **Don't drift positioning without permission.** The three-pillar frame is locked.

---

## 13. Useful commands

```bash
git log --oneline -10
git status

rm -rf .next node_modules/.cache && npm install && npm run build   # clean rebuild

# Local smoke test
PORT=3500 npm start &
curl -s http://localhost:3500 | grep -oE "Tell us|Brief us|oak-gradient"
kill $(lsof -ti tcp:3500)

# Inspect head + generated routes
curl -s http://localhost:3500/sitemap.xml
curl -s http://localhost:3500/robots.txt
curl -sI http://localhost:3500/opengraph-image
curl -s http://localhost:3500 | grep -A1 application/ld+json
```

---

## 14. Reporting changes back to Andy

When shipping:

1. **What changed** — 1-3 bullets, plain English
2. **What he needs to do**, if anything — env var to add, DNS record to set, tab to refresh
3. **What to look at** — be specific (*"check the new headline on mobile portrait"*, not *"see if it looks OK"*)

Don't ask "want me to push?" — push and tell him.
