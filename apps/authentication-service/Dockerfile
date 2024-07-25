FROM node:lts-alpine3.19 AS authenticationbase

FROM authenticationbase as authenticationbuilder

WORKDIR /app

COPY . .

RUN npm i

RUN npx tsc

FROM authenticationbase

EXPOSE 3002

WORKDIR /app

COPY --from=authenticationbuilder /app/dist .

COPY package*.json .

RUN npm i

CMD [ "node", "./src/main.js" ]