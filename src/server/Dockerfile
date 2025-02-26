FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src/server/ ./src/server/
EXPOSE 3001
CMD ["node", "src/server/server.js"]
