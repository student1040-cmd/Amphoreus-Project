const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); 
const app = express();
const PORT = 3000;

// Рівень 2: Налаштування CORS та обробки JSON
app.use(cors());
app.use(express.json());

/**
 * ПІДКЛЮЧЕННЯ ДО БАЗИ ДАНИХ
 * Оскільки файл лежить у папці db, вказуємо шлях './db/reviews_v2.db'
 */
const db = new sqlite3.Database('./db/reviews_v2.db', (err) => {
    if (err) {
        return console.error("Помилка підключення до БД:", err.message);
    }
    console.log('Успіх! Підключено до бази даних reviews_v2.db у папці db.');
});

// Ендпоінт для отримання відгуків (GET)
app.get('/api/reviews', (req, res) => {
    // Використовуємо таблицю 'reviews', створену в DBeaver
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
    // Використовуємо назви полів user_name та comment з нашої таблиці
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
            message: "Відгук успішно збережено в папці db!" 
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});