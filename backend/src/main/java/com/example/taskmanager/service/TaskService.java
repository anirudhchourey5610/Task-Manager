package com.example.taskmanager.service;

import com.example.taskmanager.entity.Task;
import com.example.taskmanager.entity.Role;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.exception.ProjectNotFoundException;
import com.example.taskmanager.exception.UserNotFoundException;
import com.example.taskmanager.exception.UnauthorizedException;
import com.example.taskmanager.exception.TaskNotFoundException;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public Task createTask(Task task) {
        if (task.getStatus() == null) {
            task.setStatus(Status.PENDING);
        }
        
        if (task.getAssignedUserId() != null) {
            if (task.getUserId() == null) {
                throw new UnauthorizedException("Current userId is required to assign tasks");
            }
            com.example.taskmanager.entity.User currentUser = userRepository.findById(task.getUserId())
                    .orElseThrow(() -> new UserNotFoundException("Current user not found"));
            
            if (currentUser.getRole() != Role.ADMIN) {
                throw new UnauthorizedException("Only ADMIN can assign tasks");
            }

            com.example.taskmanager.entity.User assignedUser = userRepository.findById(task.getAssignedUserId())
                    .orElseThrow(() -> new UserNotFoundException("Assigned user not found"));
            task.setAssignedTo(assignedUser);
        }

        com.example.taskmanager.entity.User currentUser = userRepository.findById(task.getUserId())
                .orElseThrow(() -> new UserNotFoundException("Current user not found"));
        task.setCreatedBy(currentUser);

        if (task.getProjectId() != null) {
            com.example.taskmanager.entity.Project project = projectRepository.findById(task.getProjectId())
                    .orElseThrow(() -> new ProjectNotFoundException("Project not found"));
            task.setProject(project);
        }
        
        return taskRepository.save(task);
    }

    public List<Task> getTasksByUser(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    public List<Task> getOverdueTasks(Long userId) {
        return taskRepository.findByAssignedToIdAndDueDateBeforeAndStatusNot(userId, java.time.LocalDate.now(), Status.COMPLETED);
    }

    public List<Task> getTasksByStatus(Long userId, Status status) {
        return taskRepository.findByAssignedToIdAndStatus(userId, status);
    }

    public List<Task> getTasksByProject(Long projectId, Long userId) {
        return taskRepository.findByProject_IdAndAssignedTo_Id(projectId, userId);
    }

    public List<Task> getAllTasks(Long adminId) {
        return taskRepository.findByCreatedBy_Id(adminId);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task with id " + id + " not found"));
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = getTaskById(id);

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        if (taskDetails.getStatus() != null) {
            task.setStatus(taskDetails.getStatus());
        }
        if (taskDetails.getDueDate() != null) {
            task.setDueDate(taskDetails.getDueDate());
        }
        
        if (taskDetails.getAssignedUserId() != null) {
            if (taskDetails.getUserId() == null) {
                throw new UnauthorizedException("Current userId is required to assign tasks");
            }
            com.example.taskmanager.entity.User currentUser = userRepository.findById(taskDetails.getUserId())
                    .orElseThrow(() -> new UserNotFoundException("Current user not found"));
            
            if (currentUser.getRole() != Role.ADMIN) {
                throw new UnauthorizedException("Only ADMIN can assign tasks");
            }

            com.example.taskmanager.entity.User assignedUser = userRepository.findById(taskDetails.getAssignedUserId())
                    .orElseThrow(() -> new UserNotFoundException("Assigned user not found"));
            task.setAssignedTo(assignedUser);
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }
}
