FROM nginxinc/nginx-unprivileged:1.31.7-alpine-slim

COPY public/ /usr/share/nginx/html/
