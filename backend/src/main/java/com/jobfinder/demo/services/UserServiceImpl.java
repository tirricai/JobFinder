package com.jobfinder.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobfinder.demo.mappers.JobMapper;
import com.jobfinder.demo.models.Job;
import com.jobfinder.demo.models.User;
import com.jobfinder.demo.models.dtos.JobDTO;
import com.jobfinder.demo.repository.JobRepository;
import com.jobfinder.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobMapper jobMapper;

    @Override
    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("El usuario ya existe con ese email");
        }

        // Foto vacia para new user
        if (user.getProfilePicture() == null) {
            user.setProfilePicture("");
        }

        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void toggleSaveJob(Long userId, JobDTO jobDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Job jobToSave = null;

        // ExternalID que viene desde la api
        if (jobDTO.getExternalId() != null) {
            // Verifico si ya no esta guardado
            jobToSave = jobRepository.findByExternalId(jobDTO.getExternalId()).orElse(null);

            // Si no existe, lo creo
            if (jobToSave == null) {
                jobToSave = jobMapper.toEntity(jobDTO);
                jobToSave = jobRepository.save(jobToSave);
            }
        }

        if (jobToSave == null) {
            System.out.println("ERROR: No se pudo identificar el trabajo.");
            return;
        }

        // Logica del toggle
        if (user.getSavedJobs().contains(jobToSave)) {
            user.getSavedJobs().remove(jobToSave);
        } else {
            user.getSavedJobs().add(jobToSave);
        }

        userRepository.save(user);
    }

    @Override
    public User login(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail())
                .orElse(null);

        // Verifico si existe
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return foundUser;
        }

        return null;
    }

    // BUSCAR POR ID
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    // ACTUALIZAR
    @Override
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        if (userDetails.getFullName() != null) {
            user.setFullName(userDetails.getFullName());
        }
        if (userDetails.getTitle() != null) {
            user.setTitle(userDetails.getTitle());
        }

        if (userDetails.getProfilePicture() != null) {
            user.setProfilePicture(userDetails.getProfilePicture());
        }

        if (userDetails.getSkills() != null) {
            user.setSkills(userDetails.getSkills());
        }

        return userRepository.save(user);
    }

    @Override
    public void applyToJob(Long userId, Job job) {
        User user = userRepository.findById(userId).orElseThrow();

        // Verifico si ya existe o si es nuevo
        Job tempJob = jobRepository.findByExternalId(job.getExternalId())
                .orElse(job);

        if (tempJob.getId() == null) {
            tempJob = jobRepository.save(tempJob);
        }
        // Uso una variable final para asegurarle a java que esta variable no cambiara
        final Job jobFinal = tempJob;

        boolean alreadyApplied = user.getAppliedJobs().stream()
                .anyMatch(j -> j.getId().equals(jobFinal.getId()));

        if (!alreadyApplied) {
            user.getAppliedJobs().add(jobFinal);
            userRepository.save(user);
        }
    }
}