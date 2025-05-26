package com.tickets.ticketapp.dto;

public class EventoDTO {

    private String imagenUrl;
    private String tipoEvento; // Por ejemplo: "Festival de Comedia", "Concierto"
    private String nombreEvento;
    private String fecha;
    private String precioMinimoEntrada; // Se mantiene como String para flexibilidad, por ejemplo "S/ 40.00"

    // Constructor vacío
    public EventoDTO() {
    }

    // Constructor con todos los campos
    public EventoDTO(String imagenUrl, String tipoEvento, String nombreEvento, String fecha, String precioMinimoEntrada) {
        this.imagenUrl = imagenUrl;
        this.tipoEvento = tipoEvento;
        this.nombreEvento = nombreEvento;
        this.fecha = fecha;
        this.precioMinimoEntrada = precioMinimoEntrada;
    }

    // Métodos Getter y Setter para cada propiedad

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getNombreEvento() {
        return nombreEvento;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getPrecioMinimoEntrada() {
        return precioMinimoEntrada;
    }

    public void setPrecioMinimoEntrada(String precioMinimoEntrada) {
        this.precioMinimoEntrada = precioMinimoEntrada;
    }

    @Override
    public String toString() {
        return "EventoDTO{" +
                "imagenUrl='" + imagenUrl + '\'' +
                ", tipoEvento='" + tipoEvento + '\'' +
                ", nombreEvento='" + nombreEvento + '\'' +
                ", fecha='" + fecha + '\'' +
                ", precioMinimoEntrada='" + precioMinimoEntrada + '\'' +
                '}';
    }
}