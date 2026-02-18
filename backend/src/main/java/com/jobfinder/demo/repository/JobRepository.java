package com.jobfinder.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobfinder.demo.models.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByExternalId(String externalId);
}