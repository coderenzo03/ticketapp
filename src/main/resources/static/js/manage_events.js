document.addEventListener("DOMContentLoaded", function() {
    // Simulamos una lista de eventos (esto debería venir de la base de datos)
    const events = [
        { id: 1, title: "Concierto de Rock", date: "2025-07-15", location: "Estadio Nacional, Lima" },
        { id: 2, title: "Festival de Jazz", date: "2025-08-10", location: "Parque Kennedy, Miraflores" }
    ];

    // Función para cargar los eventos en la tabla
    function loadEvents() {
        const tableBody = document.getElementById("eventsTable");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar los nuevos datos

        events.forEach(event => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${event.title}</td>
                <td>${event.date}</td>
                <td>${event.location}</td>
                <td>
                    <button class="btn btn-warning" onclick="editEvent(${event.id})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Función para agregar un nuevo evento
    const addEventForm = document.getElementById("addEventForm");
    addEventForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newEvent = {
            id: events.length + 1,
            title: document.getElementById("eventTitle").value,
            date: document.getElementById("eventDate").value,
            location: document.getElementById("eventLocation").value
        };

        events.push(newEvent); // Agregar el evento a la lista
        loadEvents(); // Recargar la lista de eventos

        // Cerrar el modal
        const addEventModal = new bootstrap.Modal(document.getElementById('addEventModal'));
        addEventModal.hide();
    });

    // Función para editar un evento (aquí solo simula editar)
    window.editEvent = function(id) {
        alert("Editar evento con ID: " + id);
        // Aquí podrías cargar los datos del evento y permitir que el administrador lo edite.
    };

    // Función para eliminar un evento
    window.deleteEvent = function(id) {
        const index = events.findIndex(event => event.id === id);
        if (index !== -1) {
            events.splice(index, 1); // Eliminar el evento
            loadEvents(); // Recargar la lista de eventos
        }
    };

    loadEvents(); // Cargar los eventos inicialmente
});
