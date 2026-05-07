package com.example.taskmanager.controller;

import com.example.taskmanager.repository.ProjectRepository;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TEMPORARY DEBUG ENDPOINT - REMOVE AFTER USE
 * This controller provides a way to reset the database to a clean state
 * when direct SQL access is restricted.
 */
@RestController
@RequestMapping("/api/debug")
public class DebugController {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public DebugController(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("DEBUG ACTIVE");
    }

    @DeleteMapping("/reset-database")
    public ResponseEntity<String> resetDatabase() {
        try {
            // Delete in correct order to respect foreign key constraints
            taskRepository.deleteAll();
            projectRepository.deleteAll();
            userRepository.deleteAll();
            
            return ResponseEntity.ok("Database reset successful. All tasks, projects, and users deleted.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Database reset failed: " + e.getMessage());
        }
    }
}
