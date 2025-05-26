package com.tickets.ticketapp.repository;

import com.tickets.ticketapp.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Buscar usuario por email
    Usuario findByEmail(String email);

    // Verificar si existe un email
    boolean existsByEmail(String email);
}
