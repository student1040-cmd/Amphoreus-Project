FROM node:20-slim
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./

# Встановлюємо основні залежності
RUN npm install --legacy-peer-deps

# СИЛОВА УСТАНОВКА: змушуємо Render встановити плагін Vue
RUN npm install @vitejs/plugin-vue --save-dev

# Копіюємо решту файлів
COPY . .

EXPOSE 5173

# Запуск через npm run dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]