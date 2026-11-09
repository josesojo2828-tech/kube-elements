# Use a pinned version for reproducible builds
FROM nginx:1.27-alpine

# Copy only the public static assets
COPY . /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ > /dev/null || exit 1

EXPOSE 80
