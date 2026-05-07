package com.example.taskmanager.controller;

import com.example.taskmanager.dto.ProjectRequest;

import com.example.taskmanager.entity.Project;
import com.example.taskmanager.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @Valid @RequestBody Project project,
            @RequestHeader(value = "userId") Long userId,
            @RequestHeader(value = "adminId") Long adminId) {

        Project savedProject = projectService.createProject(project, userId, adminId);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Project>> getProjectsByUser(
            @PathVariable Long userId,
            @RequestHeader(value = "adminId") Long adminId) {

        List<Project> projects = projectService.getProjectsByUser(userId, adminId);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long projectId,
            @RequestHeader(value = "userId", required = false) Long userId) {

        if (userId == null) {
            throw new IllegalArgumentException("User ID header is required");
        }
        projectService.deleteProject(projectId, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
