const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const sampleCards = [
  { title: "Apple", text: "A fruit." },
  { title: "Banana", text: "Yellow and tasty." },
  { title: "Cherry", text: "Small and red." },
  { title: "Date", text: "Sweet and chewy." },
  { title: "Elderberry", text: "Often used in syrups." },
  { title: "Fig", text: "Soft and sweet." },
  { title: "Grape", text: "Small, juicy fruit." },
];

app.get('/api/cards', async (req, res) => {
  const delay = Math.random() * (20000 - 10000) + 10000; // 10–20 секунд

  await new Promise((resolve) => setTimeout(resolve, delay));

  // Можно случайно "урезать" количество карточек для проверки заглушек
  const count = Math.floor(Math.random() * 7) + 1;
  const shuffled = sampleCards.sort(() => 0.5 - Math.random());
  const cards = shuffled.slice(0, count);

  // Иногда (например, раз в 10 раз) можно выбрасывать ошибку для тестирования обработки ошибок
  if (Math.random() < 0.1) {
    res.status(500).json({ error: "Server error. Please retry." });
  }

  res.json({ cards });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
