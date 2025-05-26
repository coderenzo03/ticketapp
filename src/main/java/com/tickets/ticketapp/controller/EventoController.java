package com.tickets.ticketapp.controller;

import com.tickets.ticketapp.model.Evento;
import com.tickets.ticketapp.dto.EventoCreacionDTO;
import com.tickets.ticketapp.dto.CardEventoDTO;
import com.tickets.ticketapp.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional; // Importa Optional

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService eventoService;

    @Autowired
    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    // --- Endpoint para crear un nuevo evento ---
    @PostMapping
    public ResponseEntity<Evento> crearEvento(@Valid @RequestBody EventoCreacionDTO eventoDTO) {
        Evento nuevoEvento = eventoService.crearEvento(eventoDTO);
        return new ResponseEntity<>(nuevoEvento, HttpStatus.CREATED);
    }

    // --- Endpoint para obtener todos los eventos (entidades completas) ---
    @GetMapping // /api/eventos
    public ResponseEntity<List<Evento>> obtenerTodosLosEventos() {
        List<Evento> eventos = eventoService.obtenerTodosLosEventos();
        return new ResponseEntity<>(eventos, HttpStatus.OK);
    }

    // --- Endpoint para obtener eventos formateados como CardEventoDTO (solo visibles) ---
    @GetMapping("/cards") // /api/eventos/cards
    public ResponseEntity<List<CardEventoDTO>> obtenerEventosParaTarjetas() {
        List<CardEventoDTO> cardEventos = eventoService.obtenerEventosParaTarjetas();
        return new ResponseEntity<>(cardEventos, HttpStatus.OK);
    }

    /**
     * Nuevo Endpoint para cambiar la visibilidad de un evento.
     *
     * @param id El ID del evento a modificar.
     * @param nuevaVisibilidad El nuevo estado de visibilidad (true/false).
     * @return ResponseEntity con el Evento actualizado o un error si no se encuentra.
     */
    @PatchMapping("/{id}/visibilidad") // Usa PATCH para actualizaciones parciales
    public ResponseEntity<Evento> cambiarVisibilidadEvento(
            @PathVariable Long id,
            @RequestParam("visible") Boolean nuevaVisibilidad) {

        Evento eventoActualizado = eventoService.cambiarVisibilidadEvento(id, nuevaVisibilidad);

        if (eventoActualizado != null) {
            return new ResponseEntity<>(eventoActualizado, HttpStatus.OK); // 200 OK
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
    }

    /**
     * Endpoint para obtener un evento por ID.
     * Útil para ver detalles de un evento específico.
     *
     * @param id El ID del evento.
     * @return ResponseEntity con el Evento o 404 Not Found.
     */
    @GetMapping("/{id}") // /api/eventos/{id}
    public ResponseEntity<Evento> obtenerEventoPorId(@PathVariable Long id) {
        Optional<Evento> eventoOptional = eventoService.obtenerEventoPorId(id);
        return eventoOptional.map(evento -> new ResponseEntity<>(evento, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}