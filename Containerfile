FROM nginxinc/nginx-unprivileged:1.31.5-alpine-slim

COPY public/ /usr/share/nginx/html/
