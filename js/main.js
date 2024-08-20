const opciones = ['piedra', 'papel', 'tijera'];

const marcador = {
    jugador: 0,
    computadora: 0,
    partidasGanadas: 0
};

let puntaje = 0;

function cargarPuntaje() {
    const puntajeGuardado = localStorage.getItem('puntaje');
    if (puntajeGuardado) {
        puntaje = parseInt(puntajeGuardado);
    }
    document.getElementById('puntaje').textContent = puntaje;
}

function guardarPuntaje() {
    localStorage.setItem('puntaje', puntaje);
}

function opcionComputadora() {
    const index = Math.floor(Math.random() * opciones.length);
    return opciones[index];
}

function determinarGanador(jugador, computadora) {
    if (jugador === computadora) {
        return 'Empate';
    }
    if (
        (jugador === 'piedra' && computadora === 'tijera') ||
        (jugador === 'papel' && computadora === 'piedra') ||
        (jugador === 'tijera' && computadora === 'papel')
    ) {
        marcador.jugador++;
        if (marcador.jugador === 3) {
            puntaje += 100;
            guardarPuntaje();
            cargarPuntaje();
            marcador.partidasGanadas++;
            reiniciarPartida();
        }
        return 'Ganaste';
    } else {
        marcador.computadora++;
        if (marcador.computadora === 3) {
            reiniciarPartida();
        }
        return 'Perdiste';
    }
}

function reiniciarPartida() {
    marcador.jugador = 0;
    marcador.computadora = 0;
    actualizarMarcador();
}

function actualizarMarcador() {
    document.getElementById('marcador-jugador').textContent = marcador.jugador;
    document.getElementById('marcador-computadora').textContent = marcador.computadora;
    document.getElementById('partidas-ganadas').textContent = marcador.partidasGanadas;
}

function jugar(opcionJugador) {
    const opcionComp = opcionComputadora();
    const resultado = determinarGanador(opcionJugador, opcionComp);
    
    document.getElementById('resultado').textContent = 
    "Elegiste: " + opcionJugador + ". " + 
    "Computadora eligió: " + opcionComp + ". " + 
    resultado + "!";
    
    actualizarMarcador();
}

function resetMarcador(){
    localStorage.setItem('puntaje', 0);
    cargarPuntaje();
}

class Juego {
    constructor() {
        this.inicializarBotones();
        cargarPuntaje();
    }

    inicializarBotones() {
        document.getElementById('btn-piedra').addEventListener('click', () => jugar('piedra'));
        document.getElementById('btn-papel').addEventListener('click', () => jugar('papel'));
        document.getElementById('btn-tijera').addEventListener('click', () => jugar('tijera'));
        document.getElementById('btn-reset').addEventListener('click', () => resetMarcador());
    }
}

    const juego = new Juego();
