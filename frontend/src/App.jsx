import { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  // Edit state
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    
    try {
      await createTask({ title, description, status: 'Pending' });
      setTitle('');
      setDescription('');
      setError(null);
      loadTasks();
    } catch (err) {
      handleError(err, "Failed to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task");
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      await updateTask(task.id, { 
        title: task.title, 
        description: task.description, 
        status: newStatus 
      });
      loadTasks();
    } catch (err) {
      console.error("Error toggling status:", err);
      setError("Failed to update status");
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = async (task) => {
    if (!editTitle.trim()) {
      setError("Title cannot be blank");
      return;
    }
    try {
      await updateTask(task.id, {
        title: editTitle,
        description: editDescription,
        status: task.status
      });
      setEditingTaskId(null);
      setError(null);
      loadTasks();
    } catch (err) {
      handleError(err, "Failed to update task");
    }
  };

  const handleError = (err, fallbackMsg) => {
    console.error(fallbackMsg, err);
    if (err.response && err.response.data && err.response.data.message) {
       // Display specific validation errors from backend
       const errorMsgs = typeof err.response.data.message === 'string' 
            ? err.response.data.message 
            : Object.values(err.response.data.message).join(", ");
       setError(errorMsgs);
    } else {
       setError(fallbackMsg);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <form onSubmit={handleAddTask} className="task-form">
        {error && <div className="error-msg">{error}</div>}
        <input 
          type="text" 
          placeholder="Task Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Task Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              // EDIT MODE
              <div className="task-edit-form">
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea 
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows="2"
                />
                <div className="edit-actions">
                  <button className="save-btn" onClick={() => handleSaveEdit(task)}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <>
                <div className="task-content">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`badge ${task.status.toLowerCase()}`}>{task.status}</span>
                  </div>
                  <p className="task-desc">{task.description}</p>
                  <p className="task-date">Created: {formatDate(task.createdAt)}</p>
                </div>
                <div className="task-actions">
                  <button 
                    className="toggle-btn"
                    onClick={() => handleToggleStatus(task)}
                  >
                    {task.status === 'Pending' ? 'Complete' : 'Reopen'}
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
        {tasks.length === 0 && <p style={{textAlign: 'center', color: '#888'}}>No tasks available. Add one above!</p>}
      </ul>
    </div>
  );
}

export default App;
