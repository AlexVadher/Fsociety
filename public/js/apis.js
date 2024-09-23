$(document).ready(function () {
    // URL de la API que devuelve los países
    const url = 'http://localhost:4000/countries';

    // Realizar una solicitud AJAX para obtener los países
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            // Ordenar los países alfabéticamente por nombre (de la A a la Z)
            data.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

            // Recorrer los países ordenados y agregarlos al select
            data.forEach(function (country) {
                // Establecer el nombre del país como valor de la opción
                $('#country-select').append(
                    `<option value="${country.name}">${country.name}</option>`,
                );
            });
        },
        error: function (err) {
            console.error('Error al obtener los países:', err);
        },
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
$('.slide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
});
