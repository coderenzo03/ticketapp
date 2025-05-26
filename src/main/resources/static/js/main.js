// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el carrusel automático
  initCarousel()

  // Inicializar los tooltips de Bootstrap (opcional)
  initTooltips()

  // Inicializar los listeners para eventos de scroll
  initScrollEffects()

  // Cargar favoritos guardados
  loadFavorites()

  console.log("Venta de Tickets Pe - Sistema iniciado correctamente")
})

/**
 * Inicializa el carrusel principal con configuraciones avanzadas
 */
function initCarousel() {
  const carousel = document.getElementById("heroCarousel")
  if (!carousel) return

  // Inicializar el carrusel de Bootstrap con opciones avanzadas
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 4000, // Cambia cada 4 segundos
    wrap: true, // Loop infinito
    pause: "hover", // Pausa en hover
    keyboard: true, // Control con teclado
    touch: true, // Soporte para swipe en móviles
  })

  // Reinicia automáticamente después de interacción manual
  carousel.addEventListener("slid.bs.carousel", () => {
    console.log("Slide cambiado automáticamente")
  })

  // Pausa el carrusel cuando el usuario interactúa manualmente
  const prevButton = carousel.querySelector(".carousel-control-prev")
  const nextButton = carousel.querySelector(".carousel-control-next")
  const indicators = carousel.querySelectorAll(".carousel-indicators button")

  // Función para manejar interacción manual
  function handleManualInteraction() {
    carouselInstance.pause()
    // Reinicia automáticamente después de 6 segundos de inactividad
    setTimeout(() => {
      carouselInstance.cycle()
    }, 6000)
  }

  // Event listeners para controles manuales
  if (prevButton) prevButton.addEventListener("click", handleManualInteraction)
  if (nextButton) nextButton.addEventListener("click", handleManualInteraction)

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", handleManualInteraction)
  })

  // Pausa cuando la pestaña no está visible (Performance)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      carouselInstance.pause()
    } else {
      carouselInstance.cycle()
    }
  })
}

/**
 * Inicializa los tooltips de Bootstrap
 */
function initTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
}

/**
 * Inicializa efectos de scroll
 */
function initScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Mostrar/ocultar botón de volver arriba
    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    }

    // Cambiar la opacidad del navbar al hacer scroll
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      if (scrollTop > 100) {
        navbar.classList.add("navbar-scrolled")
      } else {
        navbar.classList.remove("navbar-scrolled")
      }
    }
  })
}

/**
 * Función para comprar tickets
 * @param {string} eventId - ID del evento
 */
function buyTicket(eventId) {
  console.log(`Comprando tickets para el evento: ${eventId}`)

  // Detener la propagación del evento para evitar que el click en el card
  // se active dos veces si el card también tiene un onclick (si aplica).
  // Es importante usar event.stopPropagation() si el 'buyTicket' es llamado desde un botón dentro de un card
  // que ya tiene un onclick para la tarjeta completa.
  // Si esta función se llama directamente desde el onclick del card, entonces `event` no es el mismo.
  // Asumiendo que `buyTicket` es llamado desde el botón dentro del card:
  if (window.event) { // Comprobar si el evento global está disponible (para click en botón)
    window.event.stopPropagation();
  }


  // Redirigir a la página de detalles del evento, pasando el ID como parámetro
  showNotification(`Redirigiendo a los detalles del evento: ${eventId}`, "info")
  window.location.href = `/event_detail.html?id=${eventId}`;
}

/**
 * Función para marcar/desmarcar favoritos
 * @param {Event} event - Evento del DOM
 * @param {string} eventId - ID del evento
 */
function toggleFavorite(event, eventId) {
  // Prevenir la propagación para que no se active el click de la tarjeta
  event.stopPropagation()

  // Obtener el ícono
  const icon = event.currentTarget.querySelector("i") || event.target

  // Cambiar el estado del favorito
  if (icon.classList.contains("bi-star")) {
    icon.classList.remove("bi-star")
    icon.classList.add("bi-star-fill")
    icon.style.color = "#ffc107"
    saveFavorite(eventId, true)
    showNotification(`Evento agregado a favoritos`, "success")
    console.log(`Evento ${eventId} agregado a favoritos`)
  } else {
    icon.classList.remove("bi-star-fill")
    icon.classList.add("bi-star")
    icon.style.color = ""
    saveFavorite(eventId, false)
    showNotification(`Evento eliminado de favoritos`, "info")
    console.log(`Evento ${eventId} eliminado de favoritos`)
  }
}

/**
 * Guarda el estado de favorito en localStorage
 * @param {string} eventId - ID del evento
 * @param {boolean} isFavorite - Estado del favorito
 */
function saveFavorite(eventId, isFavorite) {
  try {
    // Obtener favoritos actuales
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {}

    // Actualizar favorito
    if (isFavorite) {
      favorites[eventId] = true
    } else {
      delete favorites[eventId]
    }

    // Guardar en localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites))
  } catch (error) {
    console.error("Error al guardar favorito:", error)
  }
}

/**
 * Carga los favoritos guardados y actualiza la UI
 */
function loadFavorites() {
  try {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {}

    // Recorrer todos los botones de favoritos y actualizar su estado
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      const eventId = btn.getAttribute("data-event-id")
      if (eventId && favorites[eventId]) {
        const icon = btn.querySelector("i")
        if (icon) {
          icon.classList.remove("bi-star")
          icon.classList.add("bi-star-fill")
          icon.style.color = "#ffc107"
        }
      }
    })
  } catch (error) {
    console.error("Error al cargar favoritos:", error)
  }
}

/**
 * Función para crear un evento
 */
function createEvent() {
  console.log("Creando evento...")
  showNotification("Redirigiendo al formulario de creación de eventos...", "info")
  // window.location.href = '/crear-evento';
}

/**
 * Función para leer un artículo del blog
 * @param {string} articleId - ID del artículo
 */
function readArticle(articleId) {
  console.log(`Leyendo artículo: ${articleId}`)
  showNotification(`Abriendo artículo: ${articleId}`, "info")
  // window.location.href = `/blog/${articleId}`;
}

/**
 * Función para ir al blog
 */
function goToBlog() {
  console.log("Navegando al blog...")
  showNotification("Redirigiendo al blog...", "info")
  // window.location.href = '/blog';
}

/**
 * Función para mostrar el modal de inicio de sesión
 * NOTA: Los modales de login/registro probablemente estén definidos en index.html,
 * y event_detail.html también tiene sus propias versiones.
 * Asegúrate de que los IDs de los modales y las funciones de Bootstrap sean consistentes.
 * Estas funciones aquí se refieren a los modales en index.html.
 */
function showLoginModal() {
  console.log("Mostrando modal de login...")
  showNotification("Abriendo modal de inicio de sesión...", "info")
  const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
  loginModal.show();
}

/**
 * Función para mostrar el modal de registro
 * NOTA: Lo mismo aplica aquí.
 */
function showRegisterModal() {
  console.log("Mostrando modal de registro...")
  showNotification("Abriendo modal de registro...", "info")
  const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
  registerModal.show();
}

/**
 * Funciones para alternar entre modales de login/registro en index.html
 */
function hideLoginShowRegister() {
  const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
  if (loginModal) loginModal.hide();
  showRegisterModal();
}

function hideRegisterShowLogin() {
  const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
  if (registerModal) registerModal.hide();
  showLoginModal();
}

/**
 * Función para filtrar eventos por categoría
 * @param {string} category - Categoría para filtrar
 */
function filterByCategory(category) {
  console.log(`Filtrando por categoría: ${category}`)
  showNotification(`Filtrando eventos por categoría: ${category}`, "info")
  // window.location.href = `/eventos?categoria=${category}`;
}

/**
 * Función para filtrar por precio
 */
function filterByPrice() {
  console.log("Filtrando por precio...")
  showNotification("Abriendo filtros de precio...", "info")
}

/**
 * Función para filtrar por ciudad
 */
function filterByCity() {
  console.log("Filtrando por ciudad...")
  showNotification("Abriendo filtros de ciudad...", "info")
}

/**
 * Función para filtrar por fecha
 */
function filterByDate() {
  console.log("Filtrando por fecha...")
  showNotification("Abriendo filtros de fecha...", "info")
}

/**
 * Función para limpiar cookies
 */
function clearCookies() {
  console.log("Limpiando cookies...")

  // Código real para limpiar cookies
  const cookies = document.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf("=")
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
  }

  showNotification("Cookies limpiadas correctamente", "success")
}

/**
 * Función para abrir redes sociales
 * @param {string} platform - Plataforma de red social
 */
function openSocial(platform) {
  console.log(`Abriendo ${platform}...`)

  // URLs de ejemplo para redes sociales
  const socialUrls = {
    facebook: "https://facebook.com/ventatickets",
    twitter: "https://twitter.com/ventatickets",
    instagram: "https://instagram.com/ventatickets",
    linkedin: "https://linkedin.com/company/ventatickets",
  }

  // Abrir en nueva pestaña
  if (socialUrls[platform]) {
    window.open(socialUrls[platform], "_blank")
  }
}

/**
 * Función para mostrar información sobre nosotros
 */
function showAbout() {
  console.log("Mostrando información sobre nosotros...")
  showNotification("Mostrando información sobre nosotros...", "info")
  // window.location.href = '/nosotros';
}

/**
 * Función para mostrar preguntas frecuentes
 */
function showFAQ() {
  console.log("Mostrando preguntas frecuentes...")
  showNotification("Mostrando preguntas frecuentes...", "info")
  // window.location.href = '/faq';
}

/**
 * Función para mostrar términos y condiciones
 */
function showTerms() {
  console.log("Mostrando términos y condiciones...")
  showNotification("Mostrando términos y condiciones...", "info")
  // window.location.href = '/terminos';
}

/**
 * Función para mostrar política de privacidad
 */
function showPrivacy() {
  console.log("Mostrando política de privacidad...")
  showNotification("Mostrando política de privacidad...", "info")
  // window.location.href = '/privacidad';
}

/**
 * Función para mostrar política de cookies
 */
function showCookies() {
  console.log("Mostrando política de cookies...")
  showNotification("Mostrando política de cookies...", "info")
  // window.location.href = '/cookies';
}

/**
 * Función para reportar contenido
 */
function reportContent() {
  console.log("Reportando contenido...")
  showNotification("Abriendo formulario de reporte...", "info")
  // window.location.href = '/reportar';
}

/**
 * Función para explorar eventos
 */
function exploreEvents() {
  console.log("Explorando eventos...")
  showNotification("Explorando todos los eventos...", "info")
  // window.location.href = '/eventos';
}

/**
 * Función para mostrar cómo funciona la plataforma
 */
function howItWorks() {
  console.log("Mostrando cómo funciona...")
  showNotification("Mostrando cómo funciona la plataforma...", "info")
  // window.location.href = '/como-funciona';
}

/**
 * Función para dar feedback
 */
function giveFeedback() {
  console.log("Dando feedback...")
  showNotification("Abriendo formulario de feedback...", "info")
  // window.location.href = '/feedback';
}

/**
 * Función para mostrar todas las categorías
 */
function showAllCategories() {
  console.log("Mostrando todas las categorías...")
  showNotification("Mostrando todas las categorías...", "info")
  // window.location.href = '/categorias';
}

/**
 * Función para cambiar el idioma
 */
function changeLanguage() {
  console.log("Cambiando idioma...")
  showNotification("Cambiando idioma...", "info")
  // Aquí puedes mostrar un dropdown con idiomas
}

/**
 * Función para cambiar el país
 */
function changeCountry() {
  console.log("Cambiando país...")
  showNotification("Cambiando país...", "info")
  // Aquí puedes mostrar un dropdown con países
}

/**
 * Función para buscar eventos
 * @param {Event} event - Evento del formulario
 */
function searchEvents(event) {
  event.preventDefault()
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    const searchTerm = searchInput.value.trim()
    if (searchTerm) {
      console.log(`Buscando: ${searchTerm}`)
      showNotification(`Buscando eventos con: ${searchTerm}`, "info")
      // window.location.href = `/buscar?q=${encodeURIComponent(searchTerm)}`;
    } else {
      showNotification("Por favor ingresa un término de búsqueda", "warning")
    }
  }
}

/**
 * Función para volver al inicio de la página
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

/**
 * Función para compartir un evento
 * @param {string} eventId - ID del evento
 * @param {string} platform - Plataforma para compartir
 */
function shareEvent(eventId, platform) {
  console.log(`Compartiendo evento ${eventId} en ${platform}`)

  const eventUrl = `https://ventatickets.pe/evento/${eventId}`
  const eventTitle = document.querySelector(`[data-event-id="${eventId}"] .card-title`)?.textContent || "Evento"

  // URLs para compartir en diferentes plataformas
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(eventTitle)}&url=${encodeURIComponent(eventUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(eventTitle + " " + eventUrl)}`,
  }

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], "_blank")
  }
}

/**
 * Función para mostrar notificaciones
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, warning, info)
 */
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div")
  notification.className = `alert alert-${type === "error" ? "danger" : type} alert-dismissible fade show position-fixed`
  notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  // Agregar al body
  document.body.appendChild(notification)

  // Auto-remover después de 3 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 3000)
}

/**
 * Función para mostrar loading
 */
function showLoading() {
  const existingLoader = document.getElementById("global-loader")
  if (existingLoader) return

  const loader = document.createElement("div")
  loader.id = "global-loader"
  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `

  loader.innerHTML = `
        <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Cargando...</span>
        </div>
    `

  document.body.appendChild(loader)
}

/**
 * Función para ocultar loading
 */
function hideLoading() {
  const loader = document.getElementById("global-loader")
  if (loader) {
    loader.remove()
  }
}

// Exportar funciones para uso global
window.buyTicket = buyTicket
window.toggleFavorite = toggleFavorite
window.createEvent = createEvent
window.readArticle = readArticle
window.goToBlog = goToBlog
window.showLoginModal = showLoginModal
window.showRegisterModal = showRegisterModal
window.hideLoginShowRegister = hideLoginShowRegister // Añadido
window.hideRegisterShowLogin = hideRegisterShowLogin // Añadido
window.filterByCategory = filterByCategory
window.filterByPrice = filterByPrice
window.filterByCity = filterByCity
window.filterByDate = filterByDate
window.clearCookies = clearCookies
window.openSocial = openSocial
window.showAbout = showAbout
window.showFAQ = showFAQ
window.showTerms = showTerms
window.showPrivacy = showPrivacy
window.showCookies = showCookies
window.reportContent = reportContent
window.exploreEvents = exploreEvents
window.howItWorks = howItWorks
window.giveFeedback = giveFeedback
window.showAllCategories = showAllCategories
window.changeLanguage = changeLanguage
window.changeCountry = changeCountry
window.searchEvents = searchEvents
window.scrollToTop = scrollToTop
window.shareEvent = shareEvent
window.showNotification = showNotification