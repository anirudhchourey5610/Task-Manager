import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api';
import '../styles/auth.css';
import '../styles/forms.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'MEMBER' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const data = await signup(formData);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            const backendMsg = err.response?.data?.message;
            if (typeof backendMsg === 'object' && backendMsg !== null) {
                setError(Object.values(backendMsg).join(', '));
            } else {
                setError(backendMsg || 'Failed to create account');
            }
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-visual-side">
                <div className="visual-content">
                    <div className="auth-brand-large">Task<span>Flow</span></div>
                    <h2 className="visual-title">Build your high-performance team today.</h2>
                    <p className="visual-description">
                        Everything you need to organize work, collaborate in real-time, and scale your operations without the friction.
                    </p>
                    <div className="visual-feature-list">
                        <div className="feature-item">✓ Real-time collaboration</div>
                        <div className="feature-item">✓ Advanced project tracking</div>
                        <div className="feature-item">✓ Intelligent role management</div>
                    </div>
                </div>
                <div className="visual-blob blob-3"></div>
                <div className="visual-blob blob-4"></div>
            </div>

            <div className="auth-form-side">
                <div className="auth-form-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join TaskFlow and start managing with precision</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="premium-form">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="John Doe"
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
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
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Min. 6 characters"
                                required 
                                minLength={6}
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Workspace Role</label>
                            <select 
                                className="form-control"
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                            >
                                <option value="MEMBER">Member (Standard)</option>
                                <option value="ADMIN">Administrator (Full Access)</option>
                            </select>
                        </div>
                        
                        <button type="submit" className="btn-primary auth-submit" disabled={submitting}>
                            {submitting ? 'Creating workspace...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login" className="auth-link">Sign in instead</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
