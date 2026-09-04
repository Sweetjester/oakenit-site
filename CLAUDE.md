# CLAUDE.md — OakenIT project memory

> This file is read automatically by Claude Code when working in this repo. It contains everything a fresh agent needs to resume development without re-discovering context.
>
> **Last updated**: 2026-09-02 (Cloudflare live; email in/out working; legal disclosures + privacy notice)

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
- Sub: "Building from the ground up, or replacing something that's outdated."
- Capability line: `Software · Infrastructure · Automation · Technical consulting`
- Primary CTA: "Discuss a project" → `#contact`
- Secondary CTA: "Check out our work" → `/work`

---

## 2. Tech stack

Inherited from the retired SweetTech build:

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **React**: 19
- **Styling**: Tailwind v3 with `darkMode: 'class'`
- **Motion**: Framer Motion 11
- **Icons**: Lucide React
- **Fonts** (`next/font/google`): Manrope (headings), Inter (body/UI), Prata (wordmark only), JetBrains Mono (rare)
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
│   │                           # Stack → CTA → Footer
│   │                           # (no custom cursor — removed 2026-08-25,
│   │                           #  it sat on top of the copy)
│   ├── globals.css             # Base styles, theme custom-props, grain,
│   │                           # scrollbar, marquee, .canopy, .text-leaf
│   ├── fonts/                  # Manrope/Prata/Inter TTFs for the OG card (satori
│   │                           # can't use CSS fonts)
│   ├── work/page.tsx           # /work — the case studies + live cvlive.io embed
│   ├── services/<slug>/page.tsx # 3 service pages, content in lib/services.ts
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
│   ├── WorkTeaser.tsx          # Homepage cards — live site thumbnails
│   ├── SiteEmbed.tsx           # Scaled, scrollable live-site iframe
│   ├── CTA.tsx                 # Contact section (pitch left, form right)
│   ├── InquiryForm.tsx         # 4 fields only — see § 6
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
| `forest-950` | `#031507` | Dark-mode bg |
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

Overhauled 2026-09-01 on a type recommendation Andy commissioned.

- **Display / headings (Manrope)** — `font-display`. Use `font-extrabold` (800)
  for h1-scale, `font-bold` (700) for section and card headings. It needs
  **noticeably tighter tracking than a serif**: `-0.035em` at hero scale,
  `-0.03em` for h2, `-0.02em` for card headings. Untracked Manrope at display
  size looks loose and generic.
- **Body / UI (Inter)** — `font-sans`. Everything that isn't a heading.
- **Wordmark (Prata)** — `font-wordmark`, and **only** the wordmark: the nav
  lockup and the footer lockup. Prata is the face in Andy's actual logo
  artwork, so the site's lockup matches his logo everywhere else it appears.
  Do not use it for headings, and do not switch the wordmark to Manrope
  without asking — that would desync the site from the logo.
- Sizes came *down* when Manrope came in: a bold sans reads heavier and wider
  than Prata did at the same px. If the display face ever changes again,
  re-tune the `clamp()` values rather than assuming they carry over.
- Emphasis words are `.text-leaf` (green gradient, theme-aware) alone.

### Motifs

- `components/MoonLantern.tsx` — the motif, replacing the earlier plain
  lantern on 2026-08-27 from artwork Andy supplied:
  - `<MoonLantern>` — a hexagonal **carriage lantern** on a corded ring: ball
    finial, peaked roof with a brim, faceted glass with a flame inside, base
    rim and drop finial. **Redrawn 2026-09-03.**
    ⚠️ **Do not go back to the hoop**, and definitely not the crescent before
    it. The hoop was a tilted brass ring with a jade inlay, a filigree leaf
    sprig and a globe hung inside the opening. It was fine on its own, but once
    the background tree became Andy's illustration — which carries its own
    drawn carriage lanterns — the hoop was the only thing left on the site in a
    different shape. Andy spotted it in the footer on 2026-09-03: "still some
    lanterns here!". The crescent that preceded the hoop read as the Pakistani
    flag, which is not a reading a UK IT consultancy wants.
    ⚠️ **The glass centre must stay at local (50, 96).** `HangingLantern`
    places the cast light at `(size * 0.5, size * (cord + 58) / 100)`, which is
    that point once the group is shifted by `cord - 38`. Move the glass and the
    glow drifts off the fixture.
    ⚠️ `glassX` was `size * 0.68`, correct for the hoop because its globe hung
    *off-centre* inside the ring. Left unchanged on the centred carriage
    lantern it threw every glow visibly to the right of the lantern.
  - `<HangingLantern>` — a lantern plus the light it throws. Rendered cord
    length is `size * cord / 100`, so hero cords are in the hundreds to clear
    the 80px nav.
  - `<MoonGlyph>` — ~1em hanging lantern, the list bullet. Deliberately not
    a crescent-and-star, for the same reason.
    **Redrawn 2026-09-03** to match the carriage lanterns in the new tree
    artwork: ball finial, peaked roof with a brim, tapered hexagonal glass with
    corner posts, flame, base rim and drop finial. It was a plain ovoid before
    and read as a little vase next to the drawn lanterns.
    ⚠️ Its **viewBox is square (34x34)** with a tall narrow lantern centred in
    it. Every call site sizes it with equal width/height classes (`h-3.5 w-3.5`),
    so a tall viewBox letterboxes and shrinks it. Keep the viewBox square, or
    change all six call sites (`SectionLabel`, `Services`, `ServicePage`,
    `TrustStrip`, `CTA`, `app/work/page.tsx`).
    It is monochrome `currentColor` at varying opacity, not fixed colours, so
    one glyph works on cream and on near-black. Detail is tuned so the
    *silhouette* carries it at 12-14px; the interior is a bonus at larger sizes.
- `public/moon-lantern.svg` — the same lantern as a standalone asset, for
  dropping into logo artwork. Regenerate it whenever `MoonLantern` changes, or
  it drifts out of step with the site.
- `components/SectionLabel.tsx` — the shared eyebrow: glyph + rule + label.
  Takes `as="h2"` where the label is a section's only heading (Services, Stack),
  so the section still appears in the document outline.
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
- `components/FireflySwarm.tsx` — swarms of fireflies orbiting as a ball,
  across the top of the hero. **They replaced the strung `<HangingLantern>`
  row on 2026-09-03**: once the drawn tree carried its own lanterns, vector
  ones hanging above it read as two illustrations sharing a page.
  - Each swarm is a centre wandering a slow Lissajous path with its flies on a
    *sphere* around it — two angles, and the depth term drives size and
    brightness. That is what gives it volume: the ones at the back are small
    and dim and they trade places as the ball turns. A flat ring looks like a
    ring.
  - ⚠️ The blink is **gentler than `Fireflies`** on purpose (`0.3 + 0.7·sin²`
    rather than `sin⁴`). A lone firefly should be dark more often than lit, but
    if most of a swarm is dark at any instant the ball never resolves as a
    shape. Don't "fix" this to match.
- `components/Fireflies.tsx` — single points of life around the canopy, themed
  to the time of day. Same positions and drift in both, **opposite physics**:
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

### Voice rules

- Plain English. No "leverage", "synergize", "robust", "scalable solutions".
- Short declarative sentences. Full stops. Confident.
- Active verbs. "We build" not "we provide building".
- Pick fights with the alternatives (agencies, MSPs, freelancers).
- Lantern-gold word = the **transformation** or **value**, not the action.
- Headline pattern: `[plain statement]. [gold-gradient promise].`

### Logo — new artwork 2026-09-03

Andy supplied a new tree: loose ink-and-watercolour line work with six drawn
lanterns, on cream paper, inside a sketched circular halo.

The pipeline that produces the assets, all from one source image:

- **Paper keyed to alpha, not thresholded.** Alpha is derived from each pixel's
  distance from the paper colour (sampled from a corner), which preserves the
  antialiasing on hairline ink. A hard threshold shreds it.
- **`public/mark.png` is cropped to the *dense* ink**, not the bounding box.
  The faint circular halo extends well past the canopy, and trimming to the
  bbox left the tree floating in whitespace — illegible at nav size. The crop
  keeps the box containing 98.5% of the ink mass by column/row. Nav logo went
  30px → 38px because this art carries more detail than the old solid mark.
- **`public/tree.png` is the full composition in full colour**, and the
  background renders it as an `<Image>` — not through a mask.
  ⚠️ The mask-and-paint approach (`tree-lines.png` + gradient stack) was built
  for the *previous* mark, which was solid green fill and had to be
  edge-detected before it could be lit. Applying it to this artwork replaced
  the drawing's own green washes, ochre trunk and six gold lanterns with a flat
  colour, leaving a faint pencil ghost — Andy's first reaction on 2026-09-03
  was "where is new tree??", which was fair. **Don't reintroduce the mask for
  artwork that already carries its own colour.** `tree-lines.png` is retained
  only as a source artefact.
- ⚠️ **The drawn lanterns are kept and are not replaced by `<MoonLantern>`.**
  `TreeCanopy` now places only *light* at the six anchors. Hanging detailed
  vector lanterns on a hand-drawn tree reads as two illustrations sharing a
  page. The `MoonLantern` SVG still serves the hero and footer, where it hangs
  in space rather than on the drawing.
- Anchors are the centroids of the warm-hued blobs, filtered by aspect ratio
  (0.4–1.8) and height (above 65%) — without that filter the ochre on the
  trunk and the ground wash register as lanterns.
- The mark needs **no dark-mode filter**: the mid-green leaves read on both
  grounds as they are.
- ⚠️ **The nav lockup uses a boldened variant** of the drawing, not the raw
  file: strokes dilated and faint ink lifted (`MaxFilter(3)`, alpha gamma ~0.7)
  before scaling, or the watercolour hairlines vanish at 38px.
- ⚠️ **`Logo` must request the mark at 4x its display size** with high
  `quality`. With `sizes={`${size}px`}` Next served a **32px-wide, q=75**
  re-encode, which destroyed the stroke work and made the logo look like the
  old mark — Andy reported the new tree "still isn't here in the top left"
  when the file on disk was already correct. A detailed illustration shown at
  38px needs real pixels behind it. Don't optimise this back down.
- **The favicon is the real artwork on a cream disc.** A simplified four-shape
  SVG mark was built and rejected — Andy: "too basic". Two things were tried
  and failed first: a solid silhouette (merges the leaf gaps into a blob) and
  a tighter crop (clips the canopy, so it reads as a rectangle of foliage
  rather than a tree). What *does* work is the full tree, boldened, sitting on
  a cream disc: without a ground the dark ink all but vanishes on a **dark**
  browser tab. `app/apple-icon.png` uses a full-bleed cream square instead,
  since iOS applies its own rounded mask.
- ⚠️ Quantise the icons hard (96 colours). Straight out of the pipeline
  `icon.png` was **366KB** for something viewed at 16px; it is 71KB now.

### Logo (previous artwork)

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
- ⛔ **The Build Hollywood work is off the site permanently** (removed
  2026-09-02). The proof-of-posting platform and the field-capture/reporting
  build were both for the OOH operator Andy works for **full time**. Citing an
  employer's systems as consultancy case studies is an employment and
  conflict-of-interest problem, not a copy decision. Do not reinstate them, and
  do not write new copy that alludes to them — no "high-volume outdoor
  advertising", no posting-run examples. Andy's decision, and the right one.
- That also retires the unverified 90%+ figure, which had never been signed off.
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

### ⛔ Google Analytics 4 — deliberately not installed

Andy created a GA4 property (`G-B436R9BPWJ`) on 2026-09-02 and then decided
**not** to install it. Don't paste the gtag snippet in.

Reason: GA4 sets cookies, so under UK GDPR/PECR it needs consent *before* it
loads — meaning a cookie banner. The site has none, because Cloudflare Web
Analytics is cookieless and needs none. Adding GA4 without a banner would put a
firm that sells "Security and compliance" in breach on its own site.

Revisit only if Google Ads happens and conversion tracking is genuinely needed.
Then it's Consent Mode v2 defaulting to `denied` plus a real banner — not a
pasted script.

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
- **The "Why OakenIT" section** (`WhyUs.tsx` — senior by default, practical
  engineering, modern tools, plain English) — removed 2026-09-01, along with
  its nav link and sitemap anchor. Note this carried the *only* on-page
  statement of the differentiator in § 1, and the design review rated
  reasons-to-believe highly; don't reinstate it without asking, but be aware
  the argument now lives nowhere on the page.
- **Section headings and their supporting paragraphs.** Services and Stack are
  now label-only ("What we do", "Our stack"); Andy stripped the h2 line and the
  intro paragraph from both on 2026-09-01. Don't write copy back into them.

### 🔜 Still open after the design review
1. **About section** — photo + real biography. The review rated this highly for
   a founder-led consultancy. Blocked on Andy.
2. **More case studies** — two or three would be materially better than one.
   Blocked on Andy (and on his sign-off for the one that is live).
3. **oakenit.com DNS.** The review's closing point: a `*.up.railway.app`
   hostname reads as "unfinished demo", which is corrosive when what you're
   selling is IT professionalism. Do not send prospects to the Railway URL.

### ✅ Service pages (added 2026-09-02)

`/services/it-setup`, `/services/software-development`, `/services/it-support`.
Content lives in `lib/services.ts`; `components/ServicePage.tsx` renders it.
The sitemap derives from the same array, so adding a service adds its URL.

- **Slugs are search terms, not brand names.** People type "IT support", never
  "Kickstart". Card labels keep the brand wording; URLs and `<title>`s carry
  the keywords.
- The `signs` array ("You probably need this if…") is written as symptoms in
  the visitor's own words. That is the part that earns search traffic — people
  describe their problem, not the service that fixes it. Keep it that way.
- Each page emits `Service` JSON-LD linked to the homepage `#organization`
  node, so the three read as one firm's services.

### ⚠️ Turnstile on the contact form (added 2026-09-02) — unconfirmed

`components/Turnstile.tsx` renders **explicitly** into an empty ref, not via the
implicit `class="cf-turnstile"`. Letting Cloudflare inject into a div React owns
is the same fight as the email-obfuscation bug that hid this form.

**It has never been observed issuing a token.** Every browser available here is
automated, and Turnstile withholding a token from automation is arguably it
working correctly — but that is a guess, not a verification. So
`passedTurnstile()` **fails open in both directions**:

- no token at all → allow, log a warning
- Cloudflare unreachable or erroring → allow, log
- token present but explicitly rejected → **block**

A spam control that silently eats real leads is worse than the spam. The
honeypot and 1.5s time-trap are unchanged underneath and catch naive bots on
their own. **Andy was asked on 2026-09-02 to submit the form from his own
browser**; if the logs then show tokens arriving, missing-token can be
tightened to a rejection. Until someone confirms that, leave it permissive.

### ⚖️ Legal / compliance (added 2026-09-02)

- `lib/company.ts` holds the statutory details, taken from the public register:
  **Oaken IT Ltd**, company number **17329880**, registered in England and
  Wales, incorporated 9 July 2026. Change them there and the footer and privacy
  notice both follow.
- The footer carries the trading disclosures a UK limited company must show on
  its website (registered name, number, place of registration, registered
  office) under the Companies (Trading Disclosures) Regulations 2015. If Andy
  registers for VAT, put the number in `COMPANY.vatNumber` — showing it becomes
  mandatory too.
- ⚠️ **The registered office is Andy's residential address.** It is already
  public on Companies House and the law requires it on the site, but he was
  flagged on 2026-09-02 that a registered-office service would replace it.
- `/privacy` is written to match what the code *actually* does — the named
  processors are Railway, Cloudflare, Resend (eu-west-1) and Google, because
  that is genuinely the path an enquiry takes. If the data flow changes, the
  notice is wrong until someone updates it. **It has not been reviewed by a
  solicitor.**
- Cloudflare Web Analytics is deliberately the analytics choice: cookieless, so
  no consent banner is needed and the privacy notice can say there is nothing
  to consent to. Turning on Clarity would break that — it records sessions and
  sets cookies.

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
| `RESEND_API_KEY` | For email | — (logs only) | Resend API key. **Set on Railway as of 2026-09-02** |
| `RESEND_FROM_EMAIL` | No | `OakenIT Inquiries <onboarding@resend.dev>` | Sender. Override once oakenit.com is verified in Resend |
| `INQUIRY_TO_EMAIL` | No | `hello@oakenit.com` | Recipient. On Resend free tier this must match the Resend account email; use the account owner's address until domain verification |
| `HEARTWOOD_INGEST_TOKEN` | **Yes, for lead capture** | — (logs a failure) | Heartwood token, `ingest` scope only |
| `HEARTWOOD_URL` | No | `https://heartwood-app-production.up.railway.app` | Heartwood base URL |
| `NEXT_PUBLIC_SITE_URL` | No | `https://oakenit.com` | Used by sitemap/OG/schema. **Apex is canonical** (decided 2026-09-02); Cloudflare 301s www to it. |
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
| **Cloudflare** | Andy | andrewhyslop903@gmail.com | ✅ Zone `oakenit.com` (id 3287e429befbedf05a44c18350fbfe8d), proxied. Also hosts `sweetsickle.com`. Apex is a **CNAME** to Railway (flattened) — never pin an A record, Railway rotates edge IPs |
| **Resend** | Andy | — | ✅ Domain verified, region **eu-west-1**. Sends as `hello@oakenit.com` |
| **Domain registrar for oakenit.com** | Andy | — | Squarespace Domains (nameservers now Cloudflare) |
| **Google Workspace** | Andy | `hello@oakenit.com` / `andy@oakenit.com` | ⏳ Not yet set up for oakenit.com |
| **Resend** | — | — | ⏳ Consider a separate Resend account for OakenIT, or reuse SweetTech's account (in which case `INQUIRY_TO_EMAIL` must be that account's registered email until domain is verified) |
| **Plausible** | — | — | ⏳ Add oakenit.com as a second site (Plausible bills per site) |
| **Microsoft Clarity** | — | — | ⏳ Create OakenIT project |
| **Google Search Console** | — | — | ⏳ Verify oakenit.com |

### ⚠️ Cloudflare gotcha that broke the contact form

**Email Address Obfuscation must stay OFF** (zone setting `email_obfuscation`).
It is on by default. It rewrites any `mailto:` in the HTML into a
`<a class="__cf_email__" data-cfemail=...>` at the edge — *after* Next.js has
rendered. `InquiryForm` contains a `mailto:hello@oakenit.com`, so the server
HTML no longer matched what React expected, hydration failed, and React
discarded the whole subtree: **the form vanished from the DOM entirely** while
still being present in view-source.

It broke silently the moment the domain started proxying through Cloudflare,
and a local resolver still holding pre-migration records will *bypass* the
proxy and show you a working form — so test against the real edge, not
whatever your laptop resolves to. Rocket Loader and Mirage break React the same
way; both confirmed off.

### DNS for oakenit.com — ✅ live on Cloudflare

- Apex `oakenit.com` → **CNAME** `wwzxy1pt.up.railway.app`, proxied, flattened.
  Never pin an A record: Railway rotates edge IPs and the apex dies silently.
- `www` → CNAME to Railway, proxied, and a **redirect rule 301s it to the
  apex**. Apex is canonical.
- SSL/TLS mode is **Full**, not Full (Strict) — Strict breaks Railway's
  certificate renewal. Min TLS 1.2. Always Use HTTPS on.
- Security headers via a response-header transform rule: nosniff,
  Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP.
- **Email in**: Cloudflare Email Routing. `hello@` and `andy@` plus a catch-all
  forward to Andy's Gmail. Cloudflare owns the apex MX records — the API will
  refuse to let you add MX there by hand.
- **Email out**: Resend, domain verified, region eu-west-1. DKIM on
  `resend._domainkey`; SPF and a bounce MX on the `send.` subdomain.
- SPF at the apex is `v=spf1 include:_spf.mx.cloudflare.net ~all`. It was
  `-all`, which would have made every *forwarded* enquiry fail SPF at Gmail.
- DMARC is `p=reject` with **relaxed** alignment (`adkim=r; aspf=r`). It was
  strict, which would have rejected our own Resend mail, since Resend bounces
  via the `send.oakenit.com` subdomain.

---

## 9. Marketing & SEO strategy

- **ICP**: UK SMBs, 10–200 employees
- **Geo**: UK-wide (national)
- **Primary channel**: Organic SEO + content
- **Secondary channel** (later): LinkedIn founder-led

**✅ Resolved 2026-09-02 — SweetTech is deprecated. OakenIT is the future.**

There is no longer a two-brand question. Do not hedge copy, keywords or
positioning to avoid competing with SweetTech, and do not split effort across
both. Everything points at OakenIT.

Practical consequences:
- No keyword cannibalisation to design around. Go after the strongest terms
  directly rather than the ones SweetTech wasn't using.
- The `~/Documents/Vibe/sweettech` repo is now a *historical reference* for
  shared architecture only. Don't port changes back to it.
- If sweettech.co.uk still resolves, it should eventually 301 to oakenit.com so
  any accumulated authority transfers rather than competing. Worth raising with
  Andy — not yet actioned.

**Channel reality check (2026-09-02).** The domain was registered 2 July 2026.
For a two-month-old domain with no backlinks, national terms like "IT support
UK" are unwinnable this year. Organic is the right long game and the wrong
answer to "how do I get enquiries now". The near-term channels are:
1. **Google Business Profile** — local pack sits above organic, and local terms
   (Wembley / Brent / North West London) are winnable in weeks.
2. **Founder-led outbound** — the first clients come from Andy's network.
3. Content targeting *symptoms*, not service names, for the long game.

---

## 10. Next moves

1. ~~Real logo artwork~~ ✅ done 2026-08-25.
2. ~~Create GitHub repo~~ ✅ done.
3. ~~Add `RESEND_API_KEY`~~ ✅ done 2026-09-02. Form verified delivering end to end.
4. ~~Point `oakenit.com` DNS at Railway~~ ✅ done. Apex is canonical; Cloudflare 301s www to it.
5. **A real mailbox.** `hello@`/`andy@` currently *forward* to Andy's Gmail via
   Cloudflare Email Routing — receive-only, so replies come from his personal
   address. Andy leaned M365 Business Basic but chose free forwarding for now.
6. **Answer the OakenIT vs SweetTech strategic question** (see § 9) before starting Phase 2 content work.

---

## 11. Known quirks & gotchas

All still apply:

1. **OG image fonts are bundled TTFs in `app/fonts/`**, read with `node:fs` (so the route must stay on the Node runtime), along with `public/mark.png` as a base64 data URI. Two gotchas if you ever add faces: satori resolves one family name carrying two styles unpredictably — register each style under its own family name; and Google's `css2` response lists the **italic** face first, so verify a downloaded TTF's name table before trusting the filename you gave it.
2. **`overflow-y-hidden` on AnimatedLine (Hero)** — not `overflow-hidden` — so italic glyph flourishes extend horizontally freely while the vertical slide-up animation still clips.
3. **`whitespace-nowrap` on key headline phrases** to prevent mid-phrase wraps. If you change copy, re-evaluate.
4. **If oakenit.com is at a registrar that blocks apex CNAME**, use domain forwarding or HTTPS records for the apex; only `www` gets the CNAME. Same pattern as SweetTech's Squarespace workaround.
5. **Resend free tier**: sender `onboarding@resend.dev` can only send TO the email the Resend account was registered with (until domain verification). Set `INQUIRY_TO_EMAIL` to that address.
6. **Tailwind dark variants are explicit**, not auto. Every styled element needs `X dark:Y`.
7. **Manrope needs tight tracking at display sizes** — see § 5. The old rule about never bolding the display face applied to Prata (single weight) and no longer holds; Prata now survives only as `font-wordmark`.
11. **Never gate above-the-fold content on Framer Motion.** The hero used
    `initial={{opacity:0}}` + `animate`, so nothing was visible until React
    hydrated and the animation ran. On throttled mobile that put LCP at **4.6s
    on a plain text element** — and showed a blank hero to anyone on a slow
    connection. It is CSS keyframes now (`.rise`, `.rise-line` in globals.css),
    which paint without JS: **LCP 4.6s → 1.5s**. `whileInView` below the fold is
    fine; the hero is not.
12. **`public/tree-lines.png` is a CSS mask, so only its ALPHA channel matters.**
    Converting it to greyscale to save bytes silently destroys it — with no
    alpha the mask is opaque everywhere and the tree becomes a filled box. Store
    it as **LA** (grey + alpha), never L or RGB.
10. **Never use `-z-10` for full-bleed backdrops.** `html` has a background *and* `body` has an opaque background, so a negative-z child paints underneath the body background and vanishes. Use `z-0` on the backdrop + `relative z-10` on the content.
8. **Background command exit code 143** is SIGTERM from `kill`, not a real failure.
9. **`railway.json` buildCommand** = `npm run build`. Do not reintroduce `npm ci &&` — EBUSY race on Railway's cache.

---

## 12. Working with Andy



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
