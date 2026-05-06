import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, getDashboardProjects } from '../api';
import ProjectCard from '../components/ProjectCard';
import { Loader, EmptyState } from '../components/Shared';
import '../styles/projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [taskCounts, setTaskCounts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch projects and their task counts simultaneously
        Promise.all([getAllProjects(), getDashboardProjects()])
            .then(([projectsData, countsData]) => {
                setProjects(projectsData);
                
                // Map counts by projectId for easy lookup
                const countsMap = {};
                countsData.forEach(item => {
                    countsMap[item.projectId] = item.taskCount;
                });
                setTaskCounts(countsMap);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Projects</h1>
                <Link to="/create-project" className="btn-primary">+ New Project</Link>
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;
