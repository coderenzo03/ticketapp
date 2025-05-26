package com.tickets.ticketapp.repository;

import com.tickets.ticketapp.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // Aquí puedes añadir métodos de consulta específicos para tickets si los necesitas
    // Por ejemplo: List<Ticket> findByEventoId(Long eventoId);
}