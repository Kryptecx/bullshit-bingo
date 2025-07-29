const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Shows laden
const shows = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'shows.json'), 'utf-8'));

// Phrasen pro Show laden
const phrasesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'phrases.json'), 'utf-8'));

// Hilfsfunktion: zufällige Auswahl
function pickRandomPhrases(show, count = 25) {
  const phrases = phrasesData[show];
  if (!phrases || phrases.length < count) {
    throw new Error(`Nicht genug Phrasen für Show: ${show}`);
  }

  // Shuffle + Slice
  const shuffled = phrases.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Startseite: Show auswählen
app.get('/', (req, res) => {
  res.render('index', { shows });
});

// Bingo-Seite mit zufälligem Feld
app.get('/play/:show', (req, res) => {
  const show = req.params.show;
  if (!phrasesData[show]) {
    return res.status(404).send("Show nicht gefunden");
  }

  const selectedPhrases = pickRandomPhrases(show);
  res.render('bingo', { show, phrases: selectedPhrases });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
