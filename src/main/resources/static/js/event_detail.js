document.addEventListener('DOMContentLoaded', () => {
    loadEventDetails();
    setupBuyButtonListener(); // Asegúrate de que esta función está definida si la usas
});

// Datos de eventos de ejemplo (simulando una base de datos o API)
// Asegúrate de que estos IDs coincidan con los IDs que pasas en la URL, ej: ?id=cro-lima
const eventsData = {
    "cro-lima": {
        title: "C.R.O EN LIMA",
        subtitle: "El Trap llega a la capital",
        date: "Sábado 31 de Mayo, 2025",
        time: "05:00 PM",
        location: "Lima, PE",
        venue: "Centro Convenciones FESTIVA",
        description: "Vive el trap argentino VIBRA URBANA junto a C.R.O el trap argentino vuelve para hacernos delirar con lo mejor del género junto a su mayor representante. TOUR MALOS CANTORES 2025 #EstoNoEsMusicaEsDroga!",
        backgroundImage: "/images/CRO.jpeg",
        organizer: "TDR CONCERTS E.I.R.L",
        organizerLogo: "/images/logoss.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.0544, lng: -77.0306 },
        tickets: [
            {
                name: "ZONA FULL EXPERIENCE - PREVENTA ESPECIAL",
                price: "S/ 250.00",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA PLATINUM - PREVENTA ESPECIAL",
                price: "S/ 185.50",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA VIP - PREVENTA ESPECIAL",
                price: "S/ 150.00",
                available: true // <--- CAMBIADO A TRUE
            }
        ]
    },
    "futbol-peru-ecuador": {
        title: "PERÚ VS ECUADOR",
        subtitle: "Clasificatorias Copa Mundial 2026",
        date: "Martes 10 de Junio, 2025",
        time: "8:30 PM",
        location: "Lima, PE",
        venue: "Estadio Nacional",
        description: "Prepárate para vivir la emoción del fútbol con el partido decisivo entre Perú y Ecuador en el Estadio Nacional. Un encuentro vibrante que definirá el camino hacia la Copa Mundial 2026. ¡No te quedes sin alentar a la blanquirroja! Este partido promete ser histórico con la participación de las mejores figuras del fútbol sudamericano.",
        backgroundImage: "/images/futbol.jpeg",
        organizer: "Federación Peruana de Fútbol",
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.0678, lng: -77.0318 }, // Coordenadas para Estadio Nacional (Ejemplo)
        tickets: [
            {
                name: "ZONA OCCIDENTE - CENTRAL",
                price: "S/ 1,999.90",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA ORIENTE - CENTRAL",
                price: "S/ 1,500.00",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA NORTE - POPULAR",
                price: "S/ 800.00",
                available: true // <--- CAMBIADO A TRUE
            }
        ]
    },
    "festival-comedia": {
        title: "3ER FESTIVAL DE COMEDIA",
        subtitle: "MEJORES EXPOSITORES",
        date: "Jueves 29 de Mayo, 2025",
        time: "08:00 PM",
        location: "Lima, PE",
        venue: "Auditorio Peru Clown",
        description: "La risa está garantizada en el 3er Festival de Comedia, donde los mejores exponentes del stand-up se reunirán para ofrecerte una noche llena de humor. Ven y disfruta de las rutinas más ingeniosas y divertidas de los comediantes más reconocidos del país. Una velada perfecta para reír sin parar.",
        backgroundImage: "/images/comedia.jpeg",
        organizer: "Peru Clown Productions",
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.0911, lng: -77.0270 }, // Coordenadas para Auditorio Peru Clown (Ejemplo)
        tickets: [
            {
                name: "ZONA PREFERENCIAL",
                price: "S/ 80.00",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA GENERAL",
                price: "S/ 50.00",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA ESTUDIANTE",
                price: "S/ 30.00",
                available: true // <--- CAMBIADO A TRUE
            }
        ]
    },
    "zona-infame-noriel": {
        title: "ZONA INFAME",
        subtitle: "MUSIC FEST - NORIEL EN TRUJILLO",
        date: "Sábado 31 May. - 08:00 PM a 06:00 AM - Trujillo",
        time: "08:00 PM",
        location: "Trujillo, PE",
        venue: "Centro Convenciones FESTIVA",
        description: "¡El festival de música más esperado llega a Trujillo! Disfruta de una noche inolvidable con la presentación estelar de Noriel y muchos artistas más. Música, luces y la mejor energía te esperan en este evento que no te puedes perder. Una experiencia única que combina los mejores ritmos urbanos con un espectáculo visual impresionante.",
        backgroundImage: "/images/zonainfame.jpeg",
        organizer: "BLACTION PRODUCTIONS",
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -8.1065, lng: -79.0290 }, // Coordenadas para Centro Convenciones FESTIVA en Trujillo (Ejemplo)
        tickets: [
            {
                name: "ZONA FULL EXPERIENCE - PREVENTA ESPECIAL",
                price: "S/ 85.00",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA PLATINUM - PREVENTA ESPECIAL",
                price: "S/ 65.00",
                available: true // <--- CAMBIADO A TRUE
            },
            {
                name: "ZONA VIP - PREVENTA ESPECIAL",
                price: "S/ 55.00",
                available: true // <--- CAMBIADO A TRUE
            }
        ]
    },
    // Añade el resto de tus eventos aquí con la misma estructura
    "volver-a-mirar": { // Asegúrate de que este ID y los siguientes estén en tu index.html si los usas
        title: 'VOLVER A MIRAR',
        subtitle: 'Una obra teatral que te hará reflexionar',
        date: 'Viernes 30 May., 2025',
        time: '08:00 PM',
        location: 'Lima, PE',
        venue: 'Teatro La Plaza',
        description: 'Una profunda y conmovedora obra de teatro que explora las complejidades de la memoria y el tiempo. "Volver a Mirar" te invita a un viaje introspectivo a través de sus personajes y diálogos.',
        backgroundImage: '/images/VOLVER A MIRAR.webp',
        organizer: 'Productores Teatrales Asociados',
        organizerLogo: '/images/mi_logo.png', // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.1226, lng: -77.0305 }, // Coordenadas para Teatro La Plaza (Ejemplo)
        tickets: [
            { name: "ENTRADA GENERAL", price: "S/ 50.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "ENTRADA ESTUDIANTE", price: "S/ 30.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "wendy-ramos": {
        title: 'WENDY RAMOS',
        subtitle: 'Amar lo que Eres',
        date: 'Sábado 07 Jun., 2025',
        time: '08:00 PM',
        location: 'Lima, PE',
        venue: 'Teatro Canout',
        description: 'Wendy Ramos presenta su espectáculo "Amar lo que Eres", una propuesta teatral que combina humor, reflexión y emotividad. Un show para conectar contigo mismo y reír a carcajadas.',
        backgroundImage: '/images/wendy.jpeg',
        organizer: 'Teatro La Plaza',
        organizerLogo: '/images/mi_logo.png', // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.1150, lng: -77.0322 }, // Coordenadas para Teatro Canout (Ejemplo)
        tickets: [
            { name: "PLATINUM", price: "S/ 120.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "VIP", price: "S/ 80.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "GENERAL", price: "S/ 60.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "bar-crawl": {
        title: 'RECORRIDO DE BARES EN MIRAFLORES',
        subtitle: 'La mejor noche de fiesta',
        date: 'Miércoles 28 May., 2025',
        time: '08:30 PM',
        location: 'Lima, PE',
        venue: 'Punto de encuentro: Parque Kennedy',
        description: 'Explora la vida nocturna de Miraflores con este emocionante bar crawl. Visita los mejores bares y discotecas, conoce gente nueva y disfruta de una noche inolvidable en la capital.',
        backgroundImage: '/images/BARCRWAL.jpeg',
        organizer: 'Lima Bar Tours',
        organizerLogo: '/images/mi_logo.png', // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.1215, lng: -77.0298 }, // Coordenadas para Parque Kennedy (Ejemplo)
        tickets: [
            { name: "PASE COMPLETO", price: "S/ 100.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "PASE VIP", price: "S/ 150.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "cumbia-dorada": {
        title: 'CUMBIA DORADA',
        subtitle: 'Una noche de pura cumbia y sabor',
        date: 'Sábado 14 Jun., 2025',
        time: '08:00 PM',
        location: 'Lima, PE',
        venue: 'Complejo El Huaralino',
        description: 'Prepárate para bailar al ritmo de la Cumbia Dorada. Una noche llena de éxitos y los mejores exponentes del género para que disfrutes de un espectáculo sin igual.',
        backgroundImage: '/images/cmubia.webp',
        organizer: 'Eventos Tropicales SAC',
        organizerLogo: '/images/mi_logo.png', // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -11.9680, lng: -77.0782 }, // Coordenadas para Complejo El Huaralino (Ejemplo)
        tickets: [
            { name: "ZONA VIP", price: "S/ 70.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "ZONA GENERAL", price: "S/ 45.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "brothers-band": {
        title: 'BROTHERS IN BAND',
        subtitle: 'El auténtico sonido de Dire Straits',
        date: 'Viernes 24 Jun., 2025',
        time: '08:30 PM',
        location: 'Lima, PE',
        venue: 'Gran Teatro Nacional',
        description: 'Revive la magia de Dire Straits con Brothers in Band, la banda tributo que captura la esencia y el sonido original. Un concierto imperdible para los amantes del rock clásico.',
        backgroundImage: '/images/Brothers.webp',
        organizer: 'Producciones Musicales SAC',
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.0734, lng: -77.0436 }, // Coordenadas para Gran Teatro Nacional (Ejemplo)
        tickets: [
            { name: "PLATEA BAJA", price: "S/ 100.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "PLATEA ALTA", price: "S/ 80.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "GALERIA", price: "S/ 65.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "circo-agua": {
        title: 'CIRCO DE AGUA - "ATLANTIKA"',
        subtitle: 'Un espectáculo acuático sin igual',
        date: 'Jueves 26 Jun., 2025',
        time: '07:00 PM',
        location: 'Lima, PE',
        venue: 'Carpa Circo Jockey Plaza',
        description: 'Sumérgete en el fascinante mundo de "Atlantika", el circo de agua que te dejará sin aliento con sus impresionantes números acrobáticos y visuales acuáticos. Ideal para toda la familia.',
        backgroundImage: '/images/CIRCO DE AGUA.jpeg',
        organizer: 'Cirque Productions',
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.1099, lng: -76.9749 }, // Coordenadas para Jockey Plaza (Ejemplo)
        tickets: [
            { name: "PALCO VIP", price: "S/ 150.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "ZONA PREFERENCIAL", price: "S/ 100.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "ZONA GENERAL", price: "S/ 85.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "rumba-fest": {
        title: 'RUMBA FEST "CHICLAYO"',
        subtitle: 'HILDEMARO, JOSIMAR, CARIBEÑOS Y MÁS',
        date: 'Sábado 18 Oct., 2025',
        time: '04:00 PM',
        location: 'Chiclayo, PE',
        venue: 'Explanada Estadio Elías Aguirre',
        description: 'La rumba se enciende en Chiclayo con un festival que reúne a grandes exponentes de la salsa y la cumbia. Hildemaro, Josimar, Caribeños y otros artistas te harán bailar hasta el amanecer.',
        backgroundImage: '/images/RUMBAFEST.jpeg',
        organizer: 'Rumba Productions',
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -6.7663, lng: -79.8453 }, // Coordenadas para Estadio Elías Aguirre (Ejemplo)
        tickets: [
            { name: "ZONA PLATINUM", price: "S/ 120.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "ZONA VIP", price: "S/ 90.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "ZONA GENERAL", price: "S/ 75.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "teatro-sinfonico-dragon-ball": {
        title: 'TEATRO SINFÓNICO',
        subtitle: 'DRAGON BALL',
        date: 'AGO 02, 2025',
        time: '04:00 PM',
        location: 'Lima, PE',
        venue: 'TEATRO PENTAGONITO',
        description: 'Una experiencia épica donde la música sinfónica se une al universo de Dragon Ball. Disfruta de los temas icónicos de la saga interpretados por una orquesta en vivo, con proyecciones y efectos visuales que te transportarán al mundo de Goku y sus amigos.',
        prices: 'Desde S/ 90.00',
        backgroundImage: '/images/dragonball.jpeg',
        organizer: 'Anime Concerts Perú',
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.1009, lng: -76.9942 }, // Coordenadas para Teatro Pentagonito (Ejemplo)
        tickets: [
            { name: "DIAMANTE", price: "S/ 150.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "PLATINUM", price: "S/ 120.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "GENERAL", price: "S/ 90.00", available: true } // <--- CAMBIADO A TRUE
        ]
    },
    "power-con": {
        title: 'EL EVENTO MÁS POWER DEL AÑO',
        subtitle: 'POWER CON',
        date: 'SEP 12, 2025',
        time: '02:00 PM',
        location: 'Lima, PE',
        venue: 'SANTA BEATRIZ',
        description: 'Prepárate para el evento más "Power" del año. La Power Con reúne a fans y coleccionistas en un espacio lleno de sorpresas, invitados especiales, paneles y exhibiciones. ¡No te pierdas este encuentro con tus héroes favoritos!',
        prices: 'Desde S/ 30.00',
        backgroundImage: '/images/powerrangers.jpeg',
        organizer: 'Comic Conventions Perú',
        organizerLogo: "/images/mi_logo.png", // <--- ¡CAMBIA ESTA RUTA POR LA DE TU LOGO!
        mapCoordinates: { lat: -12.0620, lng: -77.0322 }, // Coordenadas para Santa Beatriz (Ejemplo)
        tickets: [
            { name: "ENTRADA REGULAR", price: "S/ 30.00", available: true }, // <--- CAMBIADO A TRUE
            { name: "PASE VIP", price: "S/ 60.00", available: true } // <--- CAMBIADO A TRUE
        ]
    }
};


let currentEventId = "";
let currentEventData = null;
let map = null; // Variable global para el mapa

/**
* Carga los detalles del evento basados en el ID de la URL
*/
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    currentEventId = urlParams.get("id");

    console.log("ID del evento solicitado:", currentEventId);
    console.log("IDs disponibles en eventsData:", Object.keys(eventsData)); // Para depuración

    if (!currentEventId) {
        console.error("No se encontró Event ID en la URL.");
        showNotification("Error: No se especificó el evento", "error");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
        return;
    }

    currentEventData = eventsData[currentEventId];

    if (currentEventData) {
        // Actualizar elementos de la página
        document.getElementById("eventHeroImage").src = currentEventData.backgroundImage;
        document.getElementById("eventTitle").textContent = currentEventData.title;
        document.getElementById("eventTitleCard").textContent = currentEventData.title;
        document.getElementById("eventDate").textContent = currentEventData.date;
        document.getElementById("eventOrganizer").textContent = "Presentado por: " + currentEventData.organizer;
        document.getElementById("eventDescription").textContent = currentEventData.description;
        document.getElementById("eventLocation").textContent = currentEventData.location;
        document.getElementById("eventDateInfo").textContent = currentEventData.date;
        document.getElementById("eventTimeInfo").textContent = currentEventData.time;
        document.getElementById("eventVenueInfo").textContent = currentEventData.venue;
        document.getElementById("organizerName").textContent = currentEventData.organizer;
        document.getElementById("organizerLogo").src = currentEventData.organizerLogo; // Usa el logo del evento

        // Cargar opciones de tickets
        loadTicketOptions();

        // Actualizar título de la página
        document.title = `${currentEventData.title} - Venta de Tickets Pe`;

        // La función initMap global será llamada por el script de Google Maps API.
        // Aquí solo nos aseguramos de que los datos del evento estén disponibles.

        console.log(`Evento cargado: ${currentEventData.title}`);
    } else {
        console.error(`Evento con ID '${currentEventId}' no encontrado.`);
        showNotification("Error: Evento no encontrado", "error");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    }
}

/**
* Carga las opciones de tickets disponibles
*/
function loadTicketOptions() {
    const ticketOptionsContainer = document.getElementById("ticketOptions");
    ticketOptionsContainer.innerHTML = ""; // Limpiar el contenido de carga

    if (currentEventData && currentEventData.tickets && currentEventData.tickets.length > 0) {
        currentEventData.tickets.forEach(ticket => {
            const ticketElement = document.createElement("div");
            ticketElement.className = "ticket-option";

            // Aquí la lógica ya no necesita la verificación de 'available', ya que todos serán true
            // Pero mantenemos la estructura por si en el futuro quieres volver a tener tickets agotados.
            if (ticket.available) { // Siempre será true ahora
                ticketElement.innerHTML = `
                    <div class="ticket-option-title">${ticket.name}</div>
                    <div class="ticket-option-price">${ticket.price}</div>
                    <div class="ticket-option-controls">
                        <button class="btn-quantity" onclick="decreaseQuantity(this)">-</button>
                        <span class="ticket-quantity">0</span>
                        <button class="btn-quantity" onclick="increaseQuantity(this)">+</button>
                    </div>
                `;
            } else {
                // Esta sección teóricamente no se alcanzará si todos los 'available' son true
                ticketElement.innerHTML = `
                    <div class="ticket-option-title">${ticket.name}</div>
                    <div class="ticket-option-price">${ticket.price}</div>
                    <div class="sold-out">Agotado</div>
                `;
            }

            ticketOptionsContainer.appendChild(ticketElement);
        });
    } else {
        ticketOptionsContainer.innerHTML = '<div class="alert alert-info text-center">No hay tickets disponibles para este evento.</div>';
    }
}

/**
* Inicializa el mapa de Google Maps.
* Esta función es llamada por el script de Google Maps API (`callback=initMap`).
*/
function initMap() {
    const mapDiv = document.getElementById("map");
    let location = { lat: -12.046374, lng: -77.042793 }; // Coordenadas por defecto (Lima, Perú)

    // Si currentEventData tiene coordenadas específicas, úsalas
    if (currentEventData && currentEventData.mapCoordinates) {
        location = currentEventData.mapCoordinates;
        console.log(`Usando coordenadas específicas del evento: ${location.lat}, ${location.lng}`);
    } else {
        console.log("Usando coordenadas por defecto para el mapa.");
    }

    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        // Fallback si la API de Google Maps no se carga (ej. sin API Key o error de red)
        console.warn("API de Google Maps no cargada. Mostrando mensaje de fallback.");
        mapDiv.innerHTML = '<div class="alert alert-warning text-center m-0">No se pudo cargar el mapa. Verifica tu conexión o la API Key.</div>';
        mapDiv.style.height = 'auto'; // Ajusta la altura para el mensaje
        return;
    }

    map = new google.maps.Map(mapDiv, {
        center: location,
        zoom: 15,
        styles: [ // Estilos del mapa (los que ya tenías)
            { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{"color": "#7c93a3"}, {"lightness": "-10"}] },
            { "featureType": "administrative.country", "elementType": "geometry", "stylers": [{"visibility": "on"}] },
            { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{"color": "#a5b7c6"}, {"visibility": "on"}, {"weight": "0.50"}] },
            { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{"color": "#dde2e3"}] },
            { "featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}] },
            { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{"color": "#d7dde0"}, {"visibility": "on"}, {"weight": "1.00"}] },
            { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#c1d1d6"}, {"visibility": "on"}] },
            { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#a6b5bb"}, {"visibility": "on"}, {"weight": "0.50"}] },
            { "featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#a6cbe3"}] }
        ]
    });

    // Añadir marcador
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: currentEventData ? currentEventData.venue : "Ubicación del evento"
    });
}

/**
* Aumenta la cantidad de tickets
*/
function increaseQuantity(button) {
    const quantityElement = button.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    if (quantity < 10) { // Límite de 10 tickets, puedes ajustar
        quantity++;
        quantityElement.textContent = quantity;
    }
}

/**
* Disminuye la cantidad de tickets
*/
function decreaseQuantity(button) {
    const quantityElement = button.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}

/**
 * Configura el listener para el botón 'Comprar Ahora'
 * Actualmente, solo muestra una notificación, sin modales de selección de asientos complejos.
 */
function setupBuyButtonListener() {
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para recopilar los tickets seleccionados
            // y luego redirigir a una página de checkout o abrir un modal de confirmación.
            showNotification('Procesando compra...', 'info');
            // Ejemplo:
            // window.location.href = '/checkout.html?eventId=' + currentEventId + '&tickets=' + JSON.stringify(getSelectedTickets());
        });
    }
}

// ** Funciones de Modales (Login/Register) - Reutilizadas de main.js o un archivo global **
// Es importante que estas funciones estén accesibles globalmente si son llamadas desde el HTML
// como onclick="showLoginModal()".
// Si ya las tienes en main.js y main.js se carga en TODAS las páginas, no necesitas duplicarlas aquí.
// Pero si event_detail.html es independiente, entonces podrías necesitarlas aquí o en un JS compartido.

function showLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

function showRegisterModal() {
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    registerModal.show();
}

function hideLoginShowRegister() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) loginModal.hide();
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    registerModal.show();
}

function hideRegisterShowLogin() {
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (registerModal) registerModal.hide();
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

/**
* Función de notificación mejorada
*/
function showNotification(message, type = "info", duration = 3000) {
    const notificationContainer = document.createElement("div");
    notificationContainer.className = `alert alert-${type === "error" ? "danger" : type} alert-dismissible fade show position-fixed`;
    notificationContainer.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        border-radius: 10px;
    `;

    const iconMap = {
        success: "bi-check-circle-fill",
        error: "bi-exclamation-triangle-fill",
        warning: "bi-exclamation-triangle-fill",
        info: "bi-info-circle-fill",
    };

    notificationContainer.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi ${iconMap[type] || iconMap.info} me-2"></i>
            <div>${message}</div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(notificationContainer);

    setTimeout(() => {
        const bsAlert = bootstrap.Alert.getInstance(notificationContainer);
        if (bsAlert) {
            bsAlert.dispose();
        } else {
            notificationContainer.remove();
        }
    }, duration);
}

// Exportar funciones globalmente para que sean accesibles desde el HTML
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.showNotification = showNotification;
window.initMap = initMap;
window.showLoginModal = showLoginModal; // Exportar para uso en HTML
window.showRegisterModal = showRegisterModal; // Exportar para uso en HTML
window.hideLoginShowRegister = hideLoginShowRegister; // Exportar para uso en HTML
window.hideRegisterShowLogin = hideRegisterShowLogin; // Exportar para uso en HTML

// Llamar a loadEventDetails cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadEventDetails);