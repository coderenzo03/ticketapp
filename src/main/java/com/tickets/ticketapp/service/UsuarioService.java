
package com.tickets.ticketapp.service;

import com.tickets.ticketapp.model.Usuario;
import com.tickets.ticketapp.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
// Se elimina el import de org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// Importa para lanzar excepciones si quieres un manejo más específico
import org.springframework.dao.DataIntegrityViolationException;
import java.util.Optional; // Para manejar findById de forma segura

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    // Se elimina la declaración de passwordEncoder

    // Inyección de dependencias a través del constructor
    // Ahora solo inyectamos UsuarioRepository
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        // Se elimina la inicialización de passwordEncoder
    }

    // Método para registrar un nuevo usuario (sin encriptación)
    public Usuario registrarUsuario(Usuario usuario) {
        // 1. Verificar si el email ya existe antes de intentar guardar
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            // Puedes lanzar una excepción personalizada o una de Spring
            throw new DataIntegrityViolationException("El email '" + usuario.getEmail() + "' ya está registrado.");
        }

        // 2. La contraseña NO se encripta, se guarda tal cual.
        // usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena())); // Esta línea se elimina o comenta

        // 3. Guardar el usuario en la base de datos
        return usuarioRepository.save(usuario);
    }

    // --- Métodos existentes (adaptados si es necesario) ---

    // Autenticar usuario (ahora compara contraseñas sin hashear)
    public Usuario autenticar(String email, String contrasena) {
        Usuario usuario = usuarioRepository.findByEmail(email);

        // La comparación ahora es directa (sin passwordEncoder.matches)
        if (usuario != null && usuario.getContrasena().equals(contrasena)) {
            return usuario;
        }
        return null;
    }

    // Verificar si existe email
    public boolean existeEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    // Buscar usuario por email
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Buscar usuario por ID
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}