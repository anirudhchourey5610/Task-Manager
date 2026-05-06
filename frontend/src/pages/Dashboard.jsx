import React, { useState, useEffect } from 'react';
import { getDashboardSummary } from '../api';
import DashboardCard from '../components/DashboardCard';
import { Loader, EmptyState } from '../components/Shared';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDashboardSummary()
            .then(data => {
                setSummary(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Failed to load dashboard');
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader />;
    if (error) return <EmptyState message={error} />;
    if (!summary) return <EmptyState message="No dashboard data available" />;

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Overview</h1>
            </div>

            <div className="dashboard-grid">
                <DashboardCard title="Total Tasks" value={summary.total || 0} />
                <DashboardCard title="Pending" value={summary.pending || 0} />
                <DashboardCard title="In Progress" value={summary.inProgress || 0} />
                <DashboardCard title="Completed" value={summary.completed || 0} />
            </div>

            {/* In a real app, we'd add charts or recent activity here */}
        </div>
    );
};

export default Dashboard;
