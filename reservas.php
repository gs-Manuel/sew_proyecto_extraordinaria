<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Explorando Murcia - Reservas</title>
    <meta name="author" content="Manuel González Santos"/>
    <meta name="description" content="Reserva"/>
    <meta name ="keywords" content = "HTML5,CSS"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <article>
        <?php
         if (isset($a)) {
        ?>
        <form>
            <fieldset>
                <legend>Registro</legend>
                <section>
                    <label>Nombre
                        <input type="text" name="nombre">
                    </label>
                    <label>Email
                        <input type="email" name="email">
                    </label>
                    <label>Contraseña
                        <input type="password" name="contraseña">
                    </label>
                </section>
            </fieldset>
            <button>Registrarse</button>
        </form>
        <?php
         }
        ?>
        <form>
            <fieldset>
                <legend>Identificación</legend>
                <section>
                    <label>Email
                        <input type="email" name="email">
                    </label>
                    <label>Contraseña
                        <input type="password" name="contraseña">
                    </label>
                </section>
            </fieldset>
            <button>Identificarse</button>
        </form>
    </article>
    <section>
        <form>

        </form>
    </section>
</body>
<script>

</script>
</html>