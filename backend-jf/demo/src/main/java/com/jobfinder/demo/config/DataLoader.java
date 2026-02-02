package com.jobfinder.demo.config;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;

import com.jobfinder.demo.models.Job;
import com.jobfinder.demo.repository.JobRepository;

//@Component
public class DataLoader implements CommandLineRunner {

    private final JobRepository jobRepository;

    public DataLoader(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (jobRepository.count() == 0) {
            System.out.println("🌱 Cargando ofertas de ejemplo universales...");

            // 1. VENDEDOR (Comercial)
            Job job1 = new Job();
            job1.setTitle("Ejecutivo de Ventas / Atención al Cliente");
            job1.setCompany("Movistar");
            job1.setType("Presencial");
            job1.setMatchScore("Ejemplo"); // Usamos "Ejemplo" en lugar de % para ser genéricos
            job1.setDescription(
                    "Buscamos personas proactivas para atención al cliente y ventas en sucursal céntrica. Se ofrece capacitación paga y comisiones.");
            job1.setExternalId("demo-001");
            job1.setJobUrl("https://empleos.movistar.com.ar/");

            // 2. ADMINISTRATIVO (Oficina)
            Job job2 = new Job();
            job2.setTitle("Asistente Administrativo Contable");
            job2.setCompany("Estudio Martínez & Asoc.");
            job2.setType("Híbrido");
            job2.setMatchScore("Ejemplo");
            job2.setDescription(
                    "Tareas generales de oficina, facturación, manejo de Excel y trato con proveedores. Experiencia mínima de 1 año.");
            job2.setExternalId("demo-002");
            job2.setJobUrl("https://www.zonajobs.com.ar/");

            // 3. LOGÍSTICA (Operativo)
            Job job3 = new Job();
            job3.setTitle("Chófer de Reparto / Logística");
            job3.setCompany("Mercado Libre Envíos");
            job3.setType("Presencial");
            job3.setMatchScore("Ejemplo");
            job3.setDescription(
                    "Reparto de paquetería en zona norte. Requisitos: Licencia de conducir al día y disponibilidad horaria.");
            job3.setExternalId("demo-003");
            job3.setJobUrl("https://envios.mercadolibre.com.ar/");

            jobRepository.saveAll(Arrays.asList(job1, job2, job3));
            System.out.println("✅ Datos universales cargados.");
        }
    }
}