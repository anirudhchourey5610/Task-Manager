import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, getAllProjects, getAllUsers } from '../api';
import '../styles/forms.css';

const CreateTask = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'PENDING',
        dueDate: '',
        projectId: '',
        assignedUserId: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch projects to populate the dropdown
        getAllProjects()
            .then(data => setProjects(data))
            .catch(err => console.error("Failed to load projects", err));
            
        // Fetch users to populate the assignee dropdown
        getAllUsers()
            .then(data => setUsers(data))
            .catch(err => console.error("Failed to load users", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // Clean up payload (remove empty strings)
            const payload = { ...formData };
            if (!payload.projectId) delete payload.projectId;
            if (!payload.assignedUserId) delete payload.assignedUserId;
            if (!payload.dueDate) delete payload.dueDate;

            await createTask(payload);
            navigate('/tasks');
        } catch (err) {
            const backendMsg = err.response?.data?.message;
            if (typeof backendMsg === 'object' && backendMsg !== null) {
                setError(Object.values(backendMsg).join(', '));
            } else {
                setError(backendMsg || 'Failed to create task');
            }
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Create New Task</h1>
            </div>

            <div className="premium-form-wrapper">
                {error && <div className="auth-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-group">
                        <label className="form-label">Task Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="What needs to be done?"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            placeholder="Add more details about this task..."
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select 
                                className="form-control"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Due Date</label>
                            <input 
                                type="date" 
                                className="form-control"
                                value={formData.dueDate}
                                onChange={e => setFormData({...formData, dueDate: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Project</label>
                            <select 
                                className="form-control"
                                value={formData.projectId}
                                onChange={e => setFormData({...formData, projectId: e.target.value})}
                            >
                                <option value="">-- No Project --</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Assignee</label>
                            <select 
                                className="form-control"
                                value={formData.assignedUserId}
                                onChange={e => setFormData({...formData, assignedUserId: e.target.value})}
                            >
                                <option value="">-- Unassigned --</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-actions-premium">
                        <button type="button" className="btn-secondary" onClick={() => navigate('/tasks')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? 'Creating...' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;
