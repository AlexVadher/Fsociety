let map;
let mapa;
let marker;
let geocoder;

// inicialización del mapa de google maps
function initMap() {
    // configuración del mapa de google maps con la ubicación de Quito
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 4.573907125527651, lng: -74.24376995418791},
        zoom: 15,
        mapTypeControl: false, // control de tipo de mapa
        streetViewControl: false, // control de Street View (Pegman)
    });

    // marcador para la ubicación en el mapa
    marker = new google.maps.Marker({
        map: map,
    });

    // Agrega un evento de clic al mapa para agregar un marcador en el mapa
    map.addListener('click', (event) => {
        if (marker) {
            marker.setMap(null); // Elimina el marcador anterior si existe
        }
        // Agrega un nuevo marcador en el mapa en la posición donde se hizo clic
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            draggable: true, // Permite mover el marcador
        });

        // Actualiza las coordenadas en algún campo de tu formulario con las coordenadas del marcador
        const lat = event.latLng.lat();
        const long = event.latLng.lng();
        document.getElementById('ubicacion').value = `${lat}, ${long}`;
    });

    // evento de arrastrar el marcador  en el mapa de google maps
    marker.addListener('click', toggleBounce);
    geocoder = new google.maps.Geocoder();
}

// animación de marcador en el mapa
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
// busqueda de dirección en el mapa
function searchAddress() {
    const address = document.getElementById('busqueda').value;
    geocoder.geocode({address: address}, (results, status) => {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location); // Centra el mapa en la dirección buscada
            marker.setPosition(results[0].geometry.location); // Coloca un marcador en la dirección buscada

            // Actualiza el campo de dirección con la dirección buscada
            const busquedadireccion = address;
            document.getElementById('Direccion').value = busquedadireccion; // Actualiza la dirección en el campo de dirección con la dirección buscada
            // Actualiza las coordenadas en el campo de ubicación con las coordenadas de la dirección
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            document.getElementById('ubicacion').value = `${lat}, ${lng}`;
        } else {
            alert(
                'Geocode was not successful for the following reason: ' +
                    status,
            );
        }
    });
}

// función para mostrar y ocultar el menú de navegación
function toggleMenu() {
    const navbarNav = document.getElementById('navbarNav');
    navbarNav.classList.toggle('hidden');
}

// Función para usar la api de listar paises en el select
$(document).ready(function () {
    // URL de la API que devuelve los países
    const url = 'http://localhost:4000/countries';

    // Realizar una solicitud fetch para obtener los países
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener los países');
            }
            return response.json();
        })
        .then((data) => {
            // Ordenar los países alfabéticamente por nombre (de la A a la Z)
            data.sort((a, b) => a.name.localeCompare(b.name));

            // Recorrer los países ordenados y agregarlos al select
            data.forEach((country) => {
                // Establecer el nombre del país como valor de la opción
                $('#country-select').append(
                    `<option value="${country.name}">${country.name}</option>`,
                );
            });
        })
        .catch((err) => {
            console.error('Error al obtener los países:', err);
        });
});
// dataTable para las tablas en los diferentes módulos
$(document).ready(function () {
    $('#example').DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        pageLength: 5, // Número de filas por página (5 por defecto)
        lengthChange: true,
        lengthMenu: [5, 10, 25, 50, 75, 100], // Número de filas por página
        language: {
            decimal: '',
            emptyTable: 'No hay datos disponibles en la tabla',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
            infoEmpty: 'Mostrando 0 a 0 de 0 entradas',
            infoFiltered: '(filtrado de _MAX_ entradas totales)',
            infoPostFix: '',
            thousands: '.',
            lengthMenu: 'Mostrar _MENU_ entradas',
            loadingRecords: 'Cargando...',
            processing: 'Procesando...',
            search: 'Buscar:',
            zeroRecords: 'No se encontraron coincidencias',
            paginate: {
                first: 'Primero',
                last: 'Último',
                next: 'Siguiente',
                previous: 'Anterior',
            },
            aria: {
                orderable: 'Ordenar por esta columna',
                orderableReverse: 'Invertir el orden de esta columna',
            },
        },
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
// Api de Slick para el carrusel
$('.carro').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4, // Número de elementos a mostrar
    slidesToScroll: 1, // Número de elementos a desplazar
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ],
});
// slide principal del index
$('.slide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
});
// slide de detalles
$(document).ready(function () {
    // Slider principal
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
    });

    // Navegación por thumbnails
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
    });
});
