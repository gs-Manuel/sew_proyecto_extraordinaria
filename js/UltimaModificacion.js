"use strict";
class UltimaModificacion{
    constructor() {
        this.contenedor = document.querySelector("footer");
        this.mostrarUltimaModificacion(this.contenedor);
    }
    mostrarUltimaModificacion(contenedor){
        let lastUpdated = new Date(document.lastModified);
        let formattedDate = lastUpdated.toLocaleDateString("es-ES");
        let formattedTime = lastUpdated.toLocaleTimeString("es-ES");
        let dateTimeString = " "+formattedDate + " a las " + formattedTime;
        let nuevoParrafo = document.querySelector("p");
        nuevoParrafo.textContent += dateTimeString;
        contenedor.appendChild(nuevoParrafo);
    }
}