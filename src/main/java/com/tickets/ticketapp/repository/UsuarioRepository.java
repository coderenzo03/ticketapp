package com.tickets.ticketapp.repository;

import com.tickets.ticketapp.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Buscar usuario por email
    Optional<Usuario> findByEmail(String email);
}
