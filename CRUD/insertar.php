<?php
// Datos de conexión a la base de datos
$servername = "localhost"; // Cambia a la dirección del servidor de tu base de datos si es diferente
$username = "root";
$password = "";
$dbname = "algoritmoCoeficiente";

// Crear una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener los datos del formulario JavaScript
$dato = $_POST['dato'];

// Preparar la consulta SQL
$sql = "INSERT INTO datos (dato) VALUES ('$dato')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Dato agregado correctamente";
} else {
    echo "Error al agregar el dato: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
