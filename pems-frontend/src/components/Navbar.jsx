import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">💰 PEMS</div>
            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/expenses">Expenses</Link>
                <Link to="/incomes">Incomes</Link>
                <Link to="/categories">Categories</Link>
            </div>
            <div className="nav-user">
                <span>Hi, {user.name || 'User'}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}