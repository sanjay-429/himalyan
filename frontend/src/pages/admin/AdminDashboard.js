import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ bikes: 0, bookings: 0, messages: 0, revenue: 0 });
  const [chartData, setChartData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    Promise.all([API.get('/bikes'), API.get('/bookings'), API.get('/contact')])
      .then(([bikesRes, bookingsRes, contactRes]) => {
        const allBookings = bookingsRes.data;
        const revenue = allBookings
          .filter(b => b.status === 'confirmed' || b.status === 'completed')
          .reduce((sum, b) => sum + b.totalAmount, 0);

        setStats({ bikes: bikesRes.data.length, bookings: allBookings.length, messages: contactRes.data.filter(m => !m.isRead).length, revenue });
        setRecentBookings(allBookings.slice(0, 5));

        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        setChartData(months.map((month, i) => ({
          month,
          bookings: allBookings.filter(b => new Date(b.createdAt).getMonth() === i).length,
        })));
      });
  }, []);

  const statCards = [
    { label: 'Total Bikes', value: stats.bikes, icon: '🏍️', color: '#f5a623' },
    { label: 'Total Bookings', value: stats.bookings, icon: '📋', color: '#3498db' },
    { label: 'Unread Messages', value: stats.messages, icon: '✉️', color: '#9b59b6' },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: '💰', color: '#27ae60' },
  ];

  const statusColor = { pending: '#f39c12', confirmed: '#27ae60', cancelled: '#e74c3c', completed: '#3498db' };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Himalayan Cruiser Admin • Dehradun</p>
      </div>

      <div className="stats-grid">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card" style={{ borderLeftColor: s.color }}>
            <div className="stat-icon" style={{ background: s.color + '20' }}>{s.icon}</div>
            <div>
              <h3 style={{ color: s.color }}>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="chart-card">
          <h2>Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#f5a623" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="recent-card">
          <h2>Recent Bookings</h2>
          {recentBookings.length === 0 ? <p className="no-data">No bookings yet</p> : (
            <div className="recent-list">
              {recentBookings.map(b => (
                <div key={b._id} className="recent-item">
                  <div>
                    <p className="recent-user">{b.user?.name}</p>
                    <p className="recent-bike">{b.bike?.name}</p>
                  </div>
                  <div className="recent-right">
                    <span className="recent-amount">₹{b.totalAmount}</span>
                    <span className="status-dot" style={{ background: statusColor[b.status] }}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
