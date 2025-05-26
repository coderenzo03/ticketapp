package com.tickets.ticketapp.repository;

import com.tickets.ticketapp.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    // Método de consulta derivado para obtener eventos con visibilidad = true
    // Spring Data JPA automáticamente genera la implementación para este método
    List<Evento> findByVisibilidadTrue();

    // Puedes añadir más métodos personalizados si necesitas consultas específicas
}