# Optimum Internet — Authorized Reseller Site

React + Vite + Tailwind marketing site for ordering Optimum fiber internet, mobile, and TV online. Submissions flow from a multi-step order modal into a Google Sheet + email via a Google Apps Script web app.

## Quick start

```bash
bun install   # or npm install / pnpm install
cp .env.example .env
# edit .env and paste your Apps Script /exec URL
bun run dev
```

## Order submission pipeline

1. User fills the multi-step `OrderModal` (plan → contact/identity → service address → install + add-ons → review).
2. An agreement popup requires the user to authorize a **first-month pre-authorization** before submit.
3. On confirm, the browser POSTs JSON to `VITE_APPS_SCRIPT_URL` (`mode: "no-cors"` so Apps Script accepts it without CORS preflight).
4. The Apps Script (see `docs/apps-script.gs`) appends a row to the `Kinetic Fiber Orders` sheet and sends a formatted HTML email to the configured inbox.

### Required environment variable

| Name | Description |
| --- | --- |
| `VITE_APPS_SCRIPT_URL` | The `/exec` URL of the deployed Apps Script web app. When unset, the modal runs in dev-simulation mode and logs payloads to the console. |

### Deploying the Apps Script

1. Open the target Google Sheet → Extensions → Apps Script.
2. Paste the contents of `docs/apps-script.gs`.
3. Update `NOTIFY_EMAIL` to your notification inbox.
4. Deploy → New deployment → type "Web app" → Execute as: Me → Who has access: Anyone → Deploy.
5. Copy the `/exec` URL into `.env` as `VITE_APPS_SCRIPT_URL`.

## SEO

- Per-page `<title>`, meta description, canonical, Open Graph, Twitter, and JSON-LD via `src/components/SEO.tsx`.
- Organization, WebSite, LocalBusiness, BreadcrumbList, FAQPage, and Product schema embedded across pages.
- `public/sitemap.xml` and `public/robots.txt` reference the production domain.

## Scripts

- `bun run dev` — dev server
- `bun run build` — production build
- `bun run preview` — preview build
- `bun run test` — run unit tests (Vitest)
- `bun run lint` — lint
