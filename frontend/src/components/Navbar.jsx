import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    // Get initials for avatar
    const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

    return (
        <header className="navbar">
            <div className="navbar-search">
            </div>
            <div className="navbar-user">
                <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role}</span>
                </div>
                <div className="user-avatar">
                    {initials}
                </div>
                <button 
                    onClick={handleLogout} 
                    style={{marginLeft: '1rem', background: 'none', border: '1px solid var(--border)', padding: '0.25rem 0.75rem', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-muted)'}}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;
