# syntax=docker/dockerfile:1.7

FROM node:22-alpine3.21 AS build
ENV NODE_ENV=production
LABEL maintainer="Team Bidrag"
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=secret,id=reader_token \
    TOKEN="$(cat /run/secrets/reader_token)" && \
    printf '%s\n' \
      'registry=https://registry.npmjs.org/' \
      '@navikt:registry=https://npm.pkg.github.com' \
      "//npm.pkg.github.com/:_authToken=${TOKEN}" > /root/.npmrc && \
    npm ci --include=dev --legacy-peer-deps && \
    rm -f /root/.npmrc


COPY . .
RUN npm run build
RUN npm prune --omit=dev --legacy-peer-deps && npm cache clean --force

FROM node:22-alpine3.22 AS runtime
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app
COPY --from=build --chown=node:node /app/package*.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build ./build
COPY --from=build --chown=node:node /app/app/style ./app/style
COPY --from=build --chown=node:node /app/public ./public

USER node

EXPOSE 8080

CMD ["./node_modules/.bin/remix-serve", "./build/server/index.js"]
