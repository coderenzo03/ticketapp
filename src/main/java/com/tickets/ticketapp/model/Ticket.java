package com.tickets.ticketapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tickets") // Especifica el nombre de la tabla para los tickets
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre; // Ej: "Entrada General", "Zona VIP", "Estudiante"

    @Column(nullable = false, precision = 10, scale = 2) // Precio del ticket
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer cantidadTotal; // Cantidad total de este tipo de ticket disponible

    @Column(nullable = false)
    private Integer cantidadVendida = 0; // Cantidad de este tipo de ticket vendida, inicializa en 0

    // --- NUEVA RELACIÓN CON LA ENTIDAD EVENTO ---
    @ManyToOne(fetch = FetchType.LAZY) // Muchos Tickets pueden pertenecer a un Evento
    @JoinColumn(name = "evento_id", nullable = false) // Columna FK en la tabla 'tickets' que referencia a 'eventos'
    private Evento evento;

    // Constructor vacío
    public Ticket() {
    }

    // Constructor para facilidad de creación (sin ID ni evento, que se asignan después)
    public Ticket(String nombre, BigDecimal precio, Integer cantidadTotal) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidadTotal = cantidadTotal;
        this.cantidadVendida = 0; // Asegura que se inicializa en 0
    }

    // --- Getters y Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getCantidadTotal() {
        return cantidadTotal;
    }

    public void setCantidadTotal(Integer cantidadTotal) {
        this.cantidadTotal = cantidadTotal;
    }

    public Integer getCantidadVendida() {
        return cantidadVendida;
    }

    public void setCantidadVendida(Integer cantidadVendida) {
        this.cantidadVendida = cantidadVendida;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    // Override de equals y hashCode si necesitas que el Set de Evento funcione correctamente
    // Aunque con un HashSet, si los tickets se añaden y no se modifican sus ID's, debería funcionar.
    // Para relaciones bidireccionales, es buena práctica si la colección se usa para buscar/comparar.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return id != null && id.equals(ticket.id);
    }

    @Override
    public int hashCode() {
        return 31; // Constante si usas ID para equals, o usa Objects.hash(id);
    }
}