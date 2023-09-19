function verificarCredenciales() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica las credenciales hardcodeadas (esto es solo para pruebas)
    if (username === 'VictorA28' && password === 'victordaniel2001*') {
        // Credenciales válidas, muestra el contenido principal
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('container').style.display = 'block';
    } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
}
