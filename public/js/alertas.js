// Función reutilizable para manejar el envío de formularios
// Función reutilizable para manejar el envío de formularios
// Función reutilizable para manejar el envío de formularios
async function handleFormSubmit(formId, url) {
    document
        .getElementById(formId)
        .addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevenir el envío del formulario

            const formData = new FormData(this);

            // Convertir FormData a JSON para enviarlo si el backend espera JSON
            const plainFormData = Object.fromEntries(formData.entries());
            const formDataJson = JSON.stringify(plainFormData);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Asegurarse de enviar JSON
                    },
                    body: formDataJson, // Enviar los datos como JSON
                });

                const data = await response.json();

                if (data.success) {
                    // Mostrar una alerta de éxito
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: data.message,
                    });
                } else {
                    // Mostrar una alerta de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                }
            } catch (error) {
                // Mostrar una alerta de error en caso de que haya problemas con la solicitud
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar los datos.',
                });
                console.error('Error en la solicitud:', error);
            }
        });
}

async function handleFormAuth(formId, url) {
    document
        .getElementById(formId)
        .addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevenir el envío del formulario

            const formData = new FormData(this);

            // Convertir FormData a JSON para enviarlo si el backend espera JSON
            const plainFormData = Object.fromEntries(formData.entries());
            const formDataJson = JSON.stringify(plainFormData);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Asegurarse de enviar JSON
                    },
                    body: formDataJson, // Enviar los datos como JSON
                });

                const data = await response.json();

                if (data.success) {
                    // Redireccionar a la página de inicio
                    window.location.href = data.redirectUrl;
                } else {
                    // Mostrar una alerta de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                }
            } catch (error) {
                // Mostrar una alerta de error en caso de que haya problemas con la solicitud
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar los datos.',
                });
                console.error('Error en la solicitud:', error);
            }
        });
}
// Ejecutar la función cuando el DOM esté completamente cargado para enviar formularios
document.addEventListener('DOMContentLoaded', function () {
    // Manejar el envío del formulario de actividades
    handleFormSubmit('activitiesForm', 'http://localhost:4000/activities');
    // Manejar el envío del formulario de registro
    handleFormSubmit('registerForm', 'http://localhost:4000/register');
    // Manejar el envío del formulario de inicio de sesión
    handleFormAuth('loginForm', 'http://localhost:4000/login');
});

// Función reutilizable para manejar la eliminación de elementos
async function handleDeleteElement(deleteLinks) {
    deleteLinks.forEach((link) => {
        link.addEventListener('click', async function (event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

            const url = this.href; // Obtener la URL del enlace
            const confirmation = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmation.isConfirmed) {
                try {
                    const response = await fetch(url, {method: 'GET'});
                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Éxito!',
                            text: data.message,
                        }).then(() => {
                            // Recargar la página para reflejar los cambios
                            location.reload();
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
                        text: 'Hubo un problema al eliminar el elemento.',
                    });
                }
            }
        });
    });
}
// Ejecutar la función cuando el DOM esté completamente cargado para eliminar elementos
document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los enlaces de eliminación para las actividades
    const deleteLinks = document.querySelectorAll(
        'a[href^="/admin/deleteActivity/"]',
    );
    // Obtener todos los enlaces de eliminación para los hoteles
    handleDeleteElement(deleteLinks);
});
