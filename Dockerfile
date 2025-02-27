FROM node:alpine3.20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build
RUN yarn run test




