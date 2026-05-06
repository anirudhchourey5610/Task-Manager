import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, getTasksByStatus } from '../api';
import TaskCard from '../components/TaskCard';
import { Loader, EmptyState } from '../components/Shared';
import '../styles/tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const isAdmin = user && user.role === 'ADMIN';

    const fetchTasksList = () => {
        setLoading(true);
        const fetchTasks = filter === 'ALL' ? getAllTasks() : getTasksByStatus(filter);
        
        fetchTasks
            .then(data => setTasks(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchTasksList();
    }, [filter]);

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">{isAdmin ? 'Tasks' : 'My Tasks'}</h1>
                {isAdmin && <Link to="/create-task" className="btn-primary">+ New Task</Link>}
            </div>

            <div className="tasks-controls">
                <div className="filter-group">
                    <label>Filter Status:</label>
                    <select 
                        className="filter-select"
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="ALL">All Tasks</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : tasks.length === 0 ? (
                <EmptyState message={`No ${filter !== 'ALL' ? filter.toLowerCase() : ''} tasks found.`} />
            ) : (
                <div className="tasks-grid">
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} onStatusChange={fetchTasksList} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tasks;
