package com.jobfinder.demo.models;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "jobs")
@Data
@Schema(description = "Entidad que representa una oferta de trabajo guardada en la base de datos")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único autogenerado", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Título del puesto", example = "Senior Backend Developer")
    private String title;

    @Schema(description = "Nombre de la empresa", example = "Tech Corp")
    private String company;

    @Schema(description = "Modalidad de trabajo", example = "Full Time")
    private String type;

    @Schema(description = "Identificador de la fuente externa (si aplica)", example = "remotive-12345")
    private String externalId;

    @Column(name = "job_url")
    @Schema(description = "Enlace original a la oferta", example = "https://company.com/careers/job1")
    private String jobUrl;

    @Column(columnDefinition = "LONGTEXT")
    @Schema(description = "Descripción completa del empleo", example = "Estamos buscando un experto en Java y Spring Boot...")
    private String description;

    @Schema(description = "Porcentaje de coincidencia con el usuario", example = "95%")
    private String matchScore;

    @ElementCollection
    @Schema(description = "Lista de habilidades requeridas", example = "[\"Java\", \"Spring Boot\", \"Docker\"]")
    private List<String> skills;

}