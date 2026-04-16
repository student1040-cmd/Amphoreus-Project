FROM node:20
WORKDIR /app
COPY package*.json ./
# Ставимо залежності чисто
RUN npm install --legacy-peer-deps
COPY . .
ENV HOST=0.0.0.0
ENV PORT=5173
EXPOSE 5173
# Запуск через npx гарантує, що ми знайдемо vite
CMD ["npx", "vite", "--host", "0.0.0.0"]