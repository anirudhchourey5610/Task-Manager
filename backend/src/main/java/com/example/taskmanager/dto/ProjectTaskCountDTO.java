package com.example.taskmanager.dto;

public class ProjectTaskCountDTO {
    private Long projectId;
    private String projectName;
    private long taskCount;

    public ProjectTaskCountDTO() {
    }

    public ProjectTaskCountDTO(Long projectId, String projectName, long taskCount) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.taskCount = taskCount;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public long getTaskCount() {
        return taskCount;
    }

    public void setTaskCount(long taskCount) {
        this.taskCount = taskCount;
    }
}
