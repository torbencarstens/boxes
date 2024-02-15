FROM nginxinc/nginx-unprivileged:1.25.4-alpine-slim

COPY public/ /usr/share/nginx/html/
