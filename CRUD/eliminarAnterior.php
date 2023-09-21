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

// Consulta SQL para eliminar el dato anterior (ajusta esta consulta según tu estructura de datos)
$sql = "DELETE FROM datos ORDER BY id DESC LIMIT 1";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Dato anterior eliminado correctamente";
} else {
    echo "Error al eliminar el dato anterior: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
