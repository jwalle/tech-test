FROM node:current-alpine3.10
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .