FROM node:lts-alpine3.19 AS api-gateway-base

FROM api-gateway-base as api-gateway-builder

WORKDIR /app

COPY . .

RUN npm i

RUN npx tsc

FROM api-gateway-base

EXPOSE 3000

WORKDIR /app

COPY --from=api-gateway-builder /app/dist .

COPY package*.json .

RUN npm i

CMD [ "node", "./src/server.js" ]