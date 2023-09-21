function agregarCampoTiempo() {
    var tiempoContainer = document.getElementById('tiempo-container');

    var labelTiempoEs = document.createElement('div');
    labelTiempoEs.classList.add('labelTiempoEs');

    var labelTiempoMasCuatro = document.createElement('div');
    labelTiempoMasCuatro.id = 'tiempoMasCuatro';

    var inputTiempo = document.getElementById('tiempo'); // Obtenemos la etiqueta 'input' existente

    tiempoContainer.appendChild(labelTiempoEs);
    tiempoContainer.appendChild(labelTiempoMasCuatro);

    if (!inputTiempo) {
        // Solo creamos la etiqueta 'input' si no existe
        inputTiempo = document.createElement('input');
        inputTiempo.type = 'time'; // Cambiamos el tipo de input a 'time'
        inputTiempo.id = 'tiempo';
        tiempoContainer.appendChild(inputTiempo);
    }

    var interval; // Variable para almacenar el intervalo actual

    inputTiempo.addEventListener('change', function () {
        var tiempoSeleccionado = this.value.split(':'); // Obtener horas y minutos seleccionados
        var horasSeleccionadas = parseInt(tiempoSeleccionado[0]);
        var minutosSeleccionados = parseInt(tiempoSeleccionado[1]);
        
        // Calcular la hora actual
        var ahora = new Date();
        var horasActuales = ahora.getHours();
        var minutosActuales = ahora.getMinutes();
        
        // Calcular la diferencia en segundos
        var diferenciaSegundos = ((horasSeleccionadas - horasActuales) * 3600) +
            ((minutosSeleccionados - minutosActuales) * 60) + 260; // 4 minutos + 5 segundos
        
        // Detener y limpiar el conteo anterior si existe
        if (interval) {
            clearInterval(interval);
        }
        
        interval = setInterval(function () {
            if (diferenciaSegundos <= 0) {
                // Cuando el contador llega a cero, muestra un mensaje
                document.getElementById('tiempoMasCuatro').textContent = '2.00x - 3.00x';
                clearInterval(interval);

                // Ocultar el mensaje después de 30 segundos
                setTimeout(function () {
                    document.getElementById('tiempoMasCuatro').textContent = '';
                }, 30000); // 30 segundos en milisegundos
            } else {
                var horas = Math.floor(diferenciaSegundos / 3600).toString().padStart(2, '0');
                var minutos = Math.floor((diferenciaSegundos % 3600) / 60).toString().padStart(2, '0');
                var segundos = (diferenciaSegundos % 60).toString().padStart(2, '0');

                document.getElementById('tiempoMasCuatro').textContent = horas + ':' + minutos + ':' + segundos;
                
                diferenciaSegundos--;
            }
        }, 1000);
    });
}

window.onload = function () {
    iniciarReloj();
    agregarCampoTiempo();
};
