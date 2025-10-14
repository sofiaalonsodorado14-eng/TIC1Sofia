// comer.js
function darDeComer() {
  estado.hambre -= 20;
  estado.energia += 10;
  estado.felicidad += 5;

  if (estado.hambre < 0) estado.hambre = 0;
  if (estado.energia > 100) estado.energia = 100;
  if (estado.felicidad > 100) estado.felicidad = 100;

  actualizarEstado();
}

document.getElementById("boton-comer").addEventListener("click", darDeComer);



