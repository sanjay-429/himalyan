import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';
import './MyBookings.css';

const statusColors = { pending: '#f39c12', confirmed: '#27ae60', cancelled: '#e74c3c', completed: '#3498db' };

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/bookings/my').then(res => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await API.delete(`/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
      toast.success('Booking cancelled');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  if (loading) return <div className="loading">Loading bookings... 🏍️</div>;

  return (
    <div className="my-bookings-page">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Manage all your bike rental bookings</p>
      </div>
      <div className="bookings-container">
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <span>🏍️</span>
            <h3>No bookings yet!</h3>
            <p>Start exploring Dehradun and the Himalayas</p>
            <a href="/bikes" className="btn-browse">Browse Bikes</a>
          </div>
        ) : (
          bookings.map(b => (
            <div key={b._id} className="booking-card">
              <div className="booking-bike-info">
                <div className="booking-bike-img">
                  {b.bike?.image ? <img src={b.bike.image} alt={b.bike.name} /> : <span>🏍️</span>}
                </div>
                <div>
                  <h3>{b.bike?.name}</h3>
                  <p>{b.bike?.brand} • {b.bike?.cc}cc</p>
                  <p>📍 {b.pickupLocation}</p>
                </div>
              </div>
              <div className="booking-details">
                <div className="detail-row">
                  <span>📅 Start</span>
                  <strong>{new Date(b.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                </div>
                <div className="detail-row">
                  <span>📅 End</span>
                  <strong>{new Date(b.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                </div>
                <div className="detail-row">
                  <span>⏱️ Duration</span>
                  <strong>{b.totalDays} days</strong>
                </div>
                <div className="detail-row">
                  <span>💰 Amount</span>
                  <strong>₹{b.totalAmount}</strong>
                </div>
              </div>
              <div className="booking-status-col">
                <span className="status-badge" style={{ background: statusColors[b.status] + '20', color: statusColors[b.status] }}>
                  {b.status.toUpperCase()}
                </span>
                {b.status === 'pending' && (
                  <button className="btn-cancel" onClick={() => handleCancel(b._id)}>Cancel</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
