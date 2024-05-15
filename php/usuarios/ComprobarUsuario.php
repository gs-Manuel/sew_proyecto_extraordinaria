<?php
require "../conexion.php";
session_start();
$conexion=new Conexion();
$email = $_POST['email'];
$contraseña = $_POST['contraseña'];
$nombre=$conexion->ComprobarUsuario($email, $contraseña);
if ($nombre!=null) {
    $_SESSION['usuario']=$nombre;
    header("Location: ../../reservas.php");
}
$conexion->cerrarConexion();
?>
