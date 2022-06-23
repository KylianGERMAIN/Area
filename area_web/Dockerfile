FROM node:latest

USER root

WORKDIR /app/area_web

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]