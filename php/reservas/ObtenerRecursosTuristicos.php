<?php
require "php/conexion.php";
$conexion=new Conexion();
$recursos=$conexion->ObtenerRecursosTuristicos();
if ($recursos!=null) {
    while ($recurso = $recursos->fetch_assoc()) {
        $id=$recurso['id_recurso'];
        $nombre = $recurso['nombre'];
        $limite = $recurso['limite_ocupacion'];
        $precio = $recurso['precio'];
        $descripcion = $recurso['descripcion'];
        $fechaInicio = $recurso['fecha_inicio'];
        $fechaFin = $recurso['fecha_fin'];
        echo "<section>";
        echo "<h3>$nombre</h3>";
        echo "<p>Límite de Ocupación:$limite</p>";
        echo "<p>Precio: $precio euros</p>";
        echo "<p>Tiene lugar desde $fechaInicio hasta $fechaFin</p>";
        echo "<p>$descripcion</p>";
        echo "<label> Seleccionar para reservar";
        echo "<input type='checkbox' name='$nombre' value='$id'>";
        echo "<label>";
        echo"</section>";
    }
}
$conexion->cerrarConexion();
?>