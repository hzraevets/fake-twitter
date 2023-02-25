### STAGE 1: Build ###
FROM node:16.16.0 AS build

ENV PUBLIC_URL=" "
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build-storybook

### STAGE 2: Run ###
From nginx:1.17.6-alpine

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -R /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/storybook-static/ .
