package com.example.taskmanager.controller;

import com.example.taskmanager.dto.DashboardSummaryDTO;
import com.example.taskmanager.dto.ProjectTaskCountDTO;
import com.example.taskmanager.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getSummary(@RequestHeader(value = "adminId") Long adminId) {
        if (adminId == null) {
            throw new IllegalArgumentException("Admin ID header is required");
        }
        DashboardSummaryDTO summary = dashboardService.getSummary(adminId);
        return new ResponseEntity<>(summary, HttpStatus.OK);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectTaskCountDTO>> getProjectTaskCounts(
            @RequestHeader(value = "adminId") Long adminId) {
        if (adminId == null) {
            throw new IllegalArgumentException("Admin ID header is required");
        }
        List<ProjectTaskCountDTO> projectCounts = dashboardService.getProjectTaskCounts(adminId);
        return new ResponseEntity<>(projectCounts, HttpStatus.OK);
    }
}
