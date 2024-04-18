FROM nginxinc/nginx-unprivileged:1.25.5-alpine-slim

COPY public/ /usr/share/nginx/html/
