package com.example.taskmanager.dto;

public class DashboardSummaryDTO {
    private long total;
    private long pending;
    private long completed;
    private long inProgress;

    public DashboardSummaryDTO() {
    }

    public DashboardSummaryDTO(long total, long pending, long completed, long inProgress) {
        this.total = total;
        this.pending = pending;
        this.completed = completed;
        this.inProgress = inProgress;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getPending() {
        return pending;
    }

    public void setPending(long pending) {
        this.pending = pending;
    }

    public long getCompleted() {
        return completed;
    }

    public void setCompleted(long completed) {
        this.completed = completed;
    }

    public long getInProgress() {
        return inProgress;
    }

    public void setInProgress(long inProgress) {
        this.inProgress = inProgress;
    }
}
