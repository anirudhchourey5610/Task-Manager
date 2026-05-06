package com.example.taskmanager.service;

import com.example.taskmanager.dto.DashboardSummaryDTO;
import com.example.taskmanager.dto.ProjectTaskCountDTO;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.entity.Role;
import com.example.taskmanager.entity.User;
import com.example.taskmanager.exception.UserNotFoundException;
import com.example.taskmanager.repository.ProjectRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public DashboardService(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public DashboardSummaryDTO getSummary(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            long total = taskRepository.count();
            long pending = taskRepository.countByStatus(Status.PENDING);
            long inProgress = taskRepository.countByStatus(Status.IN_PROGRESS);
            long completed = taskRepository.countByStatus(Status.COMPLETED);
            return new DashboardSummaryDTO(total, pending, completed, inProgress);
        } else {
            long total = taskRepository.countByAssignedToId(userId);
            long pending = taskRepository.countByAssignedToIdAndStatus(userId, Status.PENDING);
            long inProgress = taskRepository.countByAssignedToIdAndStatus(userId, Status.IN_PROGRESS);
            long completed = taskRepository.countByAssignedToIdAndStatus(userId, Status.COMPLETED);
            return new DashboardSummaryDTO(total, pending, completed, inProgress);
        }
    }

    public List<ProjectTaskCountDTO> getProjectTaskCounts(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            return projectRepository.countAllTasksByProject();
        }
        return projectRepository.countTasksByProject(userId);
    }
}
