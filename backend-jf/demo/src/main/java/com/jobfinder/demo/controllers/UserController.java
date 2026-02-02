package com.jobfinder.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.demo.models.Job;
import com.jobfinder.demo.models.User;
import com.jobfinder.demo.models.dtos.JobDTO;
import com.jobfinder.demo.services.UserService;

// Imports de Swagger
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Usuarios", description = "Gestión de autenticación, perfiles, favoritos y postulaciones") // 👈 Título de
                                                                                                       // sección
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "Obtener perfil de usuario", description = "Devuelve la información completa del usuario por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Registrar nuevo usuario", description = "Crea una cuenta nueva. Valida que el email no exista.")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User newUser = userService.register(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error en el servidor");
        }
    }

    @Operation(summary = "Actualizar perfil", description = "Modifica datos del usuario como nombre, título, foto y skills")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);

        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al actualizar perfil: " + e.getMessage());
        }
    }

    @Operation(summary = "Iniciar sesión", description = "Verifica email y contraseña. Devuelve el usuario si es correcto.")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedUser = userService.login(user);

        if (loggedUser != null) {
            return ResponseEntity.ok(loggedUser);
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

    @Operation(summary = "Guardar/Quitar favorito (Toggle)", description = "Agrega o elimina un empleo de la lista de guardados del usuario")
    @PostMapping("/{userId}/save")
    public void toggleSaveJob(@PathVariable Long userId, @RequestBody JobDTO job) {
        userService.toggleSaveJob(userId, job);
    }

    @Operation(summary = "Aplicar a un empleo", description = "Registra que el usuario se ha postulado a una oferta específica")
    @PostMapping("/{id}/apply")
    public ResponseEntity<?> applyToJob(@PathVariable Long id, @RequestBody Job job) {
        try {
            userService.applyToJob(id, job);
            return ResponseEntity.ok("Aplicación registrada con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al aplicar: " + e.getMessage());
        }
    }

}