<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Explorando Murcia - Reservas</title>
    <meta name="author" content="Manuel González Santos"/>
    <meta name="description" content="Reserva"/>
    <meta name ="keywords" content = "HTML5,CSS,PHP"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css"/>
    <link rel="stylesheet" type="text/css" href="estilo/layout.css"/>
</head>
<body>
    <header>
        <h1>Explorando Murcia</h1>
        <nav>
            <a tabindex="1" accesskey="i" href="index.html">Página Principal</a>
            <a tabindex="2" accesskey="g" href="gastronomia.html">Gastronomía</a>
            <a tabindex="3" accesskey="r" href="rutas.html">Rutas</a>
            <a tabindex="4" accesskey="m" href="metereologia.html">Metereología</a>
            <a tabindex="5" accesskey="j" href="juego.html">Juego</a>
            <a tabindex="6" accesskey="e" href="reservas.php">Reservas</a>
        </nav>
    </header>
    <?php
    session_start();
    if (!isset($_SESSION['usuario'])) {
        ?>
    <section>
        <h2>Formularios</h2>
        <form method="post" action="php/usuarios/InsertarUsuario.php">
            <fieldset>
                <legend>Registro</legend>
                    <label>Nombre
                        <input type="text" name="nombre" required="required">
                    </label>
                    <label>Email
                        <input type="email" name="email" required="required">
                    </label>
                    <label>Contraseña
                        <input type="password" name="contraseña" required="required">
                    </label>
            </fieldset>
            <button type="submit">Registrarse</button>
        </form>
        <form  method="post" action="php/usuarios/ComprobarUsuario.php">
            <fieldset>
                <legend>Identificación</legend>
                    <label>Email
                        <input type="email" name="email" required="required">
                    </label>
                    <label>Contraseña
                        <input type="password" name="contraseña" required="required">
                    </label>
            </fieldset>
            <button type="submit">Identificarse</button>
        </form>
    </section>
    <?php
    }
    ?>
    <?php
        if (isset($_SESSION['usuario'])) {
    ?>
    <section>
        <section>
            <h2>¿Cómo Reservar?</h2>
            <p>
                Para reservar, simplemente selecciona aquellos recursos turísticos que quieras reservar,
                y al final de la página encontrarás el botón para efectuar la reserva.
            </p>
        </section>
        <h2>Reservas turísticas</h2>
        <form method="post" action="php/reservas/HacerReserva.php">
            <fieldset>
                <legend>Recursos turísticos</legend>
                    <?php
                    require "php/reservas/ObtenerRecursosTuristicos.php";
                    ?>
            </fieldset>
            <button type="submit">Hacer Reserva</button>
        </form>
    </section>
    <?php
    }
    ?>
</body>
</html>