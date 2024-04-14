FROM node:21-alpine3.19
ENV NODE_ENV production
ARG NPM_TOKEN
LABEL maintainer="Team Bidrag"

WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build
ENV PORT 8080
CMD ["npm", "start"]