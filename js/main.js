const opciones = ['piedra', 'papel', 'tijera'];

const marcador = {
    jugador: 0,
    computadora: 0
};

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
        return 'Ganaste';
    } else {
        marcador.computadora++;
        return 'Perdiste';
    }
}

function actualizarMarcador() {
    document.getElementById('marcador-jugador').textContent = marcador.jugador;
    document.getElementById('marcador-computadora').textContent = marcador.computadora;
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
