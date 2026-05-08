import React from 'react';

const ProjectCard = ({ project, taskCount, onEdit, onDelete }) => {
    const [showPreview, setShowPreview] = React.useState(false);

    return (
        <div 
            className="project-card-premium"
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
        >
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

            {/* Hover Preview Popover */}
            {showPreview && (
                <div className="project-preview-popover">
                    <div className="preview-header">Project Overview</div>
                    <div className="preview-stats">
                        <div className="preview-stat">
                            <span className="stat-label">Total Tasks</span>
                            <span className="stat-value">{taskCount || 0}</span>
                        </div>
                    </div>
                    <div className="preview-section">
                        <div className="preview-label">Team Members</div>
                        <div className="preview-members-list">
                            <div className="preview-member-chip">
                                <div className="mini-avatar-chip">{project.createdBy?.name?.[0] || 'A'}</div>
                                <span>{project.createdBy?.name} (Admin)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
