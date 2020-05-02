FROM node:12.16.3-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

CMD ["node", "index.js"]