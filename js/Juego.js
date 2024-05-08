"user-strict"
class Juego{
    constructor() {
        this.form=document.querySelector("form");
        this.puntuacion=0;
        this.addEventListener();
    }
    addEventListener() {
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    onSubmit(event) {
        event.preventDefault();

        const inputSeleccionado = this.form.querySelector('input[name="p1"]:checked');

        if (inputSeleccionado) {
            const valorSeleccionado = inputSeleccionado.value;
            console.log(`El usuario seleccionó la opción: ${valorSeleccionado}`);
        } else {
            console.log('No se ha seleccionado ninguna opción');
        }
    }
}
