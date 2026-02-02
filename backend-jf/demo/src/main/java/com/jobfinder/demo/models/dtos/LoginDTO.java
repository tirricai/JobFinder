package com.jobfinder.demo.models.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public class LoginDTO {

    @Schema(description = "Correo electrónico registrado", example = "usuario@demo.com")
    private String email;
    @Schema(description = "Contraseña del usuario", example = "123456")
    private String password;

    public LoginDTO() {
    }

    public LoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}