"use strict";
class Noticias{
    constructor(){
        this.date= new Date(Date.now())
        this.apiKey= "ef0eac5b55c74c8a8ae28419042f9bcc";
        this.apiUrl = `https://newsapi.org/v2/everything?q=murcia&language=es&to=${this.date.toLocaleDateString()}&sortBy=relevancy&apiKey=${this.apiKey}`;
        this.last_api_call  = null;
        this.last_api_result = null;
    }
    async obtenerNoticias(){
        if (this.last_api_call === null || this.last_api_call + (60 * 60 * 1000) < Date.now()) {//una llamada cada hora
            const response = await fetch(this.apiUrl);
            const responseJSON = await response.json();
            this.last_api_call =new Date(Date.now());
            this.last_api_result=responseJSON;
            this.mostrarNoticias(responseJSON)
            return this;
        }else {
            this.mostrarNoticias(this.last_api_result);
            return this;
        }
    }
    mostrarNoticias(data){
        const contenedorNoticias = document.querySelector("article:last-of-type")
        let lastApiCallHeader = document.createElement("header")
        let lastApiCall = document.createElement("p");
        lastApiCall.textContent+="La última vez que se cargaron noticias fue: "+this.last_api_call.toLocaleString();
        lastApiCallHeader.appendChild(lastApiCall);
        contenedorNoticias.appendChild(lastApiCallHeader);
        for (let i = 0; i < 4; i++) {
            let section = document.createElement("section")
            let title = document.createElement("h3")
            let image = document.createElement("img")
            let description = document.createElement("p")
            let link = document.createElement("a")
            title.textContent=data.articles[i].title;
            image.src=data.articles[i].urlToImage;
            image.alt="Imagen de "+data.articles[i].author;
            description.textContent=data.articles[i].description;
            link.href=data.articles[i].url;
            link.textContent=data.articles[i].source.name;
            section.appendChild(title)
            section.appendChild(image)
            section.appendChild(description)
            section.appendChild(link)
            contenedorNoticias.appendChild(section)
        }
    }
}

