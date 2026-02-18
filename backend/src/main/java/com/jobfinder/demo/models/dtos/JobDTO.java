package com.jobfinder.demo.models.dtos;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Objeto de transferencia de datos para una oferta de trabajo (DTO)")
public class JobDTO {

    @Schema(description = "ID único interno (Base de Datos)", example = "1")
    private Long id;

    @Schema(description = "Título del puesto", example = "Senior Java Developer")
    private String title;

    @Schema(description = "Nombre de la empresa", example = "Tech Solutions Inc.")
    private String company;

    @Schema(description = "Modalidad de trabajo", example = "Remoto")
    private String type;

    @Schema(description = "Descripción detallada de la oferta", example = "Buscamos un desarrollador con experiencia en Spring Boot...")
    private String description;

    @Schema(description = "Puntaje de coincidencia con el usuario (si aplica)", example = "95%")
    private String matchScore;

    @Schema(description = "ID de la API externa (si proviene de fuera)", example = "remotive-23456")
    private String externalId;

    @Schema(description = "Enlace directo a la oferta original", example = "https://remotive.com/job/...")
    private String jobUrl;

    @Schema(description = "Lista de habilidades requeridas", example = "[\"Java\", \"Spring Boot\", \"MySQL\"]")
    private List<String> skills;
}