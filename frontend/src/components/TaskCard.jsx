import React, { useState } from 'react';
import { updateTask } from '../api';

const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
    const [updating, setUpdating] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setUpdating(true);
        try {
            await updateTask(task.id, { ...task, status: newStatus });
            if (onStatusChange) onStatusChange();
        } catch (err) {
            console.error("Failed to update status", err);
        } finally {
            setUpdating(false);
        }
    };

    const statusClass = task.status ? task.status.toLowerCase().replace('_', '-') : 'pending';
    const priorityClass = task.priority ? task.priority.toLowerCase() : 'medium';
    
    // Overdue Detection
    const isOverdue = task.dueDate && 
                     new Date(task.dueDate) < new Date() && 
                     task.status !== 'COMPLETED';

    return (
        <div className={`task-card-premium priority-${priorityClass}`}>
            {isOverdue && <div className="overdue-dot" title="Overdue Task"></div>}
            
            <div className="task-card-header">
                <div className="task-card-main-info">
                    <div className="task-project-name">{task.project?.name || 'General'}</div>
                    <h3 className="task-card-title">{task.title}</h3>
                </div>
                <div className="task-card-actions">
                    <button onClick={() => onEdit(task)} className="icon-btn edit-btn" title="Edit Task">
                        ✎
                    </button>
                    <button onClick={() => onDelete(task.id)} className="icon-btn delete-btn" title="Delete Task">
                        🗑
                    </button>
                </div>
            </div>

            <p className="task-card-description">{task.description}</p>

            <div className="task-card-mid">
                <span className={`priority-pill ${priorityClass}`}>{task.priority}</span>
                <div className="task-due-date">
                    <span className="icon">📅</span> 
                    <span className={isOverdue ? 'text-danger' : ''}>
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                </div>
            </div>

            <div className="task-card-footer">
                <div className="task-assignee">
                    <div className="assignee-avatar">
                        {task.assignedTo?.name ? task.assignedTo.name[0].toUpperCase() : '?'}
                    </div>
                    <div className="assignee-details">
                        <span className="assignee-name">{task.assignedTo?.name || 'Unassigned'}</span>
                    </div>
                </div>
                <div className="status-selector-wrapper">
                    <select 
                        className={`status-pill-select ${statusClass}`} 
                        value={task.status}
                        onChange={handleStatusChange}
                        disabled={updating}
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Done</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
