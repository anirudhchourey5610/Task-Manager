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

import static java.util.stream.Collectors.toList;

@Service
public class DashboardService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public DashboardService(TaskRepository taskRepository, ProjectRepository projectRepository,
            UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public DashboardSummaryDTO getSummary(Long adminId) {
        long total = taskRepository.findByAdminId(adminId).size();
        long pending = taskRepository.findByAdminId(adminId).stream().filter(t -> t.getStatus() == Status.PENDING)
                .count();
        long inProgress = taskRepository.findByAdminId(adminId).stream()
                .filter(t -> t.getStatus() == Status.IN_PROGRESS).count();
        long completed = taskRepository.findByAdminId(adminId).stream().filter(t -> t.getStatus() == Status.COMPLETED)
                .count();
        return new DashboardSummaryDTO(total, pending, completed, inProgress);
    }

    public List<ProjectTaskCountDTO> getProjectTaskCounts(Long adminId) {
        return projectRepository.findByAdminId(adminId).stream()
                .map(project -> new ProjectTaskCountDTO(project.getId(), project.getName(),
                        taskRepository.findByAdminId(adminId).stream()
                                .filter(t -> t.getProject().getId().equals(project.getId())).count()))
                .collect(toList());
    }
}
