import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api';
import '../styles/forms.css';

const CreateProject = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await createProject(formData);
            navigate('/projects');
        } catch (err) {
            const backendMsg = err.response?.data?.message;
            if (typeof backendMsg === 'object' && backendMsg !== null) {
                setError(Object.values(backendMsg).join(', '));
            } else {
                setError(backendMsg || 'Failed to create project');
            }
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Create New Project</h1>
            </div>

            <div className="premium-form-wrapper">
                {error && <div className="auth-error">{error}</div>}
                
                <form onSubmit={handleSubmit} className="premium-form">
                    <div className="form-group">
                        <label className="form-label">Project Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="e.g. Q3 Marketing Campaign"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            placeholder="What is this project about?"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    
                    <div className="form-actions-premium">
                        <button type="button" className="btn-secondary" onClick={() => navigate('/projects')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? 'Initiating Project...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
