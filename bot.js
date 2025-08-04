const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '8176883642:AAEmqGO-CEIRCsrvGvVYowsTCdlwPHZaD6w';
const bot = new TelegramBot(token, { polling: true });

// Файл статистики
const statsFile = 'stats.json';

// Загружаем статистику, если есть
let stats = { startCount: 0 };
if (fs.existsSync(statsFile)) {
  stats = JSON.parse(fs.readFileSync(statsFile));
}

// Список книг со ссылками
const books = [
  { title: '📘 "Грокаем алгоритмы"', link: 'https://book.chitaem-knigi.online/books/grokaem-algoritmy' },
  { title: '📙 "Чистый код" — Роберт Мартин', link: 'https://mirbukv.net/kniga/chistyy-kod-sozdanie-analiz-i-refaktoring-martin' },
  { title: '📗 "Изучаем JavaScript"', link: 'https://codelibrary.info/books/javascript/izuchaem-javascript' },
  { title: '📕 "Go Programming Language"', link: 'https://codelibrary.info/books/go' },
];

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Обновляем счётчик
  stats.startCount += 1;
  fs.writeFileSync(statsFile, JSON.stringify(stats));

  const caption = `🚀 *Твоя карьера стартует здесь!*

💻 Канал для тех, кто хочет влиться в мир *IT* и зарабатывать *мозгом*.
🧠 Никакого скама — только чёткие ответы на заданные вопросы!

👉 [Подписаться на канал](https://t.me/codecrew0)

📚 *5 лучших книг по программированию:*
${books.map(book => `- ${book.title} — [Скачать](${book.link})`).join('\n')}
  `;

  bot.sendPhoto(chatId, fs.createReadStream('photo.jpg'), {
    caption,
    parse_mode: 'Markdown'
  });
});

// Команда /stats
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📈 Бот запускали: *${stats.startCount}* раз(а).`, { parse_mode: 'Markdown' });
});
