FROM node:alpine3.20
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build
RUN yarn run test:ci