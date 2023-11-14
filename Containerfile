FROM nginxinc/nginx-unprivileged:1.25.3-alpine-slim

COPY public/ /usr/share/nginx/html/
