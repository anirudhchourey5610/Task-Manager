import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (loading) return <Loader />;
    if (error) return <EmptyState message={error} />;
    if (!summary) return <EmptyState message="No dashboard data available" />;

    return (
        <div className="dashboard-container">
            <header className="dashboard-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome back, {user.name.split(' ')[0]} ⚡</h1>
                    <p className="hero-subtitle">
                        Your workspace is looking productive today. You have {summary.pending} tasks pending review.
                    </p>
                    <div className="hero-actions">
                        <Link to="/tasks" className="btn-primary">
                            View All Tasks
                        </Link>
                    </div>
                </div>
                <div className="hero-stats-mini">
                    <div className="mini-stat">
                        <span className="label">Productivity</span>
                        <span className="value">+{Math.round((summary.completed / (summary.total || 1)) * 100)}%</span>
                    </div>
                </div>
            </header>

            <div className="dashboard-grid">
                <DashboardCard title="Total Tasks" value={summary.total || 0} />
                <DashboardCard title="Pending" value={summary.pending || 0} />
                <DashboardCard title="In Progress" value={summary.inProgress || 0} />
                <DashboardCard title="Completed" value={summary.completed || 0} />
            </div>
        </div>
    );
};

export default Dashboard;
