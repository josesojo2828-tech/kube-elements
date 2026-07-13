# Use lightweight Nginx alpine image
FROM nginx:alpine

# Copy all static assets to Nginx default html directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
