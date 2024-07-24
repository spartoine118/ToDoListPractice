FROM node:lts-alpine3.19 AS todoservicebase

FROM todoservicebase as todoservicebuilder

WORKDIR /app

COPY . .

RUN npm i

RUN npx tsc

FROM todoservicebase

EXPOSE 3001

WORKDIR /app

COPY --from=todoservicebuilder /app/dist .

COPY package*.json .

RUN npm i

CMD [ "node", "./src/main.js" ]