import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ onMenuClick }) => {
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
            <button
                className="menu-toggle"
                type="button"
                aria-label="Open navigation"
                onClick={onMenuClick}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
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
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;
