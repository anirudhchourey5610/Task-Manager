import React from 'react';

const ProjectCard = ({ project, taskCount, onEdit, onDelete }) => {
    return (
        <div className="project-card-premium">
            <div className="project-card-accent"></div>
            
            <div className="project-card-header">
                <h3 className="project-card-title">{project.name}</h3>
                <div className="project-card-actions">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(project); }} className="icon-btn edit-btn">
                        ✎
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(project.id); }} className="icon-btn delete-btn">
                        🗑
                    </button>
                </div>
            </div>

            <p className="project-card-desc">{project.description}</p>
            
            <div className="project-card-footer">
                <div className="project-owner">
                    <span className="label">Owner:</span>
                    <span className="value">{project.createdBy?.name || 'Admin'}</span>
                </div>
                {taskCount !== undefined && (
                    <div className="project-task-badge">
                        {taskCount} Tasks
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
