"use-strict"
class Metereologia{
    constructor() {
        this.contenedor=document.querySelector("article");
        this.last_api_call  = null;
        this.last_api_result = null;
        this.obtenerPrevisionTiempo();
    }
    obtenerPrevisionTiempo() {
        if (this.last_api_call === null || this.last_api_call + (2 * 60 * 60 * 1000) < Date.now()) {//una llamada cada 2 horas
            this.last_api_call = Date.now();
            const apiKey = "af570203c4f84141406f2b72dc283547";
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${37.986111}&lon=${-1.130278}&units=metric&appid=${apiKey}`;
            $.getJSON({
                url: apiUrl,
                method: 'GET',
                success: data => {
                    this.last_api_result = data;
                    this.imprimirPrevisionTiempo(data);
                },
                error: error => {
                    console.error(error);
                }
            });
        }else {
                this.imprimirPrevisionTiempo(this.last_api_result);
            }
    }
    imprimirPrevisionTiempo(data){
        let minTempDay = Number.POSITIVE_INFINITY;
        let maxTempDay = -100000;
        data.list.forEach(element => {
            minTempDay = element.main.temp_min < minTempDay ? element.main.temp_min : minTempDay;
            maxTempDay = element.main.temp_max > maxTempDay ? element.main.temp_max : maxTempDay;
            if(element.dt_txt.includes("18:00:00")){ //Si es la hora de las 15:00
                const section = document.createElement("section")
                const title = document.createElement("h4")
                title.textContent=element.main.temp+" °C";
                const p1 =document.createElement("p");
                p1.textContent="Temperatura mínima: "+minTempDay+" °C";
                const p2 =document.createElement("p");
                p2.textContent="Temperatura máxima: "+maxTempDay+" °C";
                const p3 =document.createElement("p");
                p3.textContent="Presión: "+element.main.pressure+" °C";
                const p4 =document.createElement("p");
                p4.textContent="Humedad: "+element.main.humidity+" %";
                const iconUrl = document.createElement("img");
                iconUrl.src=`https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
                iconUrl.alt="Icono del tiempo";
                section.append(title)
                section.append(p1)
                section.append(p2)
                section.append(p3)
                section.append(p4)
                section.append(iconUrl);
                $("article").append(section);
                minTempDay = Number.POSITIVE_INFINITY;
                maxTempDay = -100000;
            }
        });
    }
}