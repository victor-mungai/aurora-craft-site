FROM node:20-alpine as build
WORKDIR /backend
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine as runtime
WORKDIR /backend
COPY --from=build /backend/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]