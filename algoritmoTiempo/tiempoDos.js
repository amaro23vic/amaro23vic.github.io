function startCountdown(selectedHour, selectedMinute) {
    // Obten la hora y el minuto actual
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // Calcula la diferencia de tiempo en segundos entre la hora actual y la seleccionada
    const hourDifference = selectedHour - currentHour;
    const minuteDifference = selectedMinute - currentMinute;
    const secondDifference = 240 - (hourDifference * 60 * 60 + minuteDifference * 60 + currentSecond);
    
    // Crea un intervalo que se ejecuta cada segundo
    const countdownInterval = setInterval(function() {
      // Formatea el tiempo restante como una cadena de texto
      const formattedTime = secondDifference.toString().padStart(2, '0');
  
      // Muestra el tiempo restante en la consola o en un elemento HTML
      console.log(`Tiempo restante: ${formattedTime} segundos`);
      
      // Reduce el contador en 1 segundo
      secondDifference--;
  
      // Verifica si el contador llegó a cero
      if (secondDifference < 0) {
        clearInterval(countdownInterval);
        console.log("¡Cuenta regresiva finalizada!");
      }
    }, 1000); // 1000 milisegundos = 1 segundo
  }
  
  // Llama a la función con la hora y el minuto que desees
  startCountdown(12, 0); // Ejemplo: 12:00
  