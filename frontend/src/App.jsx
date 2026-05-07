import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import CreateTask from './pages/CreateTask';
import CreateProject from './pages/CreateProject';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />
      <button
        className="sidebar-backdrop"
        type="button"
        aria-label="Close navigation"
        onClick={closeSidebar}
      />
      <main className="main-content">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        
        {/* MEMBER & ADMIN Tasks Route */}
        <Route path="/tasks" element={<ProtectedRoute><Layout><Tasks /></Layout></ProtectedRoute>} />

        {/* ADMIN Only Routes */}
        <Route path="/projects" element={<ProtectedRoute allowedRoles={['ADMIN']}><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/create-task" element={<ProtectedRoute allowedRoles={['ADMIN']}><Layout><CreateTask /></Layout></ProtectedRoute>} />
        <Route path="/create-project" element={<ProtectedRoute allowedRoles={['ADMIN']}><Layout><CreateProject /></Layout></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
