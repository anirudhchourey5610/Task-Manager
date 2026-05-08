import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, getTasksByStatus, deleteTask, updateTask, getAllUsers, getAllProjects } from '../api';
import TaskCard from '../components/TaskCard';
import { Loader, EmptyState } from '../components/Shared';
import Modal from '../components/Modal';
import '../styles/tasks.css';
import '../styles/forms.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    
    // Edit/Delete State
    const [editingTask, setEditingTask] = useState(null);
    const [deletingTaskId, setDeletingTaskId] = useState(null);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

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
        if (isAdmin) {
            getAllUsers().then(setUsers).catch(console.error);
            getAllProjects().then(setProjects).catch(console.error);
        }
    }, [filter]);

    const handleDelete = async () => {
        try {
            await deleteTask(deletingTaskId);
            setDeletingTaskId(null);
            fetchTasksList();
        } catch (err) {
            console.error(err);
            alert("Failed to delete task");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(editingTask.id, editingTask);
            setEditingTask(null);
            fetchTasksList();
        } catch (err) {
            console.error(err);
            alert("Failed to update task");
        }
    };

    return (
        <div className="tasks-page-container">
            <div className="page-header">
                <h1 className="page-title">{isAdmin ? 'All Workspace Tasks' : 'My Assigned Tasks'}</h1>
                {isAdmin && <Link to="/create-task" className="btn-primary">+ Create New Task</Link>}
            </div>

            <div className="tasks-controls">
                <div className="filter-tabs">
                    {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map(status => (
                        <button 
                            key={status}
                            className={`filter-tab ${filter === status ? 'active' : ''}`}
                            onClick={() => setFilter(status)}
                        >
                            {status.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : tasks.length === 0 ? (
                <EmptyState message={`No ${filter !== 'ALL' ? filter.toLowerCase() : ''} tasks found.`} />
            ) : (
                <div className="tasks-grid">
                    {tasks.map(task => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onStatusChange={fetchTasksList}
                            onEdit={(t) => setEditingTask({...t, assignedToId: t.assignedTo?.id, projectId: t.project?.id})}
                            onDelete={(id) => setDeletingTaskId(id)}
                        />
                    ))}
                </div>
            )}

            {/* Edit Task Modal */}
            <Modal 
                isOpen={!!editingTask} 
                onClose={() => setEditingTask(null)}
                title="Edit Task Details"
            >
                {editingTask && (
                    <form onSubmit={handleEditSubmit} className="premium-form">
                        <div className="form-group">
                            <label className="form-label">Task Title</label>
                            <input 
                                className="form-control"
                                value={editingTask.title}
                                onChange={e => setEditingTask({...editingTask, title: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control"
                                rows="3"
                                value={editingTask.description}
                                onChange={e => setEditingTask({...editingTask, description: e.target.value})}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Priority</label>
                                <select 
                                    className="form-control"
                                    value={editingTask.priority}
                                    onChange={e => setEditingTask({...editingTask, priority: e.target.value})}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Due Date</label>
                                <input 
                                    type="date"
                                    className="form-control"
                                    value={editingTask.dueDate ? editingTask.dueDate.split('T')[0] : ''}
                                    onChange={e => setEditingTask({...editingTask, dueDate: e.target.value})}
                                />
                            </div>
                        </div>
                        {isAdmin && (
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Project</label>
                                    <select 
                                        className="form-control"
                                        value={editingTask.projectId || ''}
                                        onChange={e => setEditingTask({...editingTask, projectId: e.target.value})}
                                    >
                                        <option value="">No Project</option>
                                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Assign To</label>
                                    <select 
                                        className="form-control"
                                        value={editingTask.assignedToId || ''}
                                        onChange={e => setEditingTask({...editingTask, assignedToId: e.target.value})}
                                    >
                                        <option value="">Unassigned</option>
                                        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}
                        <div className="modal-actions">
                            <button type="button" onClick={() => setEditingTask(null)} className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Save Changes</button>
                        </div>
                    </form>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal 
                isOpen={!!deletingTaskId} 
                onClose={() => setDeletingTaskId(null)}
                title="Delete Task"
            >
                <div className="delete-confirm-content">
                    <p>Are you sure you want to permanently delete this task? This action cannot be undone.</p>
                    <div className="modal-actions">
                        <button onClick={() => setDeletingTaskId(null)} className="btn-secondary">Keep Task</button>
                        <button onClick={handleDelete} className="btn-danger">Yes, Delete Task</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Tasks;
