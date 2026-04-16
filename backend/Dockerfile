FROM node:20-slim
WORKDIR /app
# Встановлюємо залежності для sqlite3
RUN apt-get update && apt-get install -y python3 make g++ gcc
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm rebuild sqlite3
COPY . .
CMD ["node", "index.js"]