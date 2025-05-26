package com.tickets.ticketapp.dto;

import java.time.LocalDateTime;
import java.util.List; // Importar List
import jakarta.validation.Valid; // Para validar la lista de tickets
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotEmpty; // Para validar que la lista no esté vacía
import org.springframework.format.annotation.DateTimeFormat;

public class EventoCreacionDTO {

    @NotBlank(message = "El título del evento es obligatorio")
    @Size(max = 255, message = "El título no puede exceder los 255 caracteres")
    private String titulo;

    @NotBlank(message = "La descripción corta es obligatoria")
    private String descripcionCorta;

    private String descripcionLarga;

    @NotNull(message = "La fecha de inicio es obligatoria")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime fechaInicio;

    @NotNull(message = "La fecha de fin es obligatoria")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime fechaFin;

    private String urlImagenPrincipal;

    @NotBlank(message = "La ubicación es obligatoria")
    private String ubicacion;

    @NotBlank(message = "La categoría es obligatoria")
    private String categoria;

    @NotNull(message = "La visibilidad es obligatoria")
    private Boolean visibilidad;

    // --- NUEVA LISTA DE DTOs DE TICKET ---
    @NotNull(message = "Se debe especificar al menos un tipo de ticket")
    @NotEmpty(message = "La lista de tickets no puede estar vacía")
    @Valid // ¡MUY IMPORTANTE! Valida cada TicketCreacionDTO dentro de la lista
    private List<TicketCreacionDTO> tickets;

    // --- Constructores ---
    public EventoCreacionDTO() {
    }

    // --- Getters y Setters ---

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcionCorta() {
        return descripcionCorta;
    }

    public void setDescripcionCorta(String descripcionCorta) {
        this.descripcionCorta = descripcionCorta;
    }

    public String getDescripcionLarga() {
        return descripcionLarga;
    }

    public void setDescripcionLarga(String descripcionLarga) {
        this.descripcionLarga = descripcionLarga;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getUrlImagenPrincipal() {
        return urlImagenPrincipal;
    }

    public void setUrlImagenPrincipal(String urlImagenPrincipal) {
        this.urlImagenPrincipal = urlImagenPrincipal;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Boolean getVisibilidad() {
        return visibilidad;
    }

    public void setVisibilidad(Boolean visibilidad) {
        this.visibilidad = visibilidad;
    }

    public List<TicketCreacionDTO> getTickets() {
        return tickets;
    }

    public void setTickets(List<TicketCreacionDTO> tickets) {
        this.tickets = tickets;
    }
}