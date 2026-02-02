package com.jobfinder.demo.models;

import java.util.ArrayList;
import java.util.List;

// Importaciones de Swagger
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
@Schema(description = "Entidad que representa a un usuario, candidato o reclutador")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único autogenerado", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Nombre y apellido del usuario", example = "Juan Pérez")
    private String fullName;

    @Schema(description = "Título profesional o cargo actual", example = "Full Stack Developer")
    private String title;

    @Schema(description = "Correo electrónico único", example = "juan@example.com")
    private String email;

    @Schema(description = "Contraseña del usuario (Encriptada internamente)", example = "secret123", accessMode = Schema.AccessMode.WRITE_ONLY)
    private String password;

    @Schema(description = "Ubicación actual", example = "Buenos Aires, Argentina")
    private String location;

    @Lob
    @Column(name = "profile_picture", columnDefinition = "LONGTEXT")
    @Schema(description = "URL de la imagen o cadena Base64", example = "https://ui-avatars.com/api/?name=Juan+Perez")
    private String profilePicture;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_saved_jobs", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "job_id"))
    @Schema(description = "Lista de empleos guardados como favoritos")
    private List<Job> savedJobs = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_applied_jobs", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "job_id"))
    @Schema(description = "Historial de empleos a los que se ha postulado")
    private List<Job> appliedJobs = new ArrayList<>();

    @Column(length = 1000)
    @Schema(description = "Biografía o resumen profesional", example = "Apasionado por el desarrollo de software con 5 años de experiencia...")
    private String bio;

    @Schema(description = "Años de experiencia", example = "5")
    private int experience;

    @ElementCollection
    @Schema(description = "Lista de habilidades técnicas", example = "[\"Java\", \"Spring Boot\", \"React\", \"MySQL\"]")
    private List<String> skills;
}