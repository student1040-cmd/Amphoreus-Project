FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV HOST=0.0.0.0
ENV PORT=5173
EXPOSE 5173

CMD ["npx", "vite", "--host", "0.0.0.0"]