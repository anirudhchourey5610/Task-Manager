import React from 'react';

export const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid var(--border)', 
                borderTopColor: 'var(--primary)', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite' 
            }}>
            </div>
            <style>
                {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
        </div>
    );
};

export const EmptyState = ({ message = "No data found." }) => {
    return (
        <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--border)' }}>📂</div>
            <p>{message}</p>
        </div>
    );
};
