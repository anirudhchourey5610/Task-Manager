import React from 'react';

const DashboardCard = ({ title, value }) => {
    return (
        <div className="stat-card">
            <span className="stat-title">{title}</span>
            <span className="stat-value">{value}</span>
        </div>
    );
};

export default DashboardCard;
