FROM node:10.13-alpine as builder

LABEL authors="Leonardo Martins"

#Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

#Angular CLI
RUN npm install -g @angular/cli

# Set workdir as /app, copy and install our files there
WORKDIR /app
COPY . .
RUN npm ci
# COPY . .

# Build our app
RUN npm run build

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ilegra /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
