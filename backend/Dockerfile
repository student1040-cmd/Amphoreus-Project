FROM node:20-bookworm
WORKDIR /app

# Встановлюємо інструменти для збірки
RUN apt-get update && apt-get install -y python3 make g++ gcc

COPY package*.json ./

# ПОВНЕ ОЧИЩЕННЯ перед установкою
RUN rm -rf node_modules package-lock.json
RUN npm install --legacy-peer-deps
# Пряма команда перезбірки sqlite3 під поточну систему
RUN npm rebuild sqlite3 --build-from-source

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]