import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, getDashboardProjects, deleteProject, updateProject } from '../api';
import ProjectCard from '../components/ProjectCard';
import { Loader, EmptyState } from '../components/Shared';
import Modal from '../components/Modal';
import '../styles/projects.css';
import '../styles/forms.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [taskCounts, setTaskCounts] = useState({});
    const [loading, setLoading] = useState(true);
    
    // Edit/Delete State
    const [editingProject, setEditingProject] = useState(null);
    const [deletingProjectId, setDeletingProjectId] = useState(null);

    const fetchProjectsList = () => {
        setLoading(true);
        Promise.all([getAllProjects(), getDashboardProjects()])
            .then(([projectsData, countsData]) => {
                setProjects(projectsData);
                const countsMap = {};
                countsData.forEach(item => {
                    countsMap[item.projectId] = item.taskCount;
                });
                setTaskCounts(countsMap);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProjectsList();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteProject(deletingProjectId);
            setDeletingProjectId(null);
            fetchProjectsList();
        } catch (err) {
            console.error(err);
            alert("Failed to delete project. Make sure it has no active tasks.");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProject(editingProject.id, editingProject);
            setEditingProject(null);
            fetchProjectsList();
        } catch (err) {
            console.error(err);
            alert("Failed to update project");
        }
    };

    return (
        <div className="projects-page-container">
            <div className="page-header">
                <h1 className="page-title">Workspace Projects</h1>
                <Link to="/create-project" className="btn-primary">+ Create New Project</Link>
            </div>

            {loading ? (
                <Loader />
            ) : projects.length === 0 ? (
                <EmptyState message="No projects found. Create one to get started!" />
            ) : (
                <div className="projects-grid">
                    {projects.map(project => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            taskCount={taskCounts[project.id] || 0}
                            onEdit={(p) => setEditingProject(p)}
                            onDelete={(id) => setDeletingProjectId(id)}
                        />
                    ))}
                </div>
            )}

            {/* Edit Project Modal */}
            <Modal 
                isOpen={!!editingProject} 
                onClose={() => setEditingProject(null)}
                title="Edit Project Details"
            >
                {editingProject && (
                    <form onSubmit={handleEditSubmit} className="premium-form">
                        <div className="form-group">
                            <label className="form-label">Project Name</label>
                            <input 
                                className="form-control"
                                value={editingProject.name}
                                onChange={e => setEditingProject({...editingProject, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control"
                                rows="4"
                                value={editingProject.description}
                                onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                            />
                        </div>
                        <div className="modal-actions">
                            <button type="button" onClick={() => setEditingProject(null)} className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Save Changes</button>
                        </div>
                    </form>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal 
                isOpen={!!deletingProjectId} 
                onClose={() => setDeletingProjectId(null)}
                title="Delete Project"
            >
                <div className="delete-confirm-content">
                    <p>Are you sure you want to permanently delete this project? All associated metadata will be removed. You can only delete projects with no tasks.</p>
                    <div className="modal-actions">
                        <button onClick={() => setDeletingProjectId(null)} className="btn-secondary">Cancel</button>
                        <button onClick={handleDelete} className="btn-danger">Yes, Delete Project</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Projects;
