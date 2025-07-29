async function loadBingo(show) {
  const res = await fetch(`/api/bingo/${encodeURIComponent(show)}`);
  const data = await res.json();

  const board = document.getElementById('bingo-board');
  board.innerHTML = '';

  data.forEach(phrase => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = phrase;
    div.addEventListener('click', () => {
      div.classList.toggle('marked');
    });
    board.appendChild(div);
  });
}
