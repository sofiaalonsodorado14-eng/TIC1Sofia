const zonaJuego = document.getElementById("zona-juego");
    let puntos = 0;

    function crearGlobo() {
      const globo = document.createElement("div");
      globo.className = "globo";
      globo.style.left = Math.random() * (zonaJuego.clientWidth - 50) + "px";
      globo.style.top = Math.random() * (zonaJuego.clientHeight - 60) + "px";

      globo.addEventListener("click", () => {
        globo.remove();
        puntos++;
      });

      zonaJuego.appendChild(globo);

      setTimeout(() => globo.remove(), 2000);
    }

    function iniciarJuego() {
      puntos = 0;
      const intervalo = setInterval(crearGlobo, 500);

      setTimeout(() => {
        clearInterval(intervalo);
        alert(`¡Reventaste ${puntos} globos!`);
      }, 10000);
    }

    document.getElementById("boton-globos").addEventListener("click", iniciarJuego);