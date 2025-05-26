package com.tickets.ticketapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios_admin")
public class AdminUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email; // Debe ser @joinnus.admin.com

    // Constructor vacío (necesario para JPA)
    public AdminUser() {
    }

    // Constructor con campos para facilitar la creación
    public AdminUser(String fullName, String email) {
        this.fullName = fullName;
        this.email = email;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Override
    public String toString() {
        return "AdminUser{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}