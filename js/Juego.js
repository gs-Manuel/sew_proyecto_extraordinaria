"use strict";
class Juego{
    constructor() {
        this.form = document.querySelector("form");
        this.puntuacion = 0;
        this.preguntas=[
            "¿Sobre qué ciudad está hecha la página web?",
            "¿Cuántas Secciones hay en la Página principal de este sitio Web?",
            "¿Cual de estas cocinas no tiene influencia en la gastronomía Murciana?",
            "¿Dónde se encuentra Murcia?",
            "¿Cuántos habitantes tiene Murcia?",
            "¿Cuál de los siguientes no es un plato típico de la gastronomía Murciana?",
            "¿Cuál de las siguientes bebidas no es típica en Murcia?",
            "¿En qué destaca la economía Murciana?",
            "¿Cuál de los siguientes lugares no está en Murcia?",
            "¿Cómo es el clima en Murcia?"
        ]
        this.respuestasCorrectas=[
            "Murcia",
            "4",
            "Cocina japonesa",
            "En el sureste de España",
            "450,000",
            "Fabada",
            "Café Cappuccino",
            "Agricultura",
            "Plaza Medellín",
            "Mediterraneo"

        ];
        this.respuestasIncorrectas=[
            ["Oviedo","Barcelona","Jaén","Mallorca"],
            ["1","6","3","2"],
            ["Cocina manchega"," Cocina granadina","Cocina valenciana","Cocina mediterránea","Cocina japonesa"],
            ["En el suroeste de España","En el noreste de España","En el noroeste de España","En el sur de Francia"],
            ["600,000","300,000","125,000","830,000"],
            ["Pisto","Michirones","Cabello de ángel","Torta de pascua"],
            ["Café Asiático","Café Belmonte","El Reparo","La Láguena"],
            ["Minería","Silvicultura","Caza","Pesca"],
            ["Museo Salzillo","Palacio Episcopal","Plaza de Santo Domingo","Jardín de Floridablanca"],
            ["Ecuatorial","Árido Cálido","Continental","Tundra"]
        ]
        this.numeroPreguntas = this.respuestasCorrectas.length;
        this.numeroRespuestas=5;
        this.rellenarForm();
        this.addEventListener();
    }
    rellenarForm() {
        for(let i = 0;i<this.numeroPreguntas;i++){
            let fieldset=document.createElement("fieldset");
            let legend=document.createElement("legend");
            legend.textContent=`Pregunta ${i+1} :${this.preguntas[i]}`
            fieldset.appendChild(legend);
            let arrayPregunta = [];
            arrayPregunta.push(this.respuestasCorrectas[i]);
            this.respuestasIncorrectas[i].forEach(element=>{
                arrayPregunta.push(element);
            })
            arrayPregunta.sort(() => Math.random() - 0.5);
            for(let j=0;j<this.numeroRespuestas;j++){
                let label = document.createElement("label");
                label.textContent=arrayPregunta[j];
                let input=document.createElement("input");
                input.type="radio";
                input.name=`p${i+1}`;
                input.value=arrayPregunta[j];
                label.appendChild(input);
                fieldset.appendChild(label);
            }
            this.form.appendChild(fieldset);
        }
        let button = document.createElement("button");
        button.textContent="Enviar";
        this.form.appendChild(button);
    }
    addEventListener() {
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }
    onSubmit(event) {
        event.preventDefault();
        const inputs = this.obtenerRespuestas();
        if (inputs.some(input => !input)) {
            alert(`Debe contestar a todas las preguntas`)
            return;
        }
        this.comprobarRespuestas(inputs);
        alert(`Su puntuación ha sido de: ${this.puntuacion}`)
        this.reset();
    }
    obtenerRespuestas() {
        const inputs = [];
        for (let i = 1; i <= this.numeroPreguntas; i++) {
            inputs.push(this.form.querySelector(`input[name=p${i}]:checked`))
        }
        return inputs;
    }
    comprobarRespuestas(inputs){
        for(let i =0;i<this.numeroPreguntas;i++){
            if(inputs[i].value===this.respuestasCorrectas[i]){
                this.puntuacion++;
            }
        }
    }
    reset() {
        this.puntuacion = 0;
    }
}
