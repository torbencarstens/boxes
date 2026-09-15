FROM nginxinc/nginx-unprivileged:1.31.6-alpine-slim

COPY public/ /usr/share/nginx/html/
