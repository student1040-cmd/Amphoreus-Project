import axios from 'axios';

// Створення екземпляру axios з базовим URL вашого бекенду
const api = axios.create({
  baseURL: 'http://localhost:3000', // Адреса вашої Express.js частини
});

// Перехоплювач для логування помилок (Рівень 3: коментар)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;