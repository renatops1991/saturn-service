FROM node:16
WORKDIR /usr/src/saturn-service
COPY ../package.json .
RUN npm install --only=prod
COPY ../dist ./dist
EXPOSE 3003
CMD npm start