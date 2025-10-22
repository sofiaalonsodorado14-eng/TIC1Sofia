const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');

const rows = 10;
const cols = 10;
const cellSize = 50;
let score = 0;
let timeLeft = 10;
const maxTime = 20; // máximo tiempo permitido

// Crear fondo con casillas
for(let i = 0; i < rows * cols; i++){
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

// Función para mover el pollito a una posición aleatoria
function moveChick() {
  const maxPosition = 500 - 50; // contenedor 500px, pollito 50px
  const top = Math.floor(Math.random() * (maxPosition + 1));
  const left = Math.floor(Math.random() * (maxPosition + 1));
  chick.style.top = top + 'px';
  chick.style.left = left + 'px';
}

// Evento al hacer clic en el pollito
chick.addEventListener('click', () => {
  score++;
  scoreEl.textContent = score; // actualizar puntos
  moveChick(); // mover pollito

  // Sumar 1 segundo al temporizador, sin pasarse del máximo
  if(timeLeft < maxTime) {
    timeLeft++;
    timerEl.textContent = timeLeft;
  }
});

// Posición inicial
moveChick();

// Temporizador de 20 segundos
const timer = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if(timeLeft <= 0){
    clearInterval(timer);
    alert('¡Se acabó el tiempo! Tu puntuación: ' + score);
    chick.removeEventListener('click', moveChick);
    chick.style.pointerEvents = 'none';
  }
}, 1000);
