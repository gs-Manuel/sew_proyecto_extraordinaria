<?php
require "../conexion.php";
session_start();
$conexion=new Conexion();
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$contraseña = $_POST['contraseña'];
if ($conexion->insertarUsuario($nombre, $email, $contraseña)) {
    $_SESSION['usuario']=$nombre;
    header("Location: ../../reservas.php");
}
$conexion->cerrarConexion();
?>