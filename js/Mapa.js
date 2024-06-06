"use strict";
class Mapa{
    constructor (){
        this.apiKeyGoogleMaps = "&key=AIzaSyDNPnDPlm8m8ot24z5jQ0gWSKYoqCb1ego";
        this.longitud         = -1.130278;
        this.latitud          = 37.986111;
        this.getMapaEstaticoGoogle();
    }
    getMapaEstaticoGoogle(){
        let ubicacion=document.querySelector("article:nth-of-type(3)");
        let url = "https://maps.googleapis.com/maps/api/staticmap?";
        let centro = "center=" + this.latitud + "," + this.longitud;
        let zoom ="&zoom=15";
        let tam= "&size=800x600";
        let idioma="&language=es"
        let marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        let sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + tam +idioma+ marcador + sensor + this.apiKeyGoogleMaps;
        let imagen = document.createElement("img");
        imagen.src=this.imagenMapa;
        imagen.alt='Mapa estático google';
        ubicacion.appendChild(imagen);
    }
}
