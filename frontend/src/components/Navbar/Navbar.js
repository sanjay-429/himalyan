import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <span className="brand-icon">🏍️</span>
          <span className="brand-name">Himalayan Cruiser</span>
          <span className="brand-sub">Dehradun</span>
        </Link>
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/bikes" onClick={() => setMenuOpen(false)}>Our Bikes</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        {user ? (
          <>
            <li><Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link></li>
            {user.role === 'admin' && (
              <li><Link to="/admin" className="btn-nav-admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link></li>
            )}
            <li className="user-info">
              <div className="user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : '👤'}</div>
              <span className="user-name">{user.name}</span>
            </li>
            <li><button className="btn-logout" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="btn-nav-login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/register" className="btn-nav-register" onClick={() => setMenuOpen(false)}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
