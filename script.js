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
                backgroundColor: '#00FFF6',
                borderColor: '#00FFF6',
                borderWidth: 2,
                pointBackgroundColor: [], // Color de los puntos dinámicos
                pointRadius: 5, // Tamaño de los puntos dinámicos
                borderDash: [3, 3] //estilo de linea (punteada)
            },
            {
                label: 'Tend 2',
                data: datos2,
                backgroundColor: '#09AF00',
                borderColor: '#09AF00',
                borderWidth: 2,
                pointBackgroundColor: [], // Color de los puntos dinámicos
                pointRadius: 5, // Tamaño de los puntos dinámicos
                borderDash: [10, 10] //estilo de linea (guiones)
            },
            {
                label: 'Tend 3',
                data: datos3,
                backgroundColor: '#FFE924',
                borderColor: '#FFE924',
                borderWidth: 2,
                pointBackgroundColor: [], // Color de los puntos dinámicos
                pointRadius: 5, // Tamaño de los puntos dinámicos
                borderDash: [0, 0, 0] //estilo de linea (Línea con un patrón personalizado (alternancia de 5, 10 y 15 píxeles))
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
            if (dato >= 10) {
                // Si el dato es mayor o igual a 10, agregar el punto en la misma tendencia de color rosa
                myChart.data.datasets[0].pointBackgroundColor.push('#DA00D6');
            } else if (dato >= 6 && dato <= 9.99) {
                // Si el dato es mayor o igual a 6 pero menor o igual a 9.99, agregar el punto en blanco
                myChart.data.datasets[0].pointBackgroundColor.push('white');
            } else {
                // Si el dato no es mayor o igual a 6, agregar el punto con el color normal de la tendencia
                myChart.data.datasets[0].pointBackgroundColor.push('#00FFF6');
            }
        } else if (contador % 3 === 1) {
            if (datos2.length > 0) {
                tendencia2 += datos2[datos2.length - 1];
            }
            datos2.push(tendencia2);
            if (dato >= 10) {
                // Si el dato es mayor o igual a 10, agregar el punto en la misma tendencia de color rosa
                myChart.data.datasets[1].pointBackgroundColor.push('#DA00D6');
            } else if (dato >= 6 && dato <= 9.99) {
                // Si el dato es mayor o igual a 6 pero menor o igual a 9.99, agregar el punto en blanco
                myChart.data.datasets[1].pointBackgroundColor.push('white');
            } else {
                // Si el dato no es mayor o igual a 6, agregar el punto con el color normal de la tendencia
                myChart.data.datasets[1].pointBackgroundColor.push('#09AF00');
            }
        } else {
            if (datos3.length > 0) {
                tendencia3 += datos3[datos3.length - 1];
            }
            datos3.push(tendencia3);
            if (dato >= 10) {
                // Si el dato es mayor o igual a 10, agregar el punto en la misma tendencia de color rosa
                myChart.data.datasets[2].pointBackgroundColor.push('#DA00D6');
            } else if (dato >= 6 && dato <= 9.99) {
                // Si el dato es mayor o igual a 6 pero menor o igual a 9.99, agregar el punto en blanco
                myChart.data.datasets[2].pointBackgroundColor.push('white');
            } else {
                // Si el dato no es mayor o igual a 6, agregar el punto con el color normal de la tendencia
                myChart.data.datasets[2].pointBackgroundColor.push('#FFE924');
            }
        }

        myChart.update();
        document.getElementById('dato').value = '';

        historial.unshift(dato);

        if (historial.length > historialMaxLength) {
            historial.pop();
        }

        actualizarListaValores();
        guardarDatoEnBaseDeDatos(dato);

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
            // Elimina el color del punto correspondiente al dato eliminado
            myChart.data.datasets[0].pointBackgroundColor.pop();
        } else if (contador % 3 === 1) {
            datos2.pop();
            // Elimina el color del punto correspondiente al dato eliminado
            myChart.data.datasets[1].pointBackgroundColor.pop();
        } else {
            datos3.pop();
            // Elimina el color del punto correspondiente al dato eliminado
            myChart.data.datasets[2].pointBackgroundColor.pop();
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
        } else if (historial[i] >= 2 && historial[i] <= 5.99) {
            span.style.backgroundColor = 'purple';
        } else if (historial[i] >= 6 && historial[i] <= 9.99) {
            span.style.backgroundColor = 'purple'; // Color blanco para coeficientes entre 6 y 9.99
        } else if (historial[i] >= 10) {
            span.style.backgroundColor = '#CA00C7';
        }

        divValores.appendChild(span);
    }
}




function guardarDatoEnBaseDeDatos(dato) {
    // Enviar el dato a la base de datos a través de AJAX
    $.ajax({
        type: "POST",
        url: "CRUD/insertar.php", // Ruta al archivo PHP
        data: { dato: dato }, // Enviar el dato al archivo PHP
        success: function(response) {
            console.log(response); // Verifica la respuesta del servidor en la consola
        },
        error: function(error) {
            console.error("Error al enviar el dato:", error);
        }
    });
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
