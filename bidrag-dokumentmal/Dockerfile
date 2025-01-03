FROM node:21-alpine3.19
ENV NODE_ENV production
ARG NPM_TOKEN
LABEL maintainer="Team Bidrag"
WORKDIR /app

RUN npm set registry https://registry.npmjs.org/
RUN npm set @navikt:registry https://npm.pkg.github.com
RUN --mount=type=secret,id=reader_token \
    npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/reader_token) \

ENV NODE_ENV production

COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

ENV PORT 8080
CMD ["npm", "start"]