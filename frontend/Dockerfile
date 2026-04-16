FROM node:20-slim
WORKDIR /app
COPY package*.json ./

# Встановлюємо залежності та примусово додаємо плагін для VUE
RUN npm install --legacy-peer-deps
RUN npm install @vitejs/plugin-vue --save-dev

COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]