// dentro del script.js
// todas nuestros textos de ejemplo

//SCOREBOARD
let tiempos = JSON.parse(localStorage.getItem('tiempos')) || [];
console.log(tiempos);

const textos = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElemento = document.getElementById('textos');
const messageElement = document.getElementById('mensaje');
const quoteElement = document.getElementById('quote');
const typedValueElement = document.getElementById('texto-tipeado');
const scoreboard = document.getElementById("scoreboard");

// en el final de nuestro archivo script.js
document.getElementById('inicio').addEventListener('click', () => {
  // elegimos el texto de ejemplo a mostrar
  const textoIndice = Math.floor(Math.random() * textos.length);
  const texto = textos[textoIndice];
  // separamos el texto en un array de palabras
  palabras = texto.split(' ');
  // reestablemos el indice de palabras para el seguimiento
  palabraIndice = 0;

  // Actualizamos la interfaz de usuario
  // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
  const spanPalabras = palabras.map(function (palabra) {
    return `<span>${palabra} </span>`;
  });
  // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
  textoElemento.innerHTML = spanPalabras.join('');
  // Resaltamos la primer palabra
  textoElemento.childNodes[0].className = 'highlight';
  // Borramos los mensajes previos
  messageElement.innerText = '';

  // Definimos el elemento textbox
  // Vaciamos el elemento textbox
  typedValueElement.value = '';
  // Definimos el foco en el elemento
  typedValueElement.focus();
  // Establecemos el manejador de eventos

  // Iniciamos el contador de tiempo
  startTime = new Date().getTime();
});

// al final de nuestro archivo script.js
typedValueElement.addEventListener('input', () => {
  // tomamos la palabra actual
  const currentWord = palabras[palabraIndice];
  // tomamos el valor actual
  const typedValue = typedValueElement.value;
  if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
    // fin de la sentencia
    // Definimos el mensaje de éxito

    const elapsedTime = new Date().getTime() - startTime;

    window.alert(`FELICITACIONES! Haz finalizado el juego en ${elapsedTime / 1000} segundos`);
    //const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;

    tiempos.push(elapsedTime);
    localStorage.setItem('tiempos', JSON.stringify(tiempos));
    updateScoreboard();

    /*const maxTime = localStorage.getItem('maxTime') //Esta linea lo que hace es buscar el elemento "maxTime" dentro del localStorage
    //Puede entregar un valor o NULL si no existe. En nuestro caso, como es la primera implementacion, no va a existir
    if (maxTime) { //El primer if revisa si maxTime tiene algun valor. Si lo tiene, el if adentro revisa que ese maxTime sea mayor, es decir, un peor tiempo al nuevo
      if (maxTime > elapsedTime) {
        localStorage.setItem('maxTime', elapsedTime);
      }
    }else { //Si maxTime no existe, directamente hace setItem porque sabe que es el unico valor
      localStorage.setItem('maxTime', elapsedTime);
    } */
  //messageElement.innerText = message;

  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // fin de la palabra
    // vaciamos el valor typedValueElement para la siguiente palabra
    typedValueElement.value = '';
    // movemos a la palabra siguiente
    palabraIndice++;
    // reiniciamos el estado de todas las clases para los textos
    for (const palabraElement of textoElemento.childNodes) {
      palabraElement.className = '';
    }
    // resaltamos la palabra actual
    textoElemento.childNodes[palabraIndice].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // correcta actual
    // resaltar la siguiente palabra
    typedValueElement.className = '';
  } else {
    // estado error
    typedValueElement.className = 'error';
  }
});

function updateScoreboard(){
  scoreboard.innerHTML = '';
  tiempos = tiempos.sort((a, b) => a - b)
  tiempos.forEach(tiempo => {
    const tiempoElement = document.createElement("div");
    tiempoElement.innerHTML = `${tiempo/1000} secs.`;
    scoreboard.appendChild(tiempoElement);
    console.log(tiempo);
  })
}

document.addEventListener("DOMContentLoaded", updateScoreboard);