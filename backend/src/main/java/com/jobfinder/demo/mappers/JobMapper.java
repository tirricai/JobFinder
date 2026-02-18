package com.jobfinder.demo.mappers;

import org.springframework.stereotype.Component;

import com.jobfinder.demo.models.Job;
import com.jobfinder.demo.models.dtos.JobDTO;

@Component
public class JobMapper {

    public JobDTO toDTO(Job job) {
        if (job == null)
            return null;

        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setType(job.getType());
        dto.setExternalId(job.getExternalId());
        dto.setDescription(job.getDescription());
        dto.setMatchScore(job.getMatchScore());
        dto.setSkills(job.getSkills());
        return dto;
    }

    public Job toEntity(JobDTO dto) {
        if (dto == null)
            return null;

        Job job = new Job();
        job.setTitle(dto.getTitle());
        job.setExternalId(dto.getExternalId());
        job.setCompany(dto.getCompany());
        job.setType(dto.getType());
        job.setDescription(dto.getDescription());
        job.setMatchScore(dto.getMatchScore());
        job.setSkills(dto.getSkills());
        return job;
    }
}