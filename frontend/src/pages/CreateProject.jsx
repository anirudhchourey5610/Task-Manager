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

            <div className="form-container">
                {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Project Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => navigate('/projects')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
