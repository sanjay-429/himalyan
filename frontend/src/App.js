import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// User layout
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Admin layout
import Sidebar from './components/Sidebar/Sidebar';

// User pages
import Home from './pages/Home';
import Bikes from './pages/Bikes';
import BookBike from './pages/BookBike';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBikes from './pages/admin/AdminBikes';
import AdminBookings from './pages/admin/AdminBookings';
import AdminMessages from './pages/admin/AdminMessages';

import './App.css';

// Wrapper for public user pages (with Navbar + Footer)
const UserLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Wrapper for admin pages (with Sidebar, admin only)
const AdminLayout = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout><Home /></UserLayout>} />
          <Route path="/bikes" element={<UserLayout><Bikes /></UserLayout>} />
          <Route path="/book/:id" element={<UserLayout><BookBike /></UserLayout>} />
          <Route path="/my-bookings" element={<UserLayout><MyBookings /></UserLayout>} />
          <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
          <Route path="/register" element={<UserLayout><Register /></UserLayout>} />
          <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
          <Route path="/about" element={<UserLayout><About /></UserLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/bikes" element={<AdminLayout><AdminBikes /></AdminLayout>} />
          <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
          <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
