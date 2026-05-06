import React from 'react';

const ProjectCard = ({ project, taskCount }) => {
    return (
        <div className="project-card">
            <h3 className="project-title">{project.name}</h3>
            <p className="project-desc">{project.description}</p>
            
            <div className="project-footer">
                <div className="project-creator">
                    Created by: <span>{project.createdBy?.name || 'Unknown'}</span>
                </div>
                {taskCount !== undefined && (
                    <div className="project-tasks-count">
                        {taskCount} Tasks
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
