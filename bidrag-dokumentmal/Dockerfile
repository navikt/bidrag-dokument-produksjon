FROM node:23 AS build-env
ENV NODE_ENV production
ARG NPM_TOKEN
LABEL maintainer="Team Bidrag"
WORKDIR /app

RUN npm set registry https://registry.npmjs.org/
RUN npm set @navikt:registry https://npm.pkg.github.com
RUN --mount=type=secret,id=reader_token \
    npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/reader_token)

ENV NODE_ENV production

COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM node:current-alpine3.22
COPY --from=build-env /app /app
COPY --from=build-env /usr/local/lib/node_modules /app/node_modules

ENV PORT 8080
WORKDIR /app

CMD ["./node_modules/.bin/remix-serve", "./build/server/index.js"]