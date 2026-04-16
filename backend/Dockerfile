FROM node:20-bookworm
WORKDIR /app

# Встановлюємо необхідні інструменти для компіляції
RUN apt-get update && apt-get install -y python3 make g++ gcc

COPY package*.json ./

# Видаляємо старе та ставимо нове
RUN rm -rf node_modules
RUN npm install --legacy-peer-deps
RUN npm rebuild sqlite3

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]