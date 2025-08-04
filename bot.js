const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Файл статистики
const statsFile = 'stats.json';

// Загружаем статистику, если есть, иначе создаём начальный объект
let stats = { startCount: 0 };
if (fs.existsSync(statsFile)) {
  try {
    stats = JSON.parse(fs.readFileSync(statsFile));
  } catch (e) {
    console.error('Ошибка чтения stats.json, используем стартовые данные');
  }
}

// Список книг со ссылками
const books = [
  { title: '📘 "Грокаем алгоритмы"', link: 'https://book.chitaem-knigi.online/books/grokaem-algoritmy' },
  { title: '📙 "Чистый код" — Роберт Мартин', link: 'https://mirbukv.net/kniga/chistyy-kod-sozdanie-analiz-i-refaktoring-martin' },
  { title: '📗 "Изучаем JavaScript"', link: 'https://codelibrary.info/books/javascript/izuchaem-javascript' },
  { title: '📕 "Go Programming Language"', link: 'https://codelibrary.info/books/go' },
];

// Ком
