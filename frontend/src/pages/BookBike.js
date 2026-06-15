import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import './BookBike.css';

const BookBike = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [form, setForm] = useState({ startDate: '', endDate: '', licenseNumber: '', quantity: 1 });
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    API.get(`/bikes/${id}`).then(res => setBike(res.data));
  }, [id, user, navigate]);

  useEffect(() => {
    if (form.startDate && form.endDate) {
      const days = Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24));
      setTotalDays(days > 0 ? days : 0);
    }
  }, [form.startDate, form.endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalDays < 1) return toast.error('Select valid dates');
    setLoading(true);
    try {
      await API.post('/bookings', { bikeId: id, ...form });
      toast.success('Booking confirmed! 🎉');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
    setLoading(false);
  };

  if (!bike) return <div className="loading">Loading... 🏍️</div>;

  return (
    <div className="book-page">
      <div className="book-container">
        <div className="bike-summary">
          <div className="bike-summary-img">
            {bike.image ? <img src={bike.image} alt={bike.name} /> : <span>🏍️</span>}
          </div>
          <h2>{bike.name}</h2>
          <p>{bike.brand} • {bike.cc}cc • {bike.type}</p>
          <p className="bike-summary-price">₹{bike.pricePerDay} <span>/day</span></p>
          <p>{bike.description}</p>
          <div className="location-tag">📍 Pickup: Rajpur Road, Dehradun</div>
        </div>

        <div className="book-form-card">
          <h2>Complete Your Booking</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" min={new Date().toISOString().split('T')[0]}
                value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" min={form.startDate || new Date().toISOString().split('T')[0]}
                value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Driving License Number</label>
              <input type="text" placeholder="DL-1234567890123"
                value={form.licenseNumber} onChange={e => setForm({ ...form, licenseNumber: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Number of Bikes</label>
              <div className="quantity-selector">
                <button type="button" className="qty-btn" onClick={() => setForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}>−</button>
                <span className="qty-value">{form.quantity}</span>
                <button type="button" className="qty-btn" onClick={() => setForm(f => ({ ...f, quantity: Math.min(bike.stock || 1, f.quantity + 1) }))}>+</button>
              </div>
              <p className="stock-info">🟢 {bike.stock || 1} bike{bike.stock > 1 ? 's' : ''} available</p>
            </div>

            {totalDays > 0 && (
              <div className="booking-summary">
                <div className="summary-row"><span>Duration</span><strong>{totalDays} days</strong></div>
                <div className="summary-row"><span>Bikes</span><strong>{form.quantity} bike{form.quantity > 1 ? 's' : ''}</strong></div>
                <div className="summary-row"><span>Rate</span><strong>₹{bike.pricePerDay}/day</strong></div>
                <div className="summary-row total"><span>Total Amount</span><strong>₹{totalDays * bike.pricePerDay * form.quantity}</strong></div>
              </div>
            )}

            <button type="submit" className="btn-confirm" disabled={loading}>
              {loading ? 'Confirming...' : `Confirm Booking ${totalDays > 0 ? `• ₹${totalDays * bike.pricePerDay * form.quantity}` : ''}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookBike;
