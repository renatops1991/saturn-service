FROM node:16

WORKDIR /usr/app

COPY ./package.json ./
RUN npm pkg delete scripts.prepare && npm install --omit=dev
