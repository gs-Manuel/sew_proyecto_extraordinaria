"use strict";
class Carrusel{
    constructor(buttonPrev,buttonNext,imageContainer) {
        this.buttonPrev=buttonPrev;
        this.buttonNext=buttonNext;
        this.imageContainer=imageContainer;
        this.currentIndex=0;
        this.addEventListeners(this);
        this.showImage(this);
    }
    //TODO: Como Hacer el carrusel para que se muevan las imagenes en funcion del boton
     showImage(carrusel) {
         const images = carrusel.imageContainer.querySelectorAll('img');
         const numImages = images.length;
        for(let i = 0;i<numImages;i++){
            if (i === carrusel.currentIndex) {
                images[i].setAttribute('data-state', 'active');
            } else {
                images[i].setAttribute('data-state', 'inactive');
            }
        }
    }
     nextImage() {
        this.currentIndex = (this.currentIndex + 1) % imageContainer.children.length;
        this.showImage(this);
    }

     prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.imageContainer.children.length) % this.imageContainer.children.length;
        this.showImage(this);
    }
    addEventListeners(carrusel){
        carrusel.buttonNext.addEventListener('click', this.nextImage.bind(carrusel));
        carrusel.buttonPrev.addEventListener('click', this.prevImage.bind(carrusel));
    }


}