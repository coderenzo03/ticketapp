package com.tickets.ticketapp.controller;

import com.tickets.ticketapp.dto.CardEventoDTO;
import com.tickets.ticketapp.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // Para pasar datos a la vista
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller // Importante: usa @Controller, no @RestController para vistas HTML
public class HomeController {

    private final EventoService eventoService;

    @Autowired
    public HomeController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping("/") // Mapea la ruta raíz o puedes usar "/home"
    public String home(Model model) {
        // Obtener la lista de CardEventoDTOs desde el servicio
        List<CardEventoDTO> eventosParaTarjetas = eventoService.obtenerEventosParaTarjetas();

        // Añadir la lista al modelo para que Thymeleaf pueda acceder a ella
        // El nombre "eventos" será la variable que usaremos en el HTML
        model.addAttribute("eventos", eventosParaTarjetas);

        // Retornar el nombre de la plantilla HTML (sin la extensión .html)
        // Spring Boot buscará automáticamente en src/main/resources/templates/
        return "index"; // Esto buscará 'index.html'
    }
}