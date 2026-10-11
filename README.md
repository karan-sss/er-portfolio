# er-portfolio

Karan's engineering portfolio, live at **https://karan-s.com**.

A static page built with Vite + TypeScript and served by an unprivileged nginx container. It runs on the
self-hosted platform described in [project-infra](https://github.com/karan-sss/project-infra).

## How it ships

```
push to main → vite build → build linux/arm64 (native runner) → SBOM + provenance → cosign sign
            → Trivy scan → cosign verify → deploy over Tailscale → docker compose up
```

Pull requests run `.github/workflows/ci.yml` first: an arm64 image build, a smoke test under the
production runtime policy, and Trivy scans (image + repo) reported to GitHub code scanning. It
re-scans weekly.

The deploy itself is project-infra's reusable workflow
(`.github/workflows/reusable-deploy-app.yml`), called from `.github/workflows/deploy.yml`.

| Path | Purpose |
|---|---|
| `src/content.ts` | Everything the page says (experience, projects, skills) |
| `src/render.ts` | Renders the content to static HTML at build time (no JS needed to read the page) |
| `index.html`, `src/styles.css`, `src/main.ts` | Page shell, styles, theme toggle |
| `public/` | Copied as-is (favicon, robots.txt, pre-paint theme script) |
| `nginx.conf` | nginx on port 8080, `/healthz`, no server tokens |
| `Dockerfile` | Node build stage → `nginx-unprivileged` (uid 101); both pinned by digest |
| `deploy/compose.yaml` | Runtime policy: read-only, `cap_drop: ALL`, 32 MB, no published ports |

## Local preview

Needs Node 22.

```bash
npm ci
npm run dev       # http://localhost:5173, live reload
npm run build     # type-check + build into dist/
npm run preview   # serve dist/ at http://localhost:4173
```
