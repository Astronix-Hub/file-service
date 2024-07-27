FROM node:lts-alpine

ENV NODE_ENV=production

RUN apk update && apk add --no-cache build-base libc6-compat ca-certificates mailcap openssl cmake linux-headers 

WORKDIR /app/

COPY package.json ./package.json
RUN npm install
COPY ./dist ./dist

EXPOSE 4000

CMD npm run start
