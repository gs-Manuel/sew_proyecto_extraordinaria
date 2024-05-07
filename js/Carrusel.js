"use strict";
class Carrusel{
    constructor() {
        this.buttonPrev=document.querySelector("article>section>button:first-of-type");
        this.buttonNext=document.querySelector("article>section>button:last-of-type");
        this.imageContainer=document.querySelector("article>section");
        this.currentIndex=0;
        this.addEventListeners(this);
        this.showImage(this);
    }
     showImage(carrusel) {
        debugger;
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
         const images = this.imageContainer.querySelectorAll('img');
        this.currentIndex = (this.currentIndex + 1) % images.length;
        this.showImage(this);
    }

     prevImage() {
         const images = this.imageContainer.querySelectorAll('img');
        this.currentIndex = (this.currentIndex - 1 + images.length) % images.length;
        this.showImage(this);
    }
    addEventListeners(carrusel){
        carrusel.buttonNext.addEventListener('click', this.nextImage.bind(carrusel));
        carrusel.buttonPrev.addEventListener('click', this.prevImage.bind(carrusel));
    }


}