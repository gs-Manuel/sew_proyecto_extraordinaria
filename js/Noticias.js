"use-strict"
class Noticias{
    constructor(){
        this.apiKey="ef0eac5b55c74c8a8ae28419042f9bcc";
        this.apiUrl = `https://newsapi.org/v2/everything?q=murcia&language=es&to=2024-05-10&sortBy=relevancy&apiKey=${apiKey}`;
        this.mostrarNoticias();
    }
    async mostrarNoticias(){
        const response = await fetch(this.apiUrl);
        const responseJSON = await response.json();

    }
}

