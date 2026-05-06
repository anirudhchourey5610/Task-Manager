import React, { useState } from 'react';
import { updateTask } from '../api';

const TaskCard = ({ task, onStatusChange }) => {
    const [updating, setUpdating] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setUpdating(true);
        try {
            await updateTask(task.id, { ...task, status: newStatus });
            if (onStatusChange) onStatusChange();
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    // Format the status class
    const statusClass = task.status ? task.status.toLowerCase().replace('_', '') : 'pending';

    return (
        <div className="task-card">
            <div className="task-header">
                <div>
                    <h3 className="task-title">{task.title}</h3>
                    {task.project && <span className="task-project">{task.project.name}</span>}
                </div>
                <select 
                    className={`task-status ${statusClass}`} 
                    value={task.status}
                    onChange={handleStatusChange}
                    disabled={updating}
                    style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
                >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            
            <p className="task-desc">{task.description}</p>
            
            <div className="task-footer">
                <div className="task-assignee">
                    Assigned to: <strong>{task.assignedTo ? task.assignedTo.name : 'Unassigned'}</strong>
                </div>
                {task.dueDate && (
                    <div className="task-due">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
