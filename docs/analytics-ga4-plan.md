# Analytics: GA4 + event tracking (future work)

Vercel Web Analytics + Speed Insights are already wired up (see `src/main.tsx`). This document is the design for the next phase — Google Analytics 4 plus a custom event-tracking wrapper — deliberately not implemented yet. Pick this up when ready.

## Context
- Site is a static SPA (React 19 + Vite + TypeScript) with build-time SSR prerendering (`scripts/prerender.mjs` + `vite build --ssr`), deployed on Vercel's **Hobby (free) plan**, no backend.
- No `import.meta.env.VITE_*` env-var convention exists yet in this codebase — all config is hardcoded in `src/app/config/appConfig.ts`. This plan establishes `VITE_GA_MEASUREMENT_ID` as the first one.
- Vercel Analytics custom events require a Pro plan; on Hobby, all custom event tracking (resume downloads, terminal commands, outbound clicks, contact form) should go through **GA4 only**.

## B1. GA4 property setup (manual, one-time)
1. Go to https://analytics.google.com → Admin → Create Property → name it "Akash Senthil Portfolio", set timezone/currency.
2. Add a **Web** data stream with URL `https://akashsenthil.tech`.
3. Copy the **Measurement ID** (format `G-XXXXXXXXXX`) shown on the stream's detail page.
4. In the Vercel project dashboard → Settings → Environment Variables, add `VITE_GA_MEASUREMENT_ID` = that value for Production (and Preview if desired). Also add it to a local `.env.local` (gitignored) for local testing.

## B2. Loader script in `index.html`
Add to `<head>`, right after `<meta charset="UTF-8" />` (no conflicts with the existing JSON-LD `<script>` further down, or with the SSR data-seeding `<script id="portfolio-data">` that `prerender.mjs` injects into `<body>`):

```html
<script>
  window.__GA_MEASUREMENT_ID__ = '%VITE_GA_MEASUREMENT_ID%';
</script>
<script>
  (function () {
    var id = window.__GA_MEASUREMENT_ID__;
    if (!id || id.indexOf('%') === 0) return; // unset locally - do not load gtag
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
  })();
</script>
```

Vite natively replaces `%VITE_*%` placeholders in `index.html` from env files at build time — no React/JS templating needed. The `indexOf('%') === 0` guard means local dev without the env var set simply skips loading gtag (no console errors, no blank-ID requests). This is plain static HTML, outside the React tree, so it carries zero hydration-mismatch risk regardless of SSR/prerendering.

## B3. `appConfig.ts` — expose the ID for reference/debugging
```ts
analytics: {
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined,
},
```

## B4. Global type declaration
New `src/core/analytics/gtag.d.ts`:
```ts
export {}
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
```

## B5. Event tracking wrapper
New `src/core/analytics/track.ts`:
```ts
type AnalyticsEventName =
  | 'resume_download'
  | 'contact_submit'
  | 'contact_submit_failed'
  | 'terminal_command'
  | 'outbound_link_click'

export function trackEvent(name: AnalyticsEventName, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
```
GA4-only (no Vercel custom-event call — it would silently no-op on Hobby and add nothing).

## B6. Wire `trackEvent` into every interaction point

| Location | Event | Params |
|---|---|---|
| `Navbar.tsx` — both resume `<a download>` links (desktop + mobile drawer) | `resume_download` | `{ location: 'navbar_desktop' \| 'navbar_mobile' }` |
| `Contact.tsx` — `handleSubmit`, on `result.success` | `contact_submit` | — |
| `Contact.tsx` — `handleSubmit`, `catch` block and no-`web3Key` fallback | `contact_submit_failed` | `{ reason: 'network_error' \| 'no_api_key' }` |
| `TerminalModal.tsx` — `handleCommandRun`, after the switch resolves | `terminal_command` | `{ command: trimmedInput }` |
| `Footer.tsx` — `socialLinks.map(...)` anchor | `outbound_link_click` | `{ destination: label.toLowerCase() }` |
| `Contact.tsx` — social-links grid anchors | `outbound_link_click` | `{ destination, surface: 'contact_section' }` |
| `Notes.tsx` — "read medium notes" link + per-article `note.link` anchors | `outbound_link_click` | `{ destination: 'medium', surface: 'notes_header' \| 'notes_article', article: note.id }` |
| `Community.tsx` — the two `appConfig.links.nammaFlutter` anchors | `outbound_link_click` | `{ destination: 'namma_flutter' }` |

All of these are plain `<a>`/button elements with no existing `onClick` — purely additive, one-line `onClick={() => trackEvent(...)}` each.

## Commit breakdown (when this is picked up)
1. `feat(analytics): GA4 loader script + env var plumbing`
2. `feat(analytics): event tracking wrapper + instrument resume/contact/terminal`
3. `feat(analytics): instrument outbound link clicks (footer, contact, notes, community)`

## Verification
- Confirm `dist/index.html`'s `<head>` contains the gtag loader with the placeholder correctly replaced (or safely unreplaced if no env var is set locally).
- `npm run preview`, devtools network tab: confirm `gtag/js` fires only when `VITE_GA_MEASUREMENT_ID` is set; click through resume download, contact form, each terminal command, and each outbound link to confirm `gtag('event', ...)` calls fire.
- After merge + deploy: confirm real-time data appears in the GA4 Real-time report.

## Out of scope even for this future work
- UTM-tagging the user's own outbound posts (LinkedIn/GitHub/Medium bio links) — a content/process change, not code.
- Correlating GA4 summary stats into the project's Artifact tracker — possible later via the GA4 Data API.
- Route-change `page_view` tracking — not needed since `AppRoutes.tsx` is a true single-page site today (`index` and `*` both render the same `PortfolioPage`); revisit if real routes are added.
