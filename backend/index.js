const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); 
const app = express();

// Render автоматично призначає порт через змінні оточення. Якщо ні — використовуємо 3000.
const PORT = process.env.PORT || 3000;

// Рівень 3: Налаштування CORS для твого фронтенду
app.use(cors({
    origin: 'https://laba-2-frontend.onrender.com'
}));

app.use(express.json());

/**
 * ПІДКЛЮЧЕННЯ ДО БАЗИ ДАНИХ
 */
const db = new sqlite3.Database('./db/reviews_v2.db', (err) => {
    if (err) {
        return console.error("Помилка підключення до БД:", err.message);
    }
    console.log('Успіх! Підключено до бази даних reviews_v2.db');
});

// Ендпоінт для отримання відгуків (GET)
app.get('/api/reviews', (req, res) => {
    const sql = "SELECT * FROM reviews ORDER BY created_at DESC"; 
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); 
    });
});

// Ендпоінт для додавання відгуку (POST)
app.post('/api/reviews', (req, res) => {
    const { user_name, comment } = req.body;
    
    if (!user_name || !comment) {
        return res.status(400).json({ error: "Ім'я та коментар обов'язкові" });
    }

    const sql = "INSERT INTO reviews (user_name, comment) VALUES (?, ?)";
    db.run(sql, [user_name, comment], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ 
            id: this.lastID, 
            user_name, 
            comment,
            message: "Відгук успішно збережено!" 
        });
    });
});

// Запуск сервера на порту від Render
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер працює на порту ${PORT}`);
});