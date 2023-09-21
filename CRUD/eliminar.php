<?php
// Datos de conexión a la base de datos (misma información que en insertar.php)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "algoritmoCoeficiente";

// Crear una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta SQL para eliminar todos los datos
$sql = "DELETE FROM datos";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Datos eliminados correctamente";
} else {
    echo "Error al eliminar datos: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
