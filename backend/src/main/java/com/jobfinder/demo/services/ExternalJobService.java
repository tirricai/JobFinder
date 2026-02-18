package com.jobfinder.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jobfinder.demo.models.dtos.JobDTO;

@Service
public class ExternalJobService {

    @Autowired
    private RestTemplate restTemplate;

    private final String API_KEY = "7bd9f82eb0mshc231b49668359e2p170f8cjsnec03783c9f1b";
    private final String API_HOST = "jsearch.p.rapidapi.com";

    @SuppressWarnings("unchecked")
    public List<JobDTO> fetchJobsFromApi(String query) {
        String url = "https://jsearch.p.rapidapi.com/search?query=" + query + "&num_pages=1";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", API_KEY);
        headers.set("X-RapidAPI-Host", API_HOST);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    });

            Map<String, Object> body = response.getBody();

            // Obtengo la lista de data
            List<Map<String, Object>> data = (List<Map<String, Object>>) body.get("data");
            List<JobDTO> jobList = new ArrayList<>();

            if (data != null) {
                for (Map<String, Object> item : data) {
                    JobDTO job = new JobDTO();

                    // Mapeo de campos
                    job.setExternalId((String) item.get("job_id"));
                    job.setTitle((String) item.getOrDefault("job_title", "Sin título"));
                    job.setCompany((String) item.getOrDefault("employer_name", "Confidencial"));
                    job.setDescription((String) item.getOrDefault("job_description", "Sin descripción disponible."));

                    // Lógica para Remoto vs Presencial
                    Boolean isRemote = (Boolean) item.get("job_is_remote");
                    job.setType(isRemote != null && isRemote ? "Remoto" : "Presencial");

                    // Valor por defecto para ofertas externas
                    job.setMatchScore("Externo");

                    // Capturo el link
                    job.setJobUrl((String) item.get("job_apply_link"));
                    System.out.println(
                            jobList.add(job));
                }
            }
            return jobList;

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}