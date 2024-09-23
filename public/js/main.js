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
// carrusel 1 (slider1)
const slider1 = document.getElementById('slider1');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const cardWidth = slider1.querySelector('li').clientWidth; // Tamaño de una tarjeta (li) en el carrusel (slider1) en píxeles

prevBtn.addEventListener('click', () => {
    slider1.scrollBy({
        left: -cardWidth, // Desplazar hacia atrás
        behavior: 'smooth',
    });
});

nextBtn.addEventListener('click', () => {
    slider1.scrollBy({
        left: cardWidth, // Desplazar hacia adelante
        behavior: 'smooth',
    });
});

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
// Función para avanzar en el carrusel 2 (slider2) de 3 en 3 elementos (cards2) a la vez (siempre y cuando haya más elementos por mostrar)
function next2() {
    let marginLeft = +slider2.style.marginLeft.slice(0, -2) || 0;
    if (marginLeft !== -(cards2.length - elementsToShow2) * cardWidth2) {
        slider2.style.marginLeft = marginLeft - cardWidth2 + 'px';
    }
} /* 
// Mensajes de alerta con SweetAlert2 para el formulario de registro
document.addEventListener('DOMContentLoaded', function () {
    // Manejar el envío del formulario de registro
    document
        .getElementById('registerForm')
        .addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevenir el envío del formulario

            // Obtener los datos del formulario para enviarlos al servidor
            const formData = new FormData(this);

            try {
                // Enviar los datos del formulario al servidor
                const response = await fetch('http://localhost:4000/register', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: data.message,
                    }).then(() => {
                        // Cerrar el modal de registro
                        document
                            .getElementById('registerModal')
                            .classList.remove('show');

                        // Limpiar el formulario
                        document.getElementById('registerForm').reset();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el usuario.',
                });
            }
        });
}); */
