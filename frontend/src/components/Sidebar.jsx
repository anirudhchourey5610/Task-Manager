import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = ({ isOpen = false, onNavigate }) => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const isAdmin = user && user.role === 'ADMIN';

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Primary navigation">
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    Task<span>Flow</span>
                </div>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                    Dashboard
                </NavLink>
                <NavLink to="/tasks" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                    {isAdmin ? 'Tasks' : 'My Tasks'}
                </NavLink>
                
                {isAdmin && (
                    <>
                        <NavLink to="/projects" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            Projects
                        </NavLink>
                        <NavLink to="/create-task" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            Create Task
                        </NavLink>
                        <NavLink to="/create-project" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            Create Project
                        </NavLink>
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
