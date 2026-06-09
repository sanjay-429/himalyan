import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import API from '../utils/api';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/contact', form);
      toast.success('Message sent! We will contact you soon 🏍️');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to send message');
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Himalayan Cruiser | Bike Rentals Dehradun</title>
        <meta name="description" content="Contact Himalayan Cruiser at Rajpur Road, Dehradun. Call +91 98765 43210 or email us to plan your Himalayan bike adventure. Open 7 days a week." />
        <link rel="canonical" href="https://himalayancruiser.in/contact" />
      </Helmet>
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Plan your Himalayan adventure with us!</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item"><span>📍</span><div><strong>Location</strong><p>Rajpur Road, Dehradun, Uttarakhand - 248001</p></div></div>
          <div className="info-item"><span>📞</span><div><strong>Phone</strong><p>+91 98765 43210</p></div></div>
          <div className="info-item"><span>✉️</span><div><strong>Email</strong><p>info@himalayancruiser.com</p></div></div>
          <div className="info-item"><span>⏰</span><div><strong>Hours</strong><p>Mon-Sun: 7:00 AM - 9:00 PM</p></div></div>
          <div className="map-placeholder">
            <span>🗺️</span>
            <p>Dehradun, Uttarakhand</p>
            <small>Gateway to the Himalayas</small>
          </div>
        </div>
        <div className="contact-form-card">
          <h2>Send Message</h2>
          <form onSubmit={handleSubmit}>
            {[
              { key: 'name', label: 'Your Name', type: 'text', placeholder: 'Your name' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { key: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
            ].map(f => (
              <div className="form-group" key={f.key}>
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })} required={f.key !== 'phone'} />
              </div>
            ))}
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Tell us about your ride plan..." value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })} required></textarea>
            </div>
            <button type="submit" className="btn-send" disabled={loading}>
              {loading ? 'Sending...' : '🚀 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
