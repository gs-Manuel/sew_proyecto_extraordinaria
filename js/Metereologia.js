"use-strict"
class Metereologia{
    constructor() {
        this.last_api_call  = null;
        this.last_api_result = null;
    }
    obtenerTiempoActual(){
        if (this.last_api_call === null || this.last_api_call + (14 * 60 * 1000) < Date.now()) {//una llamada cada 14 minutos
            this.last_api_call = Date.now();
            const apiKey = "af570203c4f84141406f2b72dc283547";
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${37.986111}&lon=${-1.130278}&appid=${apiKey}&units=metric&lang=es`;
            $.getJSON({
                url: apiUrl,
                method: 'GET',
                success: data => {
                    this.last_api_result = data;
                    this.imprimirTiempoActual(data);
                },
                error: error => {
                    console.error(error);
                }
            });
        }else {
            this.imprimirTiempoActual(this.last_api_result);
        }
    }
    imprimirTiempoActual(data){
        const section = document.createElement("section")
        const title = document.createElement("h4")
        const p1 =document.createElement("p");
        const p2 =document.createElement("p");
        const p3 =document.createElement("p");
        const iconUrl = document.createElement("img");

        const element = data.list[0];
        const time = new Date(element.dt*1000);

        title.textContent=time.toLocaleTimeString('es');
        p1.textContent="Temperatura: "+ element.main.temp+" °C";
        p2.textContent="Presión: "+element.main.pressure+" hPa";
        p3.textContent="Humedad: "+element.main.humidity+" %";
        iconUrl.src=`https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
        iconUrl.alt="Icono del tiempo";
        section.append(title)
        section.append(p1)
        section.append(p2)
        section.append(p3)
        section.append(iconUrl);
        $("article:nth-of-type(2)").append(section);
    }
    obtenerPrevisionTiempo() {
        if (this.last_api_call === null || this.last_api_call + (14 * 60 * 1000) < Date.now()) {//una llamada cada 14 minutos
            this.last_api_call = Date.now();
            const apiKey = "af570203c4f84141406f2b72dc283547";
            const apiUrl3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${37.986111}&lon=${-1.130278}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric&lang=es`;
            $.getJSON({
                url: apiUrl3,
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
        for(let i = 0;i<7;i++){
            const element = data.daily[i];
            const section = document.createElement("section")
            const title = document.createElement("h4")
            const time = new Date(element.dt*1000);
            title.textContent=time.toLocaleDateString('es');
            const p1 =document.createElement("p");
            p1.textContent="Temperatura promedio: "+element.temp.day+" °C";
            const p2 =document.createElement("p");
            p2.textContent="Temperatura mínima: "+element.temp.min+" °C";
            const p3 =document.createElement("p");
            p3.textContent="Temperatura máxima: "+element.temp.max+" °C";
            const p4 =document.createElement("p");
            p4.textContent="Tiempo: "+element.weather[0].description;
            const p5 =document.createElement("p");
            p5.textContent="Humedad: "+element.humidity+" %";
            const iconUrl = document.createElement("img");
            iconUrl.src=`https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
            iconUrl.alt="Icono del tiempo";
            section.append(title)
            section.append(p1)
            section.append(p2)
            section.append(p3)
            section.append(p4)
            section.append(p5)
            section.append(iconUrl);
            $("article").append(section);
        }
    }
}