// animacion.js
const mascota = document.getElementById("mascota");

let haciaLaDerecha = true;
let posicion = 0;

function moverMascota() {
  if (haciaLaDerecha) {
    posicion += 2;
    if (posicion > 200) haciaLaDerecha = false;
  } else {
    posicion -= 2;
    if (posicion < 0) haciaLaDerecha = true;
  }
  mascota.style.transform = `translateX(${posicion}px)`;
}

setInterval(moverMascota, 50);


