package com.jobfinder.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobfinder.demo.mappers.JobMapper;
import com.jobfinder.demo.models.Job;
import com.jobfinder.demo.models.dtos.JobDTO;
import com.jobfinder.demo.repository.JobRepository;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobMapper jobMapper;

    @Override
    public List<JobDTO> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream()
                .map(job -> jobMapper.toDTO(job))
                .collect(Collectors.toList());
    }

    @Override
    public JobDTO createJob(JobDTO jobDTO) {
        Job job = jobMapper.toEntity(jobDTO);
        Job savedJob = jobRepository.save(job);
        return jobMapper.toDTO(savedJob);
    }

    @Override
    public JobDTO updateJob(Long id, JobDTO jobDTO) {
        Job job = jobRepository.findById(id).orElse(null);
        if (job != null) {
            job.setTitle(jobDTO.getTitle());
            job.setCompany(jobDTO.getCompany());
            job.setType(jobDTO.getType());
            job.setDescription(jobDTO.getDescription());
            job.setMatchScore(jobDTO.getMatchScore());

            Job updatedJob = jobRepository.save(job);
            return jobMapper.toDTO(updatedJob);
        }
        return null;
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public JobDTO getJobById(String id) {
        Job job = null;

        try {
            Long dbId = Long.parseLong(id);
            job = jobRepository.findById(dbId).orElse(null);
        } catch (NumberFormatException e) {
        }

        if (job == null) {
            job = jobRepository.findByExternalId(id)
                    .orElseThrow(() -> new RuntimeException("Trabajo no encontrado con id: " + id));
        }

        return jobMapper.toDTO(job);
    }
}