const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Trailblazer, вітаємо в системі Amphoreus!</h1><p>Сервер активовано успішно.</p>');
});

app.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});