# CLAUDE.md — OakenIT project memory

> This file is read automatically by Claude Code when working in this repo. It contains everything a fresh agent needs to resume development without re-discovering context.
>
> **Last updated**: 2026-08-27 (lantern reworked off the flag reading; dark-mode lighting; lit background tree)

---

## 1. What this is

**OakenIT** (legal: **Oaken IT Ltd**) is one of the user's two brands. This repo is the public marketing site (`oakenit.com`), built to convert visitors into inquiry-form submissions.

**Internal system**: [Heartwood](https://github.com/Sweetjester/heartwood) — OakenIT's own operating system (append-only event log, department boards, MCP context layer for AI agents). This site's inquiry form files leads into it. See § 6.

**Sister project**: [SweetTech](https://github.com/Sweetjester/Sweettech-site) at `/Documents/Vibe/sweettech`. The OakenIT codebase was forked from SweetTech and rebranded — the two share **identical architecture** and **identical positioning** (three-pillar UK technical services). What differs: name, palette, logo, domain, and any brand-specific copy tweaks.

**Owner**: Andrew Hyslop ("Andy"). Trading email: `hello@oakenit.com` (planned — Google Workspace setup for the oakenit.com domain pending).

**Positioning** (do not drift without permission):

Rewritten 2026-08-25 after a commissioned design review. The through-line is
**outcome first, then specificity, then proof** — the previous site made the
visitor work out what OakenIT does.

- Headline promise: *we help businesses kickstart their IT*
- What we do, in three cards: **Kickstart / Bespoke development /
  Short & long-term support** (was Build/Fix/Improve until 2026-08-31)
- Differentiator: *senior expertise without the consultancy overhead* — you
  work directly with the person designing and delivering the thing. For an SME
  buyer, small and senior is the selling point. **Do not** write copy that
  implies agency scale.
- Brand personality: *technology without the nonsense.*
  ⚠️ The "Most firms sell you complexity. We sell you its absence." band
  (`Ethos.tsx`) was **removed on 2026-08-25 at Andy's request**. Andy's
  designer rated that line highly, so it may come back — but don't reinstate
  the section without asking.

**History worth knowing** — an earlier version sold three *disciplines*
(Development / Systems / Consulting). Andy killed it as fluff, then the design
review said services were invisible and asked for them back framed as problems
rather than departments (Build/Fix/Improve). Andy renamed them again on
2026-08-31 to Kickstart / Bespoke development / Short & long-term support —
named after what a customer is buying. Don't regress to discipline names.

**AI messaging is deliberately demoted.** It used to be a headline pillar
("AI is the unfair advantage"). A business buyer reads that as *"I'm paying
consultancy rates for someone to prompt ChatGPT."* It is now one reason among
four, phrased as "Modern tools, responsible judgement". Keep it there.

**Current hero** (no eyebrow, no response-time promises — both removed at
Andy's request 2026-08-25; don't reinstate an SLA strip):
- Headline: `We help businesses` / `kickstart their IT.` (leaf green)
- Sub: "OakenIT helps businesses build software and improve infrastructure to solve common and niche business problems."
- Capability line: `Software · Infrastructure · Automation · Technical consulting`
- Primary CTA: "Discuss a project" → `#contact`
- Secondary CTA: "Check out our work" → `/work`

---

## 2. Tech stack

Identical to SweetTech:

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **React**: 19
- **Styling**: Tailwind v3 with `darkMode: 'class'`
- **Motion**: Framer Motion 11
- **Icons**: Lucide React
- **Fonts** (`next/font/google`): Prata (display serif — the face in the logo lockup), Inter (sans), JetBrains Mono
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
│   ├── page.tsx                # Hero → TrustStrip → Services → WorkTeaser →
│   │                           # WhyUs → Stack → CTA → Footer
│   │                           # (no custom cursor — removed 2026-08-25,
│   │                           #  it sat on top of the copy)
│   ├── globals.css             # Base styles, theme custom-props, grain,
│   │                           # scrollbar, marquee, .canopy, .text-leaf
│   ├── fonts/                  # Prata + Inter TTFs for the OG card (satori
│   │                           # can't use CSS fonts)
│   ├── work/page.tsx           # /work — the case studies + live cvlive.io embed
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
│   ├── TrustStrip.tsx          # Capability band under the hero
│   ├── Services.tsx            # Kickstart / Bespoke dev / Support
│   ├── Stack.tsx               # "Our stack" — Simple Icons brand marks
│   ├── WorkTeaser.tsx          # Homepage band linking to /work
│   ├── SiteEmbed.tsx           # Scaled, scrollable live-site iframe
│   ├── CTA.tsx                 # Contact section (pitch left, form right)
│   ├── InquiryForm.tsx         # 4 fields only — see § 6
│   ├── WhyUs.tsx               # Sticky-left reasons-to-believe (4)
│   ├── Footer.tsx
│   ├── Logo.tsx                # mark.png + live-text wordmark
│   ├── MoonLantern.tsx         # <MoonLantern>/<HangingLantern>/<MoonGlyph>
│   ├── SectionLabel.tsx        # Shared section eyebrow
│   ├── ThemeProvider.tsx       # Theme context + no-flash init script
│   ├── ThemeToggle.tsx         # Sun/moon toggle
│   ├── StructuredData.tsx      # JSON-LD Organization + WebSite + Service
│   ├── Analytics.tsx           # Plausible + Clarity (env-gated)
│   └── Marquee.tsx             # Unused; kept for optional reuse
│
├── public/
│   ├── mark.png                # The lantern-tree mark (transparent, 900px)
│   └── moon-lantern.svg        # Standalone lantern, for logo artwork
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
| `leaf-200` | `#c9e894` | Dark-mode link hover |
| `leaf-300` | `#a0d850` | **The logo's light green.** Dark-mode button/accent |
| `leaf-400` | `#7fbb35` | Glow, focus ring |
| `leaf-500` | `#5f9427` | Light-mode rules, arrows (3.4:1 — not body text) |
| `leaf-600` | `#4a761d` | Light-mode emphasis text (5.1:1 on cream) |
| `lantern-300` / `-500` | `#f7c04a` / `#d4820c` | **Lantern motif only** — see below |
| `cream-50` | `#faf7f1` | Light-mode bg |
| `cream-100` | `#f3ece3` | Light-mode card bg / dark-mode text |

**Rule**: forest green is the ground, **leaf green is the accent**. Andy swapped
the accent from gold to leaf green on 2026-08-25 — emphasis text, buttons,
links, rules, numerals and focus rings are all `leaf-*` now.

**Gold survives in exactly one place**: the lantern motif — `<MoonLantern>`
decorations and `<MoonGlyph>` bullets. The mark PNG itself contains that
gold, so it can't be eliminated; it reads as illustration rather than as the UI
accent. If you touch colours, the test is: *is this element a lantern?* If yes,
`lantern-*`; if no, `leaf-*`. Don't reintroduce gold for text or buttons.

Primary CTA is solid `forest-700` in light mode, solid `leaf-300` in dark.

Pattern:
```tsx
className="bg-cream-50 dark:bg-forest-950 text-forest-800 dark:text-cream-100"
```

### Typography

- **Display (Prata)**: all headlines and "feature" text. Prata ships **one
  weight (400) and no italic** — never put `font-bold`, `font-semibold` or
  `italic` on `font-display` text or the browser fakes it, which looks cheap on
  a high-contrast face. Emphasis words are distinguished by `.text-leaf`
  (gold gradient, theme-aware) **alone**.
- Prata sets much larger than a Garamond at the same px — headline `clamp()`
  values are tuned for it. Re-check sizes if the face ever changes.
- **Sans (Inter)**: body, eyebrow labels, UI.
- **Mono (JetBrains)**: rare — footer status line only.

### Motifs

- `components/MoonLantern.tsx` — the motif, replacing the earlier plain
  lantern on 2026-08-27 from artwork Andy supplied:
  - `<MoonLantern>` — a brass **hoop** with jade inlay and filigree, a lit
    globe hanging inside it, oak-leaf pendant below.
    ⚠️ **Do not put the crescent back.** The first version was a deep upright
    crescent with a five-pointed star finial and a crescent pendant; Andy
    flagged on 2026-08-27 that it read as the Pakistani flag rather than a
    lantern, which is not a reading a UK IT consultancy wants. It is now a
    closed, gently tapered ring (outer r40 at 50,78; inner r34 nudged to
    52,78, `fillRule="evenodd"`), tilted 24° off vertical, with a brass knop
    where the star was and a leaf where the pendant crescent was. The lantern,
    not the ring, should read first.
    **Geometry traps**: anything laid inside the hoop must be clipped to it;
    and an arc drawn along the hoop needs endpoints genuinely on its radius,
    or the SVG arc solver invents its own centre and the band lands elsewhere.
    A `clipPath` resolves in the *referencing element's* user space, which
    already carries the group translate — do not translate the clip path too,
    or long-corded lanterns lose their inlay entirely (this shipped broken
    once and was invisible at preview cord lengths).
  - `<HangingLantern>` — a lantern plus the light it throws. Rendered cord
    length is `size * cord / 100`, so hero cords are in the hundreds to clear
    the 80px nav.
  - `<MoonGlyph>` — ~1em hanging lantern, the list bullet. Deliberately not
    a crescent-and-star, for the same reason.
- `public/moon-lantern.svg` — the same lantern as a standalone asset, for
  dropping into logo artwork. Regenerate it whenever `MoonLantern` changes, or
  it drifts out of step with the site.
- `components/SectionLabel.tsx` — the shared eyebrow: glyph + rule + label.
- `.canopy` (globals.css) — the soft green/gold light pooled behind the hero.
- **Dark mode is lit by the lanterns.** `.lantern-light` (a radial wash) and
  `.lantern-pool` (the light falling below) are `mix-blend-mode: screen`, so
  they *add* light to what's beneath rather than painting over it. Both are
  `opacity: 0` in light mode — it's daylight, the lanterns are decoration. The
  `lantern-flicker` keyframes are deliberately uneven; an even sine reads as a
  pulsing LED rather than a flame. Each instance takes a different
  `animation-delay` so they don't beat in unison.
- ⚠️ **There was a `.lantern-shaft`** — a cone of light falling from each
  lantern — and Andy had it removed on 2026-08-27: it read as a downward beam
  that didn't belong. Don't reintroduce one.
- ⚠️ **There was a `.lantern-pool` and it is gone deliberately.** It used
  `radial-gradient(ellipse at top, …)`, which puts the gradient's brightest
  point on the element's own top edge — the browser clips there, so every glow
  carried a hard horizontal seam across it, visible as a rectangle once you
  brightened the page. Any glow layer must reach fully transparent *inside* its
  own box: centred `closest-side` radials are safe, edge-anchored ones are not.
- `components/Fireflies.tsx` — points of life around the canopy, themed to the
  time of day. Same positions and drift in both, **opposite physics**:
  - **Dark — fireflies.** Additive (`lighter`) warm glow, blink shaped by
    `pow(sin, 6)` so they are dark far more often than lit. That asymmetry is
    what sells them; a steady twinkle reads as fairy lights.
  - **Light — motes in sun.** ⚠️ A glow is *invisible* on cream: additive
    blending against a near-white page only makes white. So daylight paints
    them the other way up — `source-over`, dark leaf-green and gold specks over
    the page, never blinking out, only breathing in brightness. They also have
    to be **darker and larger than instinct suggests**; mid-green at low alpha
    disappears entirely on `cream-50`.
  - The theme toggle swaps a class on `<html>`, so the loop watches it with a
    `MutationObserver` rather than reading the DOM every frame, and switches
    physics live without a reload.
- `components/TreeCanopy.tsx` — the ghosted background tree **with real
  lanterns hung on it**, used in the hero and footer.
  - `public/tree.png` is `public/mark.png` with its baked-in lanterns masked
    out (warm hue 15–68° + the bright glow halos), then cropped. It is now only
    the **source**, not shipped in the page.
  - `public/tree-lines.png` is what the page draws: Sobel edge-work off
    `tree.png` (blur 1.1 first, gamma 0.75, plus 32% of the original tone so
    the canopy isn't wireframe), white on transparent.
  - ⚠️ **It is used as a CSS `mask-image`, not an `<img>`.** That is the point:
    whatever sits behind the mask becomes the ink, so the paint layer is a
    stack of radial gradients at the lantern anchors. In dark mode the branches
    near a lantern genuinely take its warmth and fall to cold green in the
    gaps — the tree is lit *by* its lanterns rather than being a silhouette
    with glows floating over it. Change the anchors and the lighting moves with
    them for free.
  - The anchor coordinates in `TreeCanopy` are the *centroids of the masked
    lanterns*, and each `cord` is the distance from that blob's **top** — where
    the original cord met its branch — down to the globe. So the new lanterns
    hang from the same points on the same branches, with a visible cord. If the
    mark artwork is ever re-exported, `tree.png`, the anchors and the cords must
    all be regenerated together or the lanterns will float off the branches.
  - The smaller glow orbs the artwork carried are recreated as pure light —
    `.lantern-light-soft`, no fixture.
  - ⚠️ **Every light in here is positioned in canopy-box coordinates, not
    inside the lantern's own wrapper.** A percentage `height`/`top` resolves
    against the containing block's *height*, and a lantern wrapper is ~3.4x
    taller than it is wide once it has a long cord — nesting the glow inside it
    stretched it into a smear and pushed it far below its lantern. The canopy
    box is `aspect-square`, so there % width and % height are equal in px.
    (`HangingLantern` in the hero/footer is safe because it works in px.)
  - ⚠️ `TreeCanopy` must not merge `relative` into the caller's className:
    Tailwind emits `relative` *after* `absolute`, so it wins and the canopy
    silently leaves its corner. It uses an inner positioning div instead.
- The logo mark (`mark.png`) keeps its original lanterns — that's Andy's
  artwork, and it is what the favicon and OG card use.

### Voice rules (same as SweetTech)

- Plain English. No "leverage", "synergize", "robust", "scalable solutions".
- Short declarative sentences. Full stops. Confident.
- Active verbs. "We build" not "we provide building".
- Pick fights with the alternatives (agencies, MSPs, freelancers).
- Lantern-gold word = the **transformation** or **value**, not the action.
- Headline pattern: `[plain statement]. [gold-gradient promise].`

### Logo

Real artwork, delivered 2026-08-25: a deep-green tree hung with gold lanterns.

- `public/mark.png` (900px, transparent) — the mark. One file for both themes.
- `app/icon.png` + `app/apple-icon.png` — favicons, via Next's file conventions
  (there is deliberately **no** `icons` block in `layout.tsx` metadata).
- The wordmark is **not** an image — it's live text in Prata, the face the
  lockup itself uses, so it recolours per theme. See `components/Logo.tsx`.
  Identified by silhouette-matching candidates against the source crop; Prata
  overlays the artwork almost exactly.

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

### ⚠️ Proof / case studies — read before touching `app/work/page.tsx`

The design review called the credibility gap the site's biggest commercial
problem, and it is the one thing that cannot be written from the codebase.

- **Case-study entries are factual claims about real client work.** Never
  invent, embellish, or round a figure to fill the grid. One real case study
  beats three plausible ones.
- The 90%+ field-reporting / proof-of-posting entry came from Andy's designer.
  **It still needs Andy's explicit sign-off** — flagged to him on 2026-08-25.
- **PhantomAxis Studios** (added 2026-08-27) — a site built for a games/film
  composer, embedded live from
  https://phantomaxis-production.up.railway.app. Source lives at
  `~/Documents/DEV/phantomaxis`, deployed on Andy's *personal* Railway.
  ⚠️ It is tagged **"Recent build"**, deliberately: it was built for a friend
  and the commercial arrangement is unknown, so it does not claim
  "Client project". Ask Andy before upgrading that label.
- CV Live is *our own product*, not client work, and is labelled as such. It is
  embedded live via `SiteEmbed` — cvlive.io sends no `X-Frame-Options` or CSP
  `frame-ancestors`, so it frames cleanly. If that ever changes the frame will
  go blank; fall back to a screenshot.
- `SiteEmbed` renders the target at desktop width and scales it down, but
  switches to the site's *own* mobile layout below a **520px** container. That
  threshold was 700 and was wrong: the work page's embed column is ~660px, so
  both embeds were rendering their mobile layouts inside a wide frame. Keep the
  breakpoint near real phone widths.
- "Selected experience" is a list of *domains*, not client claims — safe to
  extend as the work broadens.
- Still missing, and worth chasing: an About section with a photo and a real
  human biography. For a founder-led consultancy this does more for trust than
  any amount of copy. Needs Andy's words and picture — do not fabricate either.

### ✅ Inquiry form
- **Four fields only**: name, email, company (optional), "What can we help
  with?". Business size and timeline pill-groups were removed 2026-08-25 —
  every extra field on a first contact is another chance to bounce. Qualify on
  the call instead. Don't add fields back without a reason.
- Server Action at `app/actions/inquiry.ts`
- Sends via Resend → `hello@oakenit.com` (default; override in `INQUIRY_TO_EMAIL`)
- Default sender: `OakenIT Inquiries <onboarding@resend.dev>` — works without domain verification
- Honeypot (`website` field) + 1.5s time-trap
- **Every valid inquiry is filed into Heartwood first**, via `lib/heartwood.ts` →
  `POST /ingest/inquiry`. It lands as a card on the **sales** board plus a `lead.received`
  event. Email is a *notification*; Heartwood is the *record*.
- `fileInquiry()` never throws and times out at 4s. A visitor's submission must never fail
  because an internal system is slow or down — if you touch this, keep that property.
- If Resend fails **but** the Heartwood write succeeded, the visitor sees success (their inquiry
  genuinely is recorded) and the email failure is logged loudly. Only a double failure surfaces
  an error to the visitor.
- Falls back to `console.log` if `RESEND_API_KEY` unset
- Surfaces Resend's actual error to the UI on failure

### ⚠️ Our stack (`Stack.tsx`)

- Icon paths are inlined from [Simple Icons](https://simpleicons.org) — CC0 as
  data, but the marks stay their owners' trademarks. They render **monochrome
  in `currentColor`**: no brand colour, no lockup, no partner badge. That keeps
  it a statement of what we use rather than a claim of endorsement. If a
  partner badge is ever wanted (Microsoft Partner and so on), that is a
  programme with its own rules — don't fake one.
- **Keep the list honest.** A stack strip reads as a capability claim; a
  prospect may ask about anything on it. Andy was asked on 2026-09-01 to trim
  anything OakenIT doesn't genuinely work with.
- It is a **banner**, not a section: label plus grid, no heading and no
  supporting paragraph. Andy stripped those on 2026-09-01 — don't add copy
  back to it.

### ✅ SEO foundation
- `/robots.txt`, `/sitemap.xml` (dynamic)
- JSON-LD `<script>`: Organization + WebSite + ProfessionalService + OfferCatalog
- `<head>` metadata, keywords, `en_GB` locale, canonical URL
- Dynamic OG image at `/opengraph-image` — oak palette, brand-matched
- Analytics wired, env-gated

### ✅ Polish
- Grain overlay (theme-aware opacity)
- Smooth scroll, custom scrollbar
- `text-oak-gradient` for italic emphasis (differs light/dark)

### ✂️ Stays removed
- **"Three disciplines. One team."** as a framing — see § 1. Services came back
  as Build/Fix/Improve; the discipline names did not.
- **The pull quote in WhyUs**, and later the `Ethos.tsx` band that carried the
  same sentence.
- **Duplicated promises.** Response times used to be stated three times over
  (hero stats, contact bullets, process bodies). They appear once, in the hero.
- **Form fields**: business size, timeline.
- **The "How we work" section** (`Process.tsx` — Understand / Scope / Deliver /
  Support) — replaced by the stack banner on 2026-09-01. Its nav and footer
  links now point at `#stack`.

### 🔜 Still open after the design review
1. **About section** — photo + real biography. The review rated this highly for
   a founder-led consultancy. Blocked on Andy.
2. **More case studies** — two or three would be materially better than one.
   Blocked on Andy (and on his sign-off for the one that is live).
3. **oakenit.com DNS.** The review's closing point: a `*.up.railway.app`
   hostname reads as "unfinished demo", which is corrosive when what you're
   selling is IT professionalism. Do not send prospects to the Railway URL.

### ❌ Not yet built (Phase 2)
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
| `HEARTWOOD_INGEST_TOKEN` | **Yes, for lead capture** | — (logs a failure) | Heartwood token, `ingest` scope only |
| `HEARTWOOD_URL` | No | `https://heartwood-app-production.up.railway.app` | Heartwood base URL |
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
| **Heartwood** | Andy | — | ✅ Railway project `heartwood`. Receives every inquiry as a sales-board card |
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

1. **OG image fonts are bundled TTFs in `app/fonts/`**, read with `node:fs` (so the route must stay on the Node runtime), along with `public/mark.png` as a base64 data URI. Two gotchas if you ever add faces: satori resolves one family name carrying two styles unpredictably — register each style under its own family name; and Google's `css2` response lists the **italic** face first, so verify a downloaded TTF's name table before trusting the filename you gave it.
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

**Don't narrate verification.** Andy asked on 2026-08-27 to stop the
post-deploy ritual of curling the live site and reporting which strings are
present or absent. Check what you need to check, silently; if it's fine, just
say it's shipped. Only surface a check when it actually found something wrong.
