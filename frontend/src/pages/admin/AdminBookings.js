import React, { useState, useEffect } from 'react';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import './AdminBookings.css';

const statusColors = { pending: '#f39c12', confirmed: '#27ae60', cancelled: '#e74c3c', completed: '#3498db' };

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchBookings(); }, []);
  const fetchBookings = () => API.get('/bookings').then(res => setBookings(res.data));

  const handleStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      toast.success(`Marked as ${status}`);
      fetchBookings();
    } catch { toast.error('Failed to update'); }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Bookings</h1>
        <p>Manage all customer bike rental bookings</p>
      </div>

      <div className="filter-tabs">
        {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map(f => (
          <button key={f} className={`tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && <span className="tab-count">{bookings.filter(b => b.status === f).length}</span>}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Customer</th><th>Bike</th><th>Dates</th><th>Days</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b._id}>
                <td><strong>{b.user?.name}</strong><p>{b.user?.email}</p><p>{b.user?.phone}</p></td>
                <td><strong>{b.bike?.name}</strong><p>{b.bike?.brand}</p></td>
                <td><p>📅 {new Date(b.startDate).toLocaleDateString('en-IN')}</p><p>📅 {new Date(b.endDate).toLocaleDateString('en-IN')}</p></td>
                <td>{b.totalDays}d</td>
                <td><strong>₹{b.totalAmount}</strong></td>
                <td><span className="status-badge" style={{ background: statusColors[b.status] + '20', color: statusColors[b.status] }}>{b.status}</span></td>
                <td>
                  {b.status === 'pending' && <>
                    <button className="btn-confirm" onClick={() => handleStatus(b._id, 'confirmed')}>Confirm</button>
                    <button className="btn-cancel-sm" onClick={() => handleStatus(b._id, 'cancelled')}>Cancel</button>
                  </>}
                  {b.status === 'confirmed' && <button className="btn-complete" onClick={() => handleStatus(b._id, 'completed')}>Complete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="no-data">No bookings found</div>}
      </div>
    </div>
  );
};

export default AdminBookings;
