package com.jobfinder.demo.services;

import com.jobfinder.demo.models.Job;
import com.jobfinder.demo.models.User;
import com.jobfinder.demo.models.dtos.JobDTO;

public interface UserService {

    User login(User user);

    User updateUser(Long id, User userDetails);

    User getUserById(Long id);

    void toggleSaveJob(Long userId, JobDTO jobDTO);

    User register(User user);

    void applyToJob(Long userId, Job job);
}