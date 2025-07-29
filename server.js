const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const shows = require('./data/shows.json');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { shows: Object.keys(shows) });
});

app.get('/api/bingo/:show', (req, res) => {
  const show = req.params.show;
  const phrases = shows[show];

  if (!phrases) return res.status(404).send('Show not found');

  const selected = phrases
    .sort(() => 0.5 - Math.random())
    .slice(0, 25);

  res.json(selected);
});

app.listen(PORT, () => {
  console.log(`Bullshit Bingo läuft auf Port ${PORT}`);
});
