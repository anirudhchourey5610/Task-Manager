package com.example.taskmanager.service;

import com.example.taskmanager.entity.Project;
import com.example.taskmanager.entity.Role;
import com.example.taskmanager.entity.User;
import com.example.taskmanager.exception.ProjectNotFoundException;
import com.example.taskmanager.exception.UserNotFoundException;
import com.example.taskmanager.exception.UnauthorizedException;
import com.example.taskmanager.repository.ProjectRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(Project project, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
                
        if (user.getRole() != Role.ADMIN) {
            throw new UnauthorizedException("Only ADMIN can create projects");
        }
                
        project.setCreatedBy(user);
        return projectRepository.save(project);
    }

    public List<Project> getProjectsByUser(Long userId) {
        return projectRepository.findByCreatedById(userId);
    }

    public void deleteProject(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found"));
                
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        if (user.getRole() != Role.ADMIN || !project.getCreatedBy().getId().equals(userId)) {
            throw new UnauthorizedException("Unauthorized to delete project");
        }
        
        projectRepository.deleteById(projectId);
    }
}
