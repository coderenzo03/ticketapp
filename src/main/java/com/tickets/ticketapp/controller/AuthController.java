package com.tickets.ticketapp.controller;

import com.tickets.ticketapp.model.Usuario;
import com.tickets.ticketapp.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Registro de un nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        // Aquí puedes realizar validaciones o checks de duplicado de email si es necesario
        Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // Aquí podrías agregar otros métodos, como login, etc.
}
