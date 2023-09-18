var datos1 = []; // Arreglo para la primera línea de tendencia
var datos2 = []; // Arreglo para la segunda línea de tendencia
var datos3 = []; // Arreglo para la tercera línea de tendencia
var historial = [];
var ctx = document.getElementById('myChart').getContext('2d');
var contador = 0;
var historialMaxLength = 15; // Establece la longitud máxima del historial

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: datos1,
        datasets: [
            {
                label: 'Tend 1',
                data: datos1,
                backgroundColor: '#003AFF',
                borderColor: '#003AFF',
                borderWidth: 3
            },
            {
                label: 'Tend 2',
                data: datos2,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 3
            },
            {
                label: 'Tend 3',
                data: datos3,
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 3
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6E6E6E'
                },
                grid: {
                    color: '#6E6E6E',
                    display: true
                }
            },
            x: {
                ticks: {
                    color: '#6E6E6E'
                },
                grid: {
                    color: '#6E6E6E',
                    display: true
                }
            }
        }
    }
});

function agregarDato() {
    var dato = parseFloat(document.getElementById('dato').value);
    if (dato) {
        var tendencia1, tendencia2, tendencia3;
        if (dato <= 1.99) {
            tendencia1 = -1;
            tendencia2 = -1;
            tendencia3 = -1;
        } else if (dato >= 2 && dato <= 9.99) {
            tendencia1 = 1;
            tendencia2 = 1;
            tendencia3 = 1;
        } else if (dato >= 10) {
            tendencia1 = 1;
            tendencia2 = 1;
            tendencia3 = 1;
        }

        if (contador % 3 === 0) {
            if (datos1.length > 0) {
                tendencia1 += datos1[datos1.length - 1];
            }
            datos1.push(tendencia1);
        } else if (contador % 3 === 1) {
            if (datos2.length > 0) {
                tendencia2 += datos2[datos2.length - 1];
            }
            datos2.push(tendencia2);
        } else {
            if (datos3.length > 0) {
                tendencia3 += datos3[datos3.length - 1];
            }
            datos3.push(tendencia3);
        }

        myChart.update();
        document.getElementById('dato').value = '';

        historial.unshift(dato);

        if (historial.length > historialMaxLength) {
            historial.pop();
        }

        actualizarListaValores();

        contador++;
    }
}

function eliminarUltimoDato() {
    if (historial.length > 0) {
        var datoEliminado = historial.shift(); // Elimina el primer elemento del historial
        contador--;

        // Actualiza los arreglos de datos
        if (contador % 3 === 0) {
            datos1.pop();
        } else if (contador % 3 === 1) {
            datos2.pop();
        } else {
            datos3.pop();
        }

        myChart.update();
        actualizarListaValores();
        document.getElementById('dato').value = '';

        // Puedes mostrar un mensaje o realizar otras acciones si lo deseas
        console.log("Dato eliminado:", datoEliminado);
    }
}

function actualizarListaValores() {
    var divValores = document.getElementById('valores');
    divValores.innerHTML = '';

    for (var i = 0; i < historial.length; i++) {
        var span = document.createElement('span');
        span.className = 'valor';
        span.textContent = historial[i];

        if (historial[i] <= 1.99) {
            span.style.backgroundColor = '#0079C7';
        } else if (historial[i] >= 2 && historial[i] <= 9.99) {
            span.style.backgroundColor = 'purple';
        } else if (historial[i] >= 10) {
            span.style.backgroundColor = '#CA00C7';
        }

        divValores.appendChild(span);
    }
}

document.getElementById('dato').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        agregarDato();
    }
});

document.body.addEventListener('click', function(event) {
    if (event.target.id !== 'dato' && event.target.tagName !== 'BUTTON') {
        document.getElementById('dato').focus();
    }
});

document.getElementById('eliminar').addEventListener('click', eliminarUltimoDato);
