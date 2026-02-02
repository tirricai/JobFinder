package com.jobfinder.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.demo.models.dtos.JobDTO;
import com.jobfinder.demo.services.ExternalJobService;
import com.jobfinder.demo.services.JobService;

// Importaciones de Swagger
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Ofertas de Trabajo", description = "Controlador para gestionar, buscar y crear empleos") // 👈 Título de la
                                                                                                      // sección
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private ExternalJobService externalJobService;

    @Operation(summary = "Listar todos los trabajos", description = "Obtiene todos los trabajos guardados en la base de datos local")
    @GetMapping
    public List<JobDTO> getAllJobs() {
        return jobService.getAllJobs();
    }

    @Operation(summary = "Buscar empleos externos", description = "Consulta una API externa (o simulada) para buscar ofertas por palabra clave")
    @GetMapping("/external/{query}")
    public List<JobDTO> searchExternalJobs(@PathVariable String query) {
        return externalJobService.fetchJobsFromApi(query);
    }

    @Operation(summary = "Obtener trabajo por ID", description = "Busca un trabajo por su ID numérico (BD) o ID externo (String)")
    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable String id) {
        try {
            JobDTO jobDto = jobService.getJobById(id);
            return ResponseEntity.ok(jobDto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Crear nuevo trabajo", description = "Guarda una nueva oferta de trabajo en la base de datos")
    @PostMapping
    public JobDTO createJob(@RequestBody JobDTO job) {
        return jobService.createJob(job);
    }

    @Operation(summary = "Actualizar trabajo", description = "Actualiza los datos de una oferta existente por su ID")
    @PutMapping("/{id}")
    public JobDTO updateJob(@PathVariable Long id, @RequestBody JobDTO job) {
        return jobService.updateJob(id, job);
    }

    @Operation(summary = "Eliminar trabajo", description = "Elimina una oferta de trabajo de la base de datos")
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }
}