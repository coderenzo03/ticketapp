package com.tickets.ticketapp.dto;
import lombok.Data;

@Data
public class SolicitudLoginDTO {
    private String code;        // Ahora recibimos el código (ej: U222222053)
    private String password;
}
