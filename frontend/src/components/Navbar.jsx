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
        <header className="navbar-premium">
            <div className="navbar-left">
                <button
                    className="menu-toggle-premium"
                    type="button"
                    onClick={onMenuClick}
                >
                    ☰
                </button>
                <div className="navbar-breadcrumb">
                    <span className="breadcrumb-main">Workspace</span>
                    <span className="breadcrumb-sep">/</span>
                    <span className="breadcrumb-sub">Dashboard</span>
                </div>
            </div>
            
            <div className="navbar-right">
                <div className="navbar-search-mini">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Quick search..." />
                </div>
                <div className="user-profile-dropdown">
                    <div className="user-avatar-premium">
                        {initials}
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="logout-btn-premium"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
