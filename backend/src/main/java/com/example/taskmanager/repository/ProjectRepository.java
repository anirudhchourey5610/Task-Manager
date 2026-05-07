package com.example.taskmanager.repository;

import com.example.taskmanager.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taskmanager.dto.ProjectTaskCountDTO;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
       List<Project> findByCreatedById(Long userId);

       List<Project> findByAdminId(Long adminId);

       @Query("SELECT new com.example.taskmanager.dto.ProjectTaskCountDTO(p.id, p.name, COUNT(t.id)) " +
                     "FROM Project p LEFT JOIN Task t ON t.project = p " +
                     "WHERE p.createdBy.id = :userId " +
                     "GROUP BY p.id, p.name")
       List<ProjectTaskCountDTO> countTasksByProject(@Param("userId") Long userId);

       @Query("SELECT new com.example.taskmanager.dto.ProjectTaskCountDTO(p.id, p.name, COUNT(t.id)) " +
                     "FROM Project p LEFT JOIN Task t ON t.project = p " +
                     "GROUP BY p.id, p.name")
       List<ProjectTaskCountDTO> countAllTasksByProject();
}
