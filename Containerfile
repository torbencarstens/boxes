FROM nginxinc/nginx-unprivileged:1.25.2-alpine-slim

COPY public/ /usr/share/nginx/html/
