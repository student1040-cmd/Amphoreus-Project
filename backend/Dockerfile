FROM node:20
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++ 
COPY package*.json ./
# Ця команда видаляє все старе перед установкою
RUN rm -rf node_modules package-lock.json
RUN npm install --legacy-peer-deps
RUN npm rebuild sqlite3
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]