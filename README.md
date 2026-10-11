# er-portfolio

Karan's engineering portfolio, live at **https://karan-s.com**.

A static page served by an unprivileged nginx container. It runs on the
self-hosted platform described in [project-infra](https://github.com/karan-sss/project-infra).

## How it ships

```
push to main → build linux/arm64 (native runner) → SBOM + provenance → cosign sign
            → Trivy scan → cosign verify → deploy over Tailscale → docker compose up
```

All of that is project-infra's reusable workflow
(`.github/workflows/reusable-deploy-app.yml`), called from `.github/workflows/deploy.yml`.

| Path | Purpose |
|---|---|
| `site/` | The page (plain HTML/CSS, no build step) |
| `nginx.conf` | nginx on port 8080, `/healthz`, no server tokens |
| `Dockerfile` | `nginx-unprivileged` (uid 101), pinned by digest |
| `deploy/compose.yaml` | Runtime policy: read-only, `cap_drop: ALL`, 32 MB, no published ports |

## Local preview

```bash
python3 -m http.server -d site 8000   # http://localhost:8000
```
