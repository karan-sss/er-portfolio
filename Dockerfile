# Portfolio: built with Vite, served by unprivileged nginx (uid 101, port 8080).
# Built for linux/arm64 in CI by project-infra's reusable-deploy-app workflow.

# --- build: static files only; nothing from this stage ships except dist/ ---
FROM node:22.23.3-alpine3.24@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-fund --no-audit
COPY tsconfig.json vite.config.ts index.html ./
COPY src/ src/
COPY public/ public/
RUN npm run build

# --- runtime ---
FROM nginxinc/nginx-unprivileged:stable-alpine3.24-slim@sha256:5d8bb9437d74a600ec5dbf90c035451c724dc33eac8d3a71078f6f8612c345f6

LABEL org.opencontainers.image.title="er-portfolio" \
      org.opencontainers.image.description="Karan's engineering portfolio" \
      org.opencontainers.image.source="https://github.com/karan-sss/er-portfolio" \
      org.opencontainers.image.licenses="MIT"

# Pull Alpine security fixes the pinned base has not shipped yet (zlib
# CVE-2026-85091 at the time of writing). A no-op once upstream rebuilds.
USER root
RUN apk upgrade --no-cache zlib

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist/ /usr/share/nginx/html/

# The base image already runs as nginx (uid 101); stating it lets scanners see it.
USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
