"use strict";
class UltimaModificacion{
    constructor(lastNoticias) {
        this.contenedor = document.querySelector("footer");
        if(lastNoticias===null || lastNoticias===undefined) {
            this.lastNoticiasApiCall = new Date(document.lastModified)-1000;
        }else{
            this.lastNoticiasApiCall = lastNoticias;
        }

        this.mostrarUltimaModificacion(this.contenedor);
    }
    mostrarUltimaModificacion(contenedor){
        let lastUpdated = new Date(document.lastModified);
        let ultimaMod = lastUpdated>this.lastNoticiasApiCall? lastUpdated:this.lastNoticiasApiCall;
        let formattedDate = ultimaMod.toLocaleDateString("es-ES");
        let formattedTime = ultimaMod.toLocaleTimeString("es-ES");
        let dateTimeString = " "+formattedDate + " a las " + formattedTime;
        let nuevoParrafo = contenedor.querySelector("p");
        nuevoParrafo.textContent += dateTimeString;
        contenedor.appendChild(nuevoParrafo);
    }
}