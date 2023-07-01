FROM node:16-alpine

WORKDIR /app/back

COPY package*.json .

# COPY . .

RUN npm install --silent

COPY . .