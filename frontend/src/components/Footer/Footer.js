import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <h3>🏍️ Himalayan Wheels</h3>
        <p>Dehradun's #1 Bike Rental Service</p>
        <p>📍 Rajpur Road, Dehradun, Uttarakhand - 248001</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ info@himalyanwheels.com</p>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <Link to="/">Home</Link>
        <Link to="/bikes">Our Bikes</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="footer-links">
        <h4>Popular Routes</h4>
        <span>Dehradun → Mussoorie</span>
        <span>Dehradun → Rishikesh</span>
        <span>Dehradun → Auli</span>
        <span>Dehradun → Chakrata</span>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2024 Himalayan Wheels. All rights reserved. | Dehradun, Uttarakhand</p>
    </div>
  </footer>
);

export default Footer;
