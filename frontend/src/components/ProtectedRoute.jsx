import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(userStr);
        
        // If roles are specified and user's role is not in the list, redirect to dashboard
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            return <Navigate to="/dashboard" replace />;
        }
        
        // Authorized
        return children;
    } catch (e) {
        // Corrupted localStorage, force re-login
        localStorage.removeItem('user');
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
