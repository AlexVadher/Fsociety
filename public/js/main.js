document.addEventListener('DOMContentLoaded', function () {
    const botonesHabitaciones = document.querySelectorAll('.btnHabitaciones');

    botonesHabitaciones.forEach((boton) => {
        boton.addEventListener('click', async function () {
            const hotelId = this.getAttribute('data-hotel-id');
            const habitacionesTable = $('#habitacionesTable').DataTable();

            document
                .getElementById('habitacionesSection')
                .classList.remove('hidden');

            try {
                const response = await fetch(`/habitaciones/${hotelId}`);
                const data = await response.json();

                habitacionesTable.clear().draw();

                data.habitaciones.forEach((habitacion) => {
                    habitacionesTable.row
                        .add([
                            habitacion.codigo,
                            habitacion.tipo,
                            habitacion.costo,
                        ])
                        .draw(false);
                });

                // Agregar evento para los botones de editar
                document
                    .querySelectorAll('.btnEditHabitacion')
                    .forEach((editBtn) => {
                        editBtn.addEventListener('click', function () {
                            const habitacionId =
                                this.getAttribute('data-habitacion-id');
                            const codigo = this.getAttribute('data-codigo');
                            const tipo = this.getAttribute('data-tipo');
                            const costo = this.getAttribute('data-costo');

                            // Aquí puedes abrir el modal y llenar los campos
                            const modal = document.getElementById(
                                'modalEditHabitacion',
                            );
                            modal.querySelector('#codigo').value = codigo;
                            modal.querySelector('#tipo').value = tipo;
                            modal.querySelector('#costo').value = costo;

                            // Cambia la acción del formulario del modal para incluir el ID de la habitación
                            modal.querySelector(
                                'form',
                            ).action = `/updateHabitacion/${habitacionId}`;

                            // Mostrar el modal
                            modal.classList.remove('hidden');
                        });
                    });
            } catch (error) {
                console.error('Error al obtener las habitaciones:', error);
            }
        });
    });
});
