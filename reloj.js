function obtenerHora() {
    var fecha = new Date();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    
    return horas + ":" + minutos + ":" + segundos;
}

function iniciarReloj() {
    document.getElementById('reloj').innerText = obtenerHora();
    setInterval(function () {
        document.getElementById('reloj').innerText = obtenerHora();
    }, 1000);
}

window.onload = iniciarReloj;
