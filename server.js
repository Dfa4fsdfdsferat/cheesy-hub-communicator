// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Массив для хранения истории чата (максимум 100 сообщений)
let chatHistory = [
    { username: "Система", message: "Cheesy's Community Chat (addon) ", timestamp: Date.now() }
];

// 1. Получить всю историю чата (Для Luau)
app.get('/get-chat', (req, res) => {
    res.json(chatHistory);
});

// 2. Отправить новое сообщение в чат (Для Luau)
app.post('/send-message', (req, res) => {
    const { username, message } = req.body;

    if (!username || !message) {
        return res.status(400).json({ error: "Missing username or message" });
    }

    const newMessage = {
        username: username,
        message: message,
        timestamp: Date.now()
    };

    // Добавляем новое сообщение в конец списка
    chatHistory.push(newMessage);

    // ОПТИМИЗАЦИЯ: Если сообщений больше 100, удаляем самое старое (первое)
    if (chatHistory.length > 100) {
        chatHistory.shift(); // .shift() удаляет элемент с индексом 0
    }

    console.log(`[ЧАТ] [Всего: ${chatHistory.length}/100] ${username}: ${message}`);

    res.json({ status: "success", history: chatHistory });
});

app.listen(PORT, () => {
    console.log(`Сервер чата запущен на http://localhost:${PORT}`);
});
