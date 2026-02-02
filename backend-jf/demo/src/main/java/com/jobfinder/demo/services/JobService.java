package com.jobfinder.demo.services;

import java.util.List;

import com.jobfinder.demo.models.dtos.JobDTO;

public interface JobService {
    List<JobDTO> getAllJobs();

    JobDTO createJob(JobDTO jobDTO);

    JobDTO updateJob(Long id, JobDTO jobDTO);

    void deleteJob(Long id);

    JobDTO getJobById(String id);
}