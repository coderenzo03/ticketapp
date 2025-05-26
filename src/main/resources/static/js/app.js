window.onload = function() {
    fetch('/api/eventos')
        .then(response => response.json())
        .then(data => {
            const eventosDiv = document.getElementById('eventos');
            data.forEach(evento => {
                const eventoElement = document.createElement('div');
                eventoElement.innerHTML = `
                    <h2>${evento.nombre}</h2>
                    <p>${evento.descripcion}</p>
                    <p>Fecha: ${evento.fecha}</p>
                    <p>Lugar: ${evento.lugar}</p>
                    <p>Precio: $${evento.precio}</p>
                `;
                eventosDiv.appendChild(eventoElement);
            });
        });
};
