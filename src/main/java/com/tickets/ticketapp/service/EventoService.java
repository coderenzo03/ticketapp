package com.tickets.ticketapp.service;

import com.tickets.ticketapp.model.Evento;
import com.tickets.ticketapp.model.Ticket;
import com.tickets.ticketapp.repository.EventoRepository;
import com.tickets.ticketapp.dto.EventoCreacionDTO;
import com.tickets.ticketapp.dto.TicketCreacionDTO;
import com.tickets.ticketapp.dto.CardEventoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Optional; // Importa Optional
import java.util.Comparator;
import java.util.Set; // Importa Set
import java.util.stream.Collectors;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    @Autowired
    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    // --- Método existente para crear eventos ---
    @Transactional
    public Evento crearEvento(EventoCreacionDTO eventoDTO) {
        Evento evento = new Evento();
        evento.setTitulo(eventoDTO.getTitulo());
        evento.setDescripcionCorta(eventoDTO.getDescripcionCorta());
        evento.setDescripcionLarga(eventoDTO.getDescripcionLarga());
        evento.setFechaInicio(eventoDTO.getFechaInicio());
        evento.setFechaFin(eventoDTO.getFechaFin());
        evento.setUrlImagenPrincipal(eventoDTO.getUrlImagenPrincipal());
        evento.setUbicacion(eventoDTO.getUbicacion());
        evento.setCategoria(eventoDTO.getCategoria());
        evento.setVisibilidad(eventoDTO.getVisibilidad());

        if (eventoDTO.getTickets() != null) {
            evento.setTickets(new HashSet<>());
            for (TicketCreacionDTO ticketDTO : eventoDTO.getTickets()) {
                Ticket ticket = new Ticket();
                ticket.setNombre(ticketDTO.getNombre());
                ticket.setPrecio(ticketDTO.getPrecio());
                ticket.setCantidadTotal(ticketDTO.getCantidadTotal());
                ticket.setCantidadVendida(0);

                ticket.setEvento(evento);
                evento.getTickets().add(ticket);
            }
        }
        return eventoRepository.save(evento);
    }

    // --- Método existente para obtener todos los eventos (entidades) ---
    @Transactional(readOnly = true)
    public List<Evento> obtenerTodosLosEventos() {
        return eventoRepository.findAll();
    }

    /**
     * Obtiene una lista de CardEventoDTOs, incluyendo el precio más bajo de los tickets para cada evento.
     * Solo lista aquellos eventos cuya visibilidad sea TRUE.
     *
     * @return Una lista de CardEventoDTO.
     */
    @Transactional(readOnly = true)
    public List<CardEventoDTO> obtenerEventosParaTarjetas() {
        // Filtrar eventos por visibilidad = true directamente desde el repositorio
        // Para esto, podríamos añadir un método al EventoRepository:
        // List<Evento> findByVisibilidadTrue();
        // O simplemente filtrar después de traerlos todos, si el volumen de datos no es muy grande.
        // Por eficiencia, es mejor que la base de datos haga el filtro.
        // Vamos a añadir un método en el EventoRepository.

        List<Evento> eventosVisibles = eventoRepository.findByVisibilidadTrue(); // Nuevo método en el repositorio

        return eventosVisibles.stream().map(evento -> {
            BigDecimal precioMinimo = null;

            if (evento.getTickets() != null && !evento.getTickets().isEmpty()) {
                Optional<BigDecimal> minPriceOptional = evento.getTickets().stream()
                        .map(Ticket::getPrecio)
                        .min(Comparator.naturalOrder());

                if (minPriceOptional.isPresent()) {
                    precioMinimo = minPriceOptional.get();
                }
            }

            String fechaFormateada;
            if (evento.getFechaInicio() != null) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM. - HH:mm");
                fechaFormateada = evento.getFechaInicio().format(formatter) + " Hrs.";
            } else {
                fechaFormateada = "Fecha no disponible";
            }

            String precioMinimoEntrada;
            if (precioMinimo != null) {
                precioMinimoEntrada = "S/ " + precioMinimo.stripTrailingZeros().toPlainString();
            } else {
                precioMinimoEntrada = "Consultar Precio";
            }

            CardEventoDTO cardDTO = new CardEventoDTO();
            cardDTO.setImagenUrl(evento.getUrlImagenPrincipal());
            cardDTO.setTipoEvento(evento.getCategoria());
            cardDTO.setNombreEvento(evento.getTitulo());
            cardDTO.setFecha(fechaFormateada);
            cardDTO.setPrecioMinimoEntrada(precioMinimoEntrada);

            return cardDTO;
        }).collect(Collectors.toList());
    }

    /**
     * Cambia la visibilidad de un evento específico por su ID.
     *
     * @param id El ID del evento a modificar.
     * @param nuevaVisibilidad El nuevo estado de visibilidad (true para visible, false para oculto).
     * @return El objeto Evento actualizado, o null si el evento no se encuentra.
     */
    @Transactional
    public Evento cambiarVisibilidadEvento(Long id, Boolean nuevaVisibilidad) {
        Optional<Evento> eventoOptional = eventoRepository.findById(id); // Busca el evento por ID

        if (eventoOptional.isPresent()) {
            Evento evento = eventoOptional.get();
            evento.setVisibilidad(nuevaVisibilidad); // Actualiza la visibilidad
            return eventoRepository.save(evento); // Guarda el evento actualizado
        } else {
            return null; // O podrías lanzar una excepción personalizada como EventoNotFoundException
        }
    }

    // --- Método para obtener un evento por ID (útil para actualizar/eliminar o detalles) ---
    @Transactional(readOnly = true)
    public Optional<Evento> obtenerEventoPorId(Long id) {
        return eventoRepository.findById(id);
    }
}