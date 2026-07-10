# OakenIT

AI-driven IT consultancy — marketing site for oakenit.com.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

`PORT` env var is respected (defaults to 3000).

## Deploying to Railway

This repo is configured for Railway out of the box via `railway.json` (Nixpacks builder, `npm start` deploy command).

### One-time setup

1. Create a new Railway project at https://railway.com and connect this Git repository.
2. Railway auto-detects Next.js. It will install, build, and start the app.
3. No env vars are required for the marketing site.

### Custom domain — oakenit.com

1. In the Railway service → **Settings → Networking → Custom Domain**, add `oakenit.com` and `www.oakenit.com`.
2. Railway will display target DNS records. At your domain registrar (where `oakenit.com` is managed), add:
   - **A / ALIAS** record for `@` pointing to the value Railway provides.
   - **CNAME** for `www` pointing to the Railway-provided host.
3. SSL certificates are issued automatically once DNS propagates.

### CLI deploy (alternative)

```bash
npm i -g @railway/cli
railway login
railway link
railway up
```

## Project structure

```
app/
  layout.tsx        # fonts, metadata, root shell
  page.tsx          # composes all sections
  globals.css       # base styles, animations, utilities
components/
  Nav.tsx           # sticky navigation
  Hero.tsx          # headline + animated entrance + stats
  Marquee.tsx       # infinite scrolling tech stack
  Services.tsx      # bento grid of 6 services
  Process.tsx       # 4-step process
  WhyUs.tsx         # value props with sticky callout
  CTA.tsx           # email CTA
  Footer.tsx        # contact / links
  Logo.tsx          # animated SVG mark + wordmark
  Cursor.tsx        # custom cursor (desktop only)
tailwind.config.ts  # brand palette + animations
```

## Brand

- Ink (background): `#0e0d0c` → `#1a1816`
- Bone (text): `#f5f1ea`
- Honey (accent): `#d4a437`
- Display: Fraunces (variable serif, italic for emphasis)
- Sans: Inter
- Mono: JetBrains Mono

## Marketing & SEO setup

This site is wired for production marketing — analytics, structured data, sitemap, robots, dynamic OG image. Most pieces activate the moment you paste env vars into Railway.

### 1. Plausible Analytics (privacy-friendly traffic stats)

Plausible is GDPR-clean (no cookie banner needed) and £9/mo on the starter plan.

1. Sign up at https://plausible.io → add `oakenit.com` as a site.
2. In Railway → service → **Variables**:
   ```
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=oakenit.com
   ```
3. Redeploy. Visit your site, then check Plausible — first pageview should appear within a minute.

### 2. Microsoft Clarity (session recordings + heatmaps)

Free. Brutal but illuminating.

1. Sign up at https://clarity.microsoft.com → create a new project for `oakenit.com`.
2. From Clarity → **Setup**, copy the project ID (e.g. `nf8qr2ab`).
3. In Railway, add:
   ```
   NEXT_PUBLIC_CLARITY_ID=nf8qr2ab
   ```
4. Redeploy. First session arrives within ~10 minutes of someone visiting the site.

### 3. Google Search Console

1. Visit https://search.google.com/search-console.
2. Add `https://www.oakenit.com` as a property → choose **HTML tag** verification.
3. Copy the `content` attribute value from the meta tag they show you (it's a long hash).
4. In Railway, add:
   ```
   GOOGLE_SITE_VERIFICATION=<that-hash>
   ```
5. Redeploy. Back in Search Console, click **Verify**. Then **Submit sitemap** → enter `sitemap.xml`.

Sitemap lives at `https://www.oakenit.com/sitemap.xml` and refreshes automatically. Robots at `/robots.txt`.

### 4. Bing Webmaster Tools (optional, free, ~5% of traffic)

1. Visit https://www.bing.com/webmasters → add site → choose **HTML meta tag** verification.
2. In Railway, add:
   ```
   BING_SITE_VERIFICATION=<that-hash>
   ```
3. Verify and submit sitemap.

### Marketing-related env var summary

| Variable | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No (defaults to `https://www.oakenit.com`) | Used by sitemap, OG, schema |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible tracking |
| `NEXT_PUBLIC_CLARITY_ID` | No | Enables Clarity session recordings |
| `GOOGLE_SITE_VERIFICATION` | No | Search Console verification meta |
| `BING_SITE_VERIFICATION` | No | Bing Webmaster verification meta |

## Inquiry form — email delivery

The contact form (`components/InquiryForm.tsx`) submits via a server action (`app/actions/inquiry.ts`) and sends an email to **hello@oakenit.com** via [Resend](https://resend.com).

**Without setup**, the form still works — submissions are written to your Railway service logs (search for `[inquiry]`).

### Quickstart — live email in 3 minutes (no DNS work)

1. Sign up at https://resend.com (free, 100 emails/day, 3000/month).
2. Resend → **API Keys** → **Create API Key** → "Full access" → copy the value (starts with `re_`).
3. In Railway → your service → **Variables** tab → add:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   ```
4. Railway redeploys automatically. The form is now live.

Emails will arrive at **hello@oakenit.com** with sender `OakenIT Inquiries <onboarding@resend.dev>` and `Reply-To` set to the inquirer's address — so hitting Reply in Gmail goes straight back to them.

### Upgrade — send from your own domain

Once you want emails to come from `inquiries@oakenit.com` instead of Resend's shared domain:

1. Resend → **Domains** → **Add Domain** → `oakenit.com`. Add the 2-3 DKIM/SPF/DMARC records they show you to Squarespace DNS (your existing Google SPF will need to be merged — Resend gives you the merged value).
2. Wait ~30 min for verification.
3. In Railway, add another variable:
   ```
   RESEND_FROM_EMAIL=OakenIT Inquiries <inquiries@oakenit.com>
   ```
4. Redeploy. Done.

### Optional overrides

| Env var | Default | Purpose |
|---|---|---|
| `RESEND_API_KEY` | *(unset → logs only)* | Your Resend key |
| `RESEND_FROM_EMAIL` | `OakenIT Inquiries <onboarding@resend.dev>` | Sender once your domain is verified |
| `INQUIRY_TO_EMAIL` | `hello@oakenit.com` | Where inquiries are delivered |

## Editing copy

All copy lives inside `components/*.tsx` — search for the phrase you want to change. Service tiles are defined as an array at the top of `Services.tsx`; process steps at the top of `Process.tsx`.
