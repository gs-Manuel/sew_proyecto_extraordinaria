"use-strict"
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
            main.append(this.traducirKML(ruta));
            main.append(this.traducirSVG(ruta));
        })
    }
     traducirHTML(ruta) {
            let fechaInicio = new Date($(ruta).attr("fechaInicio"));
            let horaInicio= new Date($(ruta).attr("horaInicio"));
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
            rutaHTML += "<li>Fecha de Inicio: " + fechaInicio.toLocaleDateString() + "</li>";
            rutaHTML += "<li>Hora de Inicio: " + horaInicio.toLocaleTimeString() + "</li>";
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
            var hitos = $(ruta).find("hito");
            hitos.each((i,hito)=>{
                let distanciaEntreHitos=$(hito).find("distanciaEntreHitos").text();
                let nombreHito = $(hito).find("nombre").text();
                let descripcionHito = $(hito).find("descripcion").text();
                let coordenadasHito = {
                    latitud: $(hito).find("coordenadas latitud").text(),
                    longitud: $(hito).find("coordenadas longitud").text()
                };
                let galeriaFotografias=$(hito).find("galeria_fotografias");
                let sectionFotos ="<section>";
                galeriaFotografias.each((i,fotografia)=>{
                    if(galeriaFotografias.children().length===0)
                        return;
                    sectionFotos+="<li>";
                    let src=$(fotografia).find("enlace").text();
                    let alt="Fotografía de: "+nombreHito;
                    let img =`<img src="${src}" alt="${alt}"></img>`;
                    sectionFotos+=img;
                    sectionFotos+="</li>";
                })
                sectionFotos+="</section>";
                let sectionVideos ="<section>";
                let galeriaVideos=$(hito).find("galeria_videos");
                galeriaVideos.each((i,v)=>{
                    if(galeriaVideos.children().length===0)
                        return;
                    sectionVideos+="<li>";
                    let src=$(v).find("enlace").text();
                    let alt="Video de: "+nombreHito;
                    let video =`<video src="${src}" alt="${alt}"></video>`;
                    sectionVideos+=video;
                    sectionVideos+="</li>";
                })
                sectionVideos+="</section>";
                rutaHTML += "<h3>Hitos</h3>";
                rutaHTML += "<ul>";
                rutaHTML += "<li>Distancia entre hitos: " + distanciaEntreHitos + "</li>";
                rutaHTML += "<li>Nombre del hito: " + nombreHito + "</li>";
                rutaHTML += "<li>Descripción: " + descripcionHito + "</li>";
                rutaHTML += "<li>Coordenadas: Latitud: " + coordenadasHito.latitud + ", Longitud: " + coordenadasHito.longitud + "</li>";
                rutaHTML += "<li>Galería de fotografías" +"<ul>"+sectionFotos+"</ul>"+"</li>";
                rutaHTML += "<li>Galería de Videos" +"<ul>"+sectionVideos+"</ul>"+"</li>"
                rutaHTML += "</ul>";
            })
         rutaHTML += "</section>"
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
            strPath+=coordenadasLatitud[i]+","+coordenadasLongitud[i]+"|";
        }

        let section = document.createElement("section");
        let title=document.createElement("h3");
        title.textContent="Mapa de la ruta";

        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var tamaño= "&size=500x300";
        let idioma="&language=es"
        var marcadores = "&markers=color:red%7Clabel:S%7C" + strMarker;
        let path="&path=color:0xff00ff|weight:5|"+strPath;
        let imagenMapa = url + tamaño +idioma+ marcadores + path + apiKeyGoogleMaps;
        let imagen = document.createElement("img");
        imagen.src=imagenMapa;
        imagen.alt='Mapa estático google';
        section.appendChild(title);
        section.appendChild(imagen);

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
        svg+="Sorry, your browser does not support inline SVG."
        svg+="</svg>";
        containerSVG+=svg;
        containerSVG+="</section"
        return containerSVG;
    }
}