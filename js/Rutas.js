"use-strict"
class Rutas{
    constructor(rutasData) {
        this.rutasXML = rutasData;
    }
    traducirHTML() {
        const rutas = $(this.rutasXML).find("ruta");
        $.each(rutas, function (i, ruta) {
            console.log(ruta);
            let fechaInicio = new Date($(ruta).find("fechaInicio"));
            let horaInicio= new Date($(ruta).find("horaInicio"));
            var nombreRuta = $(ruta).find("nombre").first().text();
            var tipoRuta = $(ruta).find("tipoRuta").text();
            var medioTransporte = $(ruta).find("medioTransporte").text();
            var duracionRuta = $(ruta).find("duracionRuta").text();
            var agencia = $(ruta).find("agencia").text();
            var descripcion = $(ruta).find("descripcion").text();
            var personasAdecuadas = $(ruta).find("personasAdecuadas").text();
            var lugarInicio = $(ruta).find("lugarInicio").text();
            var direccionInicio = $(ruta).find("direccionInicio").text();
            var coordenadasInicio = {
                latitud: $(ruta).find("coordenadasDireccionInicio coordenadas latitud").text(),
                longitud: $(ruta).find("coordenadasDireccionInicio coordenadas longitud").text()
            };
            var recomendacion = $(ruta).find("recomendacion").text();

            var rutaHTML = "<section >";
            rutaHTML += "<h2>" + nombreRuta + "</h2>";
            rutaHTML += "<ul>";
            rutaHTML += "<li>Tipo de ruta: " + tipoRuta + "</li>";
            rutaHTML += "<li>Medio de transporte: " + medioTransporte + "</li>";
            rutaHTML += "<li>Duración: " + duracionRuta + "</li>";
            rutaHTML += "<li>Agencia: " + agencia + "</li>";
            rutaHTML += "<li>Descripción: " + descripcion + "</li>";
            rutaHTML += "<li>Personas adecuadas: " + personasAdecuadas + "</li>";
            rutaHTML += "<li>Lugar de inicio: " + lugarInicio + "</li>";
            rutaHTML += "<li>Dirección de inicio: " + direccionInicio + "</li>";
            rutaHTML += "<li>Coordenadas: Latitud: " + coordenadasInicio.latitud + ", Longitud: " + coordenadasInicio.longitud + "</li>";
            rutaHTML += "<li>Recomendación: " + recomendacion + " (1-10)</li>";
            rutaHTML += "</ul>";


            // Procesar hitos (si existen)
            var hitos = $(ruta).find("hito");
            hitos.forEach(hito=>{
                let distanciaEntreHitos=$(hito).find("distanciaEntreHitos").text();
                let nombreHito = $(hito).find("nombre").text();
                let descripcionHito = $(hito).find("descripcion").text();
                let coordenadasHito = {
                    latitud: $(hito).find("coordenadas latitud").text(),
                    longitud: $(hito).find("coordenadas longitud").text()
                };
                let galeriaFotografias=$(hito).find("galeria_fotografias");
                galeriaFotografias.forEach((fotografia, section)=>{
                    let img = document.createElement("img");
                    img.src=$(fotografia).find("enlace").text();
                    $(section).append(img)
                })
                let galeriaVideos=$(hito).find("galeria_videos");
                galeriaVideos.forEach((v, section)=>{
                    let video = document.createElement("video");
                    video.src=$(v).find("enlace").text();
                    $(section).append(video)
                })
                rutaHTML += "<h3>Hitos</h3>";
                rutaHTML += "<ul>";
            })

            const main = $("main");
            main.append(rutaHTML);
        });
    }
    traducirKML(){

    }
    traducirSVG(){

    }
}