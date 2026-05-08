import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import '../styles/auth.css';
import '../styles/forms.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const data = await login(formData);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            const backendMsg = err.response?.data?.message;
            if (typeof backendMsg === 'object' && backendMsg !== null) {
                setError(Object.values(backendMsg).join(', '));
            } else {
                setError(backendMsg || 'Invalid email or password');
            }
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-visual-side">
                <div className="visual-content">
                    <div className="auth-brand-large">Task<span>Flow</span></div>
                    <h2 className="visual-title">Streamline your team's workflow with precision.</h2>
                    <p className="visual-description">
                        Join thousands of teams using TaskFlow to manage projects, track tasks, and hit deadlines faster than ever before.
                    </p>
                    <div className="visual-stats">
                        <div className="stat-item">
                            <span className="stat-value">99%</span>
                            <span className="stat-label">Productivity boost</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">10k+</span>
                            <span className="stat-label">Active teams</span>
                        </div>
                    </div>
                </div>
                <div className="visual-blob blob-1"></div>
                <div className="visual-blob blob-2"></div>
            </div>

            <div className="auth-form-side">
                <div className="auth-form-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome back</h1>
                        <p className="auth-subtitle">Log in to your workspace to continue</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="premium-form">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="name@company.com"
                                required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <div className="label-row">
                                <label className="form-label">Password</label>
                                <a href="#" className="forgot-password">Forgot?</a>
                            </div>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="••••••••"
                                required 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                        
                        <button type="submit" className="btn-primary auth-submit" disabled={submitting}>
                            {submitting ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        New to TaskFlow? <Link to="/signup" className="auth-link">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
