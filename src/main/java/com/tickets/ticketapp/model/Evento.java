package com.tickets.ticketapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.math.BigDecimal; // Aunque no esté directamente aquí, Ticket lo usará
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "eventos")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Lob
    private String descripcionCorta;

    @Lob
    private String descripcionLarga;

    @Column(nullable = false)
    private LocalDateTime fechaInicio;

    @Column(nullable = false)
    private LocalDateTime fechaFin;

    private String urlImagenPrincipal;

    @Column(nullable = false)
    private String ubicacion;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false)
    private Boolean visibilidad;

    // --- NUEVA RELACIÓN CON LA ENTIDAD TICKET ---
    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    // - mappedBy = "evento": Indica que la relación es bidireccional y el campo "evento" en la entidad Ticket
    //   es el dueño de la relación. Esto evita que JPA cree una tabla de unión extra.
    // - cascade = CascadeType.ALL: Significa que si se realiza una operación (persist, merge, remove) en Evento,
    //   esta se "cascaderá" a los objetos Ticket asociados.
    //   Si guardas un Evento, sus Tickets se guardan. Si eliminas un Evento, sus Tickets también se eliminan.
    // - orphanRemoval = true: Si un Ticket se desvincula de un Evento (ej. si lo eliminas de la colección),
    //   se elimina de la base de datos.
    // - fetch = FetchType.LAZY: Los tickets asociados no se cargan de la base de datos hasta que se acceden.
    //   Esto es más eficiente para evitar cargar datos innecesarios.
    private Set<Ticket> tickets = new HashSet<>(); // Usa un Set para asegurar tickets únicos

    // Constructor vacío
    public Evento() {
    }

    // --- Métodos de utilidad para manejar la relación con Ticket ---
    public void addTicket(Ticket ticket) {
        this.tickets.add(ticket);
        ticket.setEvento(this); // Establece la relación inversa
    }

    public void removeTicket(Ticket ticket) {
        this.tickets.remove(ticket);
        ticket.setEvento(null); // Rompe la relación inversa
    }

    // --- Getters y Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }
}