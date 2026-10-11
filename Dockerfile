# Static portfolio served by unprivileged nginx (uid 101, port 8080).
# Built for linux/arm64 in CI by project-infra's reusable-deploy-app workflow.
FROM nginxinc/nginx-unprivileged:stable-alpine3.24-slim@sha256:3af0c10d960cc2502427fe1219c52989d309e7d65596869c60a34fd2fa2406f0

LABEL org.opencontainers.image.title="er-portfolio" \
      org.opencontainers.image.description="Karan's engineering portfolio" \
      org.opencontainers.image.source="https://github.com/karan-sss/er-portfolio" \
      org.opencontainers.image.licenses="MIT"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=101:101 site/ /usr/share/nginx/html/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
