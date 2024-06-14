"use strict";
class Rutas{
    constructor(rutasData) {
        this.rutasXML = rutasData;
        this.mostrarTodo();
    }
    mostrarTodo(){
        const rutas = $(this.rutasXML).find("ruta");
        const main = $("main");
        $.each(rutas, (i, ruta) => {
            main.append(this.traducirHTML(ruta));
        })
    }
     traducirHTML(ruta) {
        let fechaInicio = new Date($(ruta).attr("fechaInicio"));
        let horaInicio= new Date($(ruta).attr("horaInicio"));
         let nombreRuta = $(ruta).find("nombre").first().text();
         let tipoRuta = $(ruta).find("tipoRuta").text();
         let medioTransporte = $(ruta).find("medioTransporte").text();
         let duracionRuta = $(ruta).find("duracionRuta").text();
         let agencia = $(ruta).find("agencia").text();
         let descripcion = $(ruta).find("descripcion").text();
         let personasAdecuadas = $(ruta).find("personasAdecuadas").text();
         let lugarInicio = $(ruta).find("lugarInicio").text();
         let direccionInicio = $(ruta).find("direccionInicio").text();
         let coordenadasInicio = {
                latitud: $(ruta).find("coordenadasDireccionInicio coordenadas latitud").text(),
                longitud: $(ruta).find("coordenadasDireccionInicio coordenadas longitud").text()
            };
         let recomendacion = $(ruta).find("recomendacion").text();

         let rutaHTML = "<article>";
            rutaHTML += "<header>";
            rutaHTML += "<h3>" + nombreRuta + "</h3>";
            rutaHTML += "<p>Fecha de Inicio: " + fechaInicio.toLocaleDateString() + "</p>";
            rutaHTML += "<p>Hora de Inicio: " + horaInicio.toLocaleTimeString() + "</p>";
            rutaHTML += "</header>";
             rutaHTML += "<ul>";
            rutaHTML += "<li>Tipo de ruta: " + tipoRuta + "</li>";
            rutaHTML += "<li>Medio de transporte: " + medioTransporte + "</li>";
            rutaHTML += "<li>Duración: " + duracionRuta + "</li>";
            rutaHTML += "<li>Agencia: " + agencia + "</li>";
            rutaHTML += "<li>Descripción: " + descripcion + "</li>";
            rutaHTML += "<li>Personas adecuadas: " + personasAdecuadas + "</li>";
            rutaHTML += "<li>Lugar de inicio: " + lugarInicio + "</li>";
            rutaHTML += "<li>Dirección de inicio: " + direccionInicio + "</li>";
             rutaHTML += "</ul>";
         rutaHTML += "<section>"
         rutaHTML += "<h4>Hitos de la ruta</h4>";
         let hitos = $(ruta).find("hito");
            hitos.each((i,hito)=>{
                let distanciaEntreHitos=$(hito).attr("distanciaEntreHitos");
                let nombreHito = $(hito).find("nombre").text();
                let descripcionHito = $(hito).find("descripcion").text();
                let coordenadasHito = {
                    latitud: $(hito).find("coordenadas latitud").text(),
                    longitud: $(hito).find("coordenadas longitud").text()
                };
                let galeriaFotografias=$(hito).find("galeria_fotografias");
                rutaHTML += "<section>"
                rutaHTML += `<h5> ${nombreHito} </h5>`;
                rutaHTML += "<ul>";
                rutaHTML += "<li>Distancia entre hitos: " + distanciaEntreHitos + "</li>";
                rutaHTML += "<li>Descripción: " + descripcionHito + "</li>";
                rutaHTML += "<li>Coordenadas: Latitud: " + coordenadasHito.latitud + ", Longitud: " + coordenadasHito.longitud + "</li>";
                rutaHTML += "</ul>";
                if (galeriaFotografias.children().length > 0) {
                    let sectionFotos = "<section>";
                    sectionFotos += "<h6>Galería de Fotografías</h6>";
                    galeriaFotografias.children().each((i, fotografia) => {
                        let src = $(fotografia).find("enlace").text();
                        let alt = "Fotografía de: " + nombreHito;
                        let img = `<img src="${src}" alt="${alt}" />`;
                        sectionFotos += img;
                    });
                    sectionFotos += "</section>";
                    rutaHTML += sectionFotos;
                }
                let galeriaVideos=$(hito).find("galeria_videos");
                if (galeriaVideos.children().length > 0) {
                    let sectionVideos = "<section>";
                    sectionVideos += "<h6>Galería de Vídeos</h6>";
                    galeriaVideos.children().each((i, v) => {
                        let src = $(v).find("enlace").text();
                        let video = `<video src="${src}"></video>`;
                        sectionVideos += video;
                    });
                    sectionVideos += "</section>";
                    rutaHTML += sectionVideos;
                }
                rutaHTML += "</section>"
            })
         rutaHTML += "</section>"
         rutaHTML += this.traducirKML(ruta);
         rutaHTML += this.traducirSVG(ruta);
         rutaHTML += "<footer>";
         rutaHTML += "<p>Coordenadas de inicio: Latitud: " + coordenadasInicio.latitud + ", Longitud: " + coordenadasInicio.longitud + "</p>";
         rutaHTML += "<p>Recomendación de la ruta: " + recomendacion + " (1-10)</p>";
         rutaHTML += "</footer>";
         rutaHTML += "</article>"
        return rutaHTML;
    }
    traducirKML(ruta){
        let coordenadasLatitud =[];
        let coordenadasLongitud=[];
        const apiKeyGoogleMaps = "&key=AIzaSyDNPnDPlm8m8ot24z5jQ0gWSKYoqCb1ego";
        coordenadasLatitud.push($(ruta).find("coordenadasDireccionInicio coordenadas latitud").text());
        coordenadasLongitud.push($(ruta).find("coordenadasDireccionInicio coordenadas longitud").text());
        let hitos = $(ruta).find("hito");
        hitos.each((i,hito)=>{
            coordenadasLatitud.push($(hito).find("coordenadas latitud").text())
            coordenadasLongitud.push($(hito).find("coordenadas longitud").text())
        })
        let strMarker = "";
        let strPath = "";
        for(let i = 0;i<coordenadasLongitud.length;i++){
            if(i===coordenadasLongitud.length-1){
                strMarker+=coordenadasLatitud[i]+","+coordenadasLongitud[i];
                strPath+=coordenadasLatitud[i]+","+coordenadasLongitud[i];
                break;
            }
            strMarker+=coordenadasLatitud[i]+","+coordenadasLongitud[i]+"%7C";
            strPath+=coordenadasLatitud[i]+","+coordenadasLongitud[i]+"%7C";
        }
        let section ="<section>";
        let title="<h3> Mapa de la ruta </h3>";
        let url = "https://maps.googleapis.com/maps/api/staticmap?";
        let tam= "&size=500x300";
        let idioma="&language=es"
        let marcadores = "&markers=color:red%7Clabel:S%7C" + strMarker;
        let path="&path=color:0xff00ff%7Cweight:5%7C"+strPath;
        let imagenMapa = url + tam +idioma+ marcadores + path + apiKeyGoogleMaps;
        let imagen = `<img src="${imagenMapa}" alt="Mapa estático google" />`;
        section+=title;
        section+=imagen;
        section+="</section>"
        return section;
    }
    traducirSVG(ruta){
        const maximoX = 360;
        const maximoY = 180;
        let coordenadasAltura =[`${maximoY}`];
        coordenadasAltura.push($(ruta).find("coordenadasDireccionInicio coordenadas altitud").text());
        let hitos = $(ruta).find("hito");
        hitos.each((i,hito)=>{
            coordenadasAltura.push($(hito).find("coordenadas altitud").text())
        })
        coordenadasAltura.push(`${maximoY}`);
        const partitionX = maximoX/coordenadasAltura.length;
        const points = [];
        let offset = 0;
        for(let i = 0;i<coordenadasAltura.length;i++){
            points.push(`${offset},${coordenadasAltura[i]}`)
            offset+=partitionX;
        }
        let str="";
        for(let i =0;i<points.length;i++){
            str+=points[i]+" ";
        }
        let containerSVG ="<section>"
        containerSVG+="<h3>Altimetría de la ruta</h3>"
        let svg=`<svg height="${maximoY}" width="${maximoX}" xmlns=\"http://www.w3.org/2000/svg\">`;
        svg+= `<polygon points="${str}"/>`
        svg+="</svg>";
        containerSVG+=svg;
        containerSVG+="</section>"
        return containerSVG;
    }
}