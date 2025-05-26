package com.tickets.ticketapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.math.BigDecimal;

public class TicketCreacionDTO {

    @NotBlank(message = "El nombre del tipo de ticket es obligatorio")
    private String nombre;

    @NotNull(message = "El precio del ticket es obligatorio")
    @Min(value = 0, message = "El precio del ticket no puede ser negativo")
    private BigDecimal precio;

    @NotNull(message = "La cantidad total de tickets es obligatoria")
    @Min(value = 1, message = "Debe haber al menos 1 ticket disponible")
    private Integer cantidadTotal;

    // Constructor vacío
    public TicketCreacionDTO() {
    }

    // Getters y Setters
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
}