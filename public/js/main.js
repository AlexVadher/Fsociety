function toggleMenu() {
    const menu = document.getElementById('navbarNav');
    menu.classList.toggle('hidden');
}

// Inicializar Alpine.js con la imagen actual
function imageUpload(initialUrl) {
    return {
        modal: false,
        previewUrl: initialUrl,
        fileName: '',

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.fileName = file.name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
    };
}

// Carrusel 1
let slider1 = document.getElementById('slider1');
let sliderContainer1 = document.getElementById('sliderContainer1');
let cards1 = slider1.getElementsByTagName('li');

let elementsToShow1 = 3;
if (document.body.clientWidth < 1000) {
    elementsToShow1 = 2;
} else if (document.body.clientWidth < 1500) {
    elementsToShow1 = 3;
}

let sliderContainerWidth1 = sliderContainer1.clientWidth;
let cardWidth1 = sliderContainerWidth1 / elementsToShow1;

slider1.style.width = cards1.length * cardWidth1 + 'px';
slider1.style.transition = 'margin';
slider1.style.transitionDuration = '1s';

for (let i = 0; i < cards1.length; i++) {
    cards1[i].style.width = cardWidth1 + 'px';
}

function prev1() {
    let marginLeft = +slider1.style.marginLeft.slice(0, -2) || 0;
    if (marginLeft !== 0) {
        slider1.style.marginLeft = marginLeft + cardWidth1 + 'px';
    }
}

function next1() {
    let marginLeft = +slider1.style.marginLeft.slice(0, -2) || 0;
    if (marginLeft !== -(cards1.length - elementsToShow1) * cardWidth1) {
        slider1.style.marginLeft = marginLeft - cardWidth1 + 'px';
    }
}

// Carrusel 2
let slider2 = document.getElementById('slider2');
let sliderContainer2 = document.getElementById('sliderContainer2');
let cards2 = slider2.getElementsByTagName('li');

let elementsToShow2 = 3;
if (document.body.clientWidth < 1000) {
    elementsToShow2 = 2;
} else if (document.body.clientWidth < 1500) {
    elementsToShow2 = 3;
}

let sliderContainerWidth2 = sliderContainer2.clientWidth;
let cardWidth2 = sliderContainerWidth2 / elementsToShow2;

slider2.style.width = cards2.length * cardWidth2 + 'px';
slider2.style.transition = 'margin';
slider2.style.transitionDuration = '1s';

for (let i = 0; i < cards2.length; i++) {
    cards2[i].style.width = cardWidth2 + 'px';
}

function prev2() {
    let marginLeft = +slider2.style.marginLeft.slice(0, -2) || 0;
    if (marginLeft !== 0) {
        slider2.style.marginLeft = marginLeft + cardWidth2 + 'px';
    }
}

function next2() {
    let marginLeft = +slider2.style.marginLeft.slice(0, -2) || 0;
    if (marginLeft !== -(cards2.length - elementsToShow2) * cardWidth2) {
        slider2.style.marginLeft = marginLeft - cardWidth2 + 'px';
    }
}

// mantener iniciado alpine.js

$(document).ready(function () {
    $('#example').DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 5, // Número de filas por página (5 por defecto)
        lengthChange: true,
        preDrawCallback: function (settings) {
            // Código para ejecutar antes de que la tabla se dibuje
            Alpine.initTree(document.body);
        },
        drawCallback: function () {
            // Código para ejecutar después de que la tabla se dibuje
            Alpine.initTree(document.body);
        },
    });
});
