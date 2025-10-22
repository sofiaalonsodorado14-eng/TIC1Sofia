const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');

const rows = 10;
const cols = 10;
const cellSize = 50;
let score = 0;
let timeLeft = 20.0; // tiempo con decimales
const maxTime = 20.0; // tiempo máximo permitido

// Límite superior (para evitar que el pollito aparezca muy arriba)
const topLimit = 120; // píxeles desde arriba

// Crear fondo con casillas
for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  game.appendChild(cell);
}

// Crear pollito
const chick = document.createElement('img');
chick.src = 'pollito-pio.png';
chick.id = 'chick';
chick.style.position = 'absolute';
chick.style.width = '50px';
chick.style.height = '50px';
game.appendChild(chick);

// Función para mover el pollito
function moveChick() {
  const maxX = 500 - 50; // ancho del contenedor - tamaño del pollito
  const maxY = 500 - 50; // alto del contenedor - tamaño del pollito

  const top = Math.floor(Math.random() * (maxY - topLimit + 1)) + topLimit;
  const left = Math.floor(Math.random() * (maxX + 1));

  chick.style.top = top + 'px';
  chick.style.left = left + 'px';
}

// Al hacer clic en el pollito
chick.addEventListener('click', () => {
  score++;
  scoreEl.textContent = score;
  moveChick();

  // Añadir 0.5 segundos, sin superar el máximo
  if (timeLeft < maxTime) {
    timeLeft += 0.5;
    if (timeLeft > maxTime) timeLeft = maxTime;
    timerEl.textContent = timeLeft.toFixed(1);
  }
});

// Posición inicial
moveChick();

// Temporizador cada 0.1 segundos para más precisión
const timer = setInterval(() => {
  timeLeft -= 0.1;
  if (timeLeft < 0) timeLeft = 0;
  timerEl.textContent = timeLeft.toFixed(1);

  if (timeLeft <= 0) {
    clearInterval(timer);
    alert('¡Se acabó el tiempo! Tu puntuación: ' + score);
    chick.style.pointerEvents = 'none';
  }
}, 100);


