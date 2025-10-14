// estado.js
let estado = {
  energia: 100,
  hambre: 0,
  felicidad: 100
};

function actualizarEstado() {
  const energiaEl = document.getElementById("energia");
  const hambreEl = document.getElementById("hambre");
  const felicidadEl = document.getElementById("felicidad");

  energiaEl.textContent = `Energía: ${estado.energia}`;
  hambreEl.textContent = `Hambre: ${estado.hambre}`;
  felicidadEl.textContent = `Felicidad: ${estado.felicidad}`;
}

function bajarEstados() {
  estado.energia -= 1;
  estado.hambre += 1;
  estado.felicidad -= 1;

  if (estado.energia < 0) estado.energia = 0;
  if (estado.hambre > 100) estado.hambre = 100;
  if (estado.felicidad < 0) estado.felicidad = 0;

  actualizarEstado();
}

setInterval(bajarEstados, 3000); // cada 3 segundos baja un poco
