FROM node:alpine

WORKDIR /app

COPY . .


RUN npm install
RUn npm i concurrently

CMD ["npm", "run", "dev"]