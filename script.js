//Cantidad de preguntas
const  TOTAL_PREGUNTAS = 10;

let cantidadAcertadas = 0;

//Variable que controla la pregunta actual
let numPreguntaActual = -1;

let estadoPreguntas = [0,0,0,0,0,0,0,0,0,0]

//Base de datos de preguntas
const bd_juego = [
  {
    id:'A',
    pregunta:"Empresa reconocida que se dedica a los servidores",
    respuesta:"amazon"
  },
  {
    id:'B',
    pregunta:"Termino en ingles que hace referencia a una copia de seguridad",
    respuesta:"backup"
  },
  {
    id:'C',
    pregunta:"Nombre de la memoria que almacena temporalmente los datos de la computadora",
    respuesta:"cache"
  },
  {
    id:'D',
    pregunta:"Archivo que controla los perifericos que se conectan a la computadora",
    respuesta:"driver"
  },
  {
    id:'E',
    pregunta:"Mezclar los datos para protegerlos como medida de seguridad, es decir, convertirlos texto normal a texto cifrado",
    respuesta:"encriptar"
  },
  {
    id:'F',
    pregunta:"Famosa red social creada por Mark Zuckerberg",
    respuesta:"facebook"
  },
  {
    id:'G',
    pregunta:"Lenguaje de programacion creado por Google",
    respuesta:"go"
  },
  {
    id:'H',
    pregunta:"Lenguaje utilizado para la estructura de las paginas web",
    respuesta:"html"
  },
  {
    id:'I',
    pregunta:"Aspecto que presentan los programas tras su ejecucion mediante el cual ejercemos la comunicacion con estas",
    respuesta:"interfaz"
  },  {
    id:'J',
    pregunta:"Lenguaje de programacion con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
]



//Variables para controlar tiempo
const timer = document.getElementById("tiempo");
//Tiempo del juego
const TIEMPO_DEL_JUEGO = 60
//Variable del tiempo restante
let timeLeft = TIEMPO_DEL_JUEGO;
//Variable que maneja el contador
let countdown;


const container = document.querySelector(".container");
for(let i=1; i <= TOTAL_PREGUNTAS; i++){
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  container.appendChild(circle);

  const angle = ((i-1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI /2);
  const x = Math.round(95 + 120 * Math.cos(angle));
  const y = Math.round(95 + 120 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

//Boton comenzar

let comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event){
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";

  largarTiempo();
  cargarPregunta();
})

function largarTiempo(){
  countdown = setInterval(()=> {
    //restar un segundo al tiempo
    timeLeft--;
    //actualizar el texto del cronometro con el tiempo restante
    timer.innerText = timeLeft;

    //Si el tiempo llega a 0, detener el cronometro
    if(timeLeft<0){
      clearInterval(countdown);
      //alert("se acabo el tiempo")
      mostrarPantallaFinal();
    }
  },1000);
}


function cargarPregunta(){
  numPreguntaActual++;
  if(numPreguntaActual >= TOTAL_PREGUNTAS){
    numPreguntaActual = 0;
  }

  if(estadoPreguntas.indexOf(0)>=0){
    while(estadoPreguntas[numPreguntaActual]==1){
      numPreguntaActual++;
      if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
      }
    }

    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id;
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
    let letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.add("pregunta-actual");
  }else{
    clearInterval(countdown);
    mostrarPantallaFinal()
  }
  
}

let respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event){
  if(event.keyCode ===13){
    if(respuesta.value==""){
      alert("Debe ingresar un valor");
      return;
    }
    let txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
})

function controlarRespuesta(txtRespuesta){
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    //alert("Respuesta correcta");
    cantidadAcertadas++;

    estadoPreguntas[numPreguntaActual] = 1;

    let letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");
  }else{
    estadoPreguntas[numPreguntaActual] = 1;
    let letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("mal-respondida");
  }

  respuesta.value="";

  cargarPregunta();
}

//Boton pasapalabra
let pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event){
  let letra = bd_juego[numPreguntaActual].id
  document.getElementById(letra).classList.remove("pregunta-actual");

  cargarPregunta();
})

//Mostrar pantalla final
function mostrarPantallaFinal(){
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = (cantidadAcertadas*100)/10 + "% de acierto";
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
}

//boton para jugar de nuevo
let recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event){
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = [0,0,0,0,0,0,0,0,0,0];

  let circulos = document.getElementsByClassName("circle");
  for(i=0; i<circulos.length;i++){
    circulos[i].classList.remove("pregunta-actual");
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  respuesta.value="";

  largarTiempo();
  cargarPregunta();
})