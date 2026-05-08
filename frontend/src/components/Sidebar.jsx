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
                    <span className="nav-icon">📊</span>
                    <span className="nav-text">Dashboard</span>
                </NavLink>
                <NavLink to="/tasks" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                    <span className="nav-icon">🎯</span>
                    <span className="nav-text">{isAdmin ? 'All Tasks' : 'My Tasks'}</span>
                </NavLink>
                
                {isAdmin && (
                    <div className="nav-section">
                        <div className="nav-section-title">Management</div>
                        <NavLink to="/projects" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <span className="nav-icon">📂</span>
                            <span className="nav-text">Projects</span>
                        </NavLink>
                        <NavLink to="/create-task" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <span className="nav-icon">➕</span>
                            <span className="nav-text">New Task</span>
                        </NavLink>
                        <NavLink to="/create-project" onClick={onNavigate} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <span className="nav-icon">🚀</span>
                            <span className="nav-text">New Project</span>
                        </NavLink>
                    </div>
                )}
            </nav>
            
            <div className="sidebar-footer">
                <div className="user-profile-mini">
                    <div className="user-avatar-small">{user?.name?.charAt(0) || 'U'}</div>
                    <div className="user-info-mini">
                        <span className="user-name-mini">{user?.name}</span>
                        <span className="user-role-mini">{user?.role}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
