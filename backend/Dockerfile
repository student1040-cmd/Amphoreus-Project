# Використовуємо alpine версію для кращої сумісності
FROM node:20-alpine
WORKDIR /app

# Alpine використовує apk замість apt-get
RUN apk add --no-cache python3 make g++ gcc libc6-compat

COPY package*.json ./

# Чиста установка з ігноруванням конфліктів
RUN npm install --legacy-peer-deps
RUN npm rebuild sqlite3

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]