import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Interceptor to automatically add userId header to every request dynamically
api.interceptors.request.use((config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user && user.userId) {
                config.headers['userId'] = user.userId;
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials).then(res => res.data);
export const signup = (userData) => api.post('/auth/signup', userData).then(res => res.data);

// Dashboard APIs
export const getDashboardSummary = () => api.get('/dashboard/summary').then(res => res.data);
export const getDashboardProjects = () => api.get('/dashboard/projects').then(res => res.data);

// User APIs
export const getAllUsers = () => api.get('/users').then(res => res.data);

// Task APIs
// Dynamic task fetching: Admin sees all, Member sees only assigned tasks
export const getAllTasks = () => {
    const userStr = localStorage.getItem('user');
    let userId = '';
    let role = '';
    if (userStr) {
        const user = JSON.parse(userStr);
        userId = user.userId;
        role = user.role;
    }
    
    if (role === 'ADMIN') {
        return api.get('/tasks').then(res => res.data);
    } else {
        return api.get(`/tasks/user/${userId}`).then(res => res.data);
    }
};
export const getTasksByStatus = (status) => api.get(`/tasks/status/${status}`).then(res => res.data);
export const createTask = (task) => api.post('/tasks', task).then(res => res.data);
export const updateTask = (id, taskDetails) => api.put(`/tasks/${id}`, taskDetails).then(res => res.data);
export const getOverdueTasks = () => api.get('/tasks/overdue').then(res => res.data);

// Project APIs
export const getAllProjects = () => {
    const userStr = localStorage.getItem('user');
    let userId = '';
    if (userStr) {
        const user = JSON.parse(userStr);
        userId = user.userId;
    }
    return api.get(`/projects/${userId}`).then(res => res.data);
};
export const createProject = (project) => api.post('/projects', project).then(res => res.data);
