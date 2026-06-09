import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { path: '/admin', icon: '📊', label: 'Dashboard' },
  { path: '/admin/bikes', icon: '🏍️', label: 'Bikes' },
  { path: '/admin/bookings', icon: '📋', label: 'Bookings' },
  { path: '/admin/messages', icon: '✉️', label: 'Messages' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span>🏍️</span>
        <div>
          <h2>Himalayan Cruiser</h2>
          <p>Admin Panel</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="admin-info">
          <span>👤</span>
          <div>
            <p className="admin-name">{user?.name}</p>
            <p className="admin-role">Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-sidebar-logout">Logout</button>
        <Link to="/" className="btn-goto-site">← Go to Website</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
