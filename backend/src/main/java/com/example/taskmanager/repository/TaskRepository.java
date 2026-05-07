package com.example.taskmanager.repository;

import com.example.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.taskmanager.entity.Status;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedToId(Long userId);
    
    List<Task> findByCreatedBy_Id(Long adminId);
    
    long countByAssignedToId(Long userId);
    
    long countByCreatedBy_Id(Long adminId);
    
    long countByCreatedBy_IdAndStatus(Long adminId, Status status);
    
    long countByAssignedToIdAndStatus(Long userId, Status status);
    
    List<Task> findByAssignedToIdAndDueDateBeforeAndStatusNot(Long userId, LocalDate date, Status status);
    
    List<Task> findByAssignedToIdAndStatus(Long userId, Status status);
    
    List<Task> findByProject_IdAndAssignedTo_Id(Long projectId, Long userId);
}
