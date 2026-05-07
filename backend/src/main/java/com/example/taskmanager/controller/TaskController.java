package com.example.taskmanager.controller;

import com.example.taskmanager.entity.Task;
import com.example.taskmanager.entity.Status;
import com.example.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @Valid @RequestBody Task task,
            @RequestHeader(value = "userId", required = false) Long userId) {
            
        if (userId == null) {
            throw new IllegalArgumentException("User ID header is required");
        }
        task.setUserId(userId);
        
        Task savedTask = taskService.createTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getTasksByUser(@PathVariable Long userId) {
        List<Task> tasks = taskService.getTasksByUser(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Task>> getOverdueTasks(@RequestHeader(value = "userId", required = false) Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID header is required");
        }
        List<Task> tasks = taskService.getOverdueTasks(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(
            @PathVariable Status status,
            @RequestHeader(value = "userId", required = false) Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID header is required");
        }
        List<Task> tasks = taskService.getTasksByStatus(userId, status);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getTasksByProject(
            @PathVariable Long projectId,
            @RequestHeader(value = "userId", required = false) Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID header is required");
        }
        List<Task> tasks = taskService.getTasksByProject(projectId, userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(@RequestHeader(value = "userId", required = false) Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID header is required");
        }
        List<Task> tasks = taskService.getAllTasks(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id, 
            @Valid @RequestBody Task taskDetails,
            @RequestHeader(value = "userId", required = false) Long userId) {
            
        if (userId == null) {
            throw new IllegalArgumentException("User ID header is required");
        }
        taskDetails.setUserId(userId);
        
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
