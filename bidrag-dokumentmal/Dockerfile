FROM node:23 AS build
ENV NODE_ENV production
LABEL maintainer="Team Bidrag"
WORKDIR /app

RUN npm set registry https://registry.npmjs.org/
RUN npm set @navikt:registry https://npm.pkg.github.com
RUN --mount=type=secret,id=reader_token \
    npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/reader_token)

COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
ENV PORT 8080

CMD ["node", "./build/server/index.js"]