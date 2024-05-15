<?php
require "../conexion.php";
session_start();
$conexion=new Conexion();
$precioTotal=0;
foreach ($_POST as $nombre => $id) {
    if (isset($_POST[$nombre])) {
        $precioTotal += $conexion->HacerReserva($id,$_SESSION['usuario']);
    }
}
$conexion->cerrarConexion();
?>
<script>
    var precioTotal = <?php echo $precioTotal; ?>;
    alert('El precio de la reserva es: ' + precioTotal);
    window.location.href = '../../reservas.php';
</script>