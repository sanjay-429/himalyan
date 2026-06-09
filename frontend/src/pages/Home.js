import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Home.css';

const features = [
  { icon: '🏔️', title: 'Mountain Ready', desc: 'All bikes serviced for Himalayan terrain' },
  { icon: '🛡️', title: 'Fully Insured', desc: 'Complete insurance coverage included' },
  { icon: '📍', title: 'Dehradun Base', desc: 'Pickup & drop at Rajpur Road, Dehradun' },
  { icon: '🔧', title: '24/7 Support', desc: 'Roadside assistance anytime, anywhere' },
];

const routes = [
  { name: 'Mussoorie', dist: '35 km', emoji: '🌄' },
  { name: 'Rishikesh', dist: '45 km', emoji: '🕉️' },
  { name: 'Auli', dist: '280 km', emoji: '⛷️' },
  { name: 'Chakrata', dist: '88 km', emoji: '🌲' },
  { name: 'Lansdowne', dist: '120 km', emoji: '🏕️' },
  { name: 'Kedarnath', dist: '245 km', emoji: '⛰️' },
];

const Home = () => (
  <div className="home">
    <Helmet>
      <title>Himalayan Cruiser | Bike Rentals in Dehradun, Uttarakhand</title>
      <meta name="description" content="Rent premium adventure & touring bikes in Dehradun. Explore Mussoorie, Rishikesh, Auli, Kedarnath & more with Himalayan Cruiser. 500+ happy riders since 2018." />
      <link rel="canonical" href="https://himalayancruiser.in/" />
    </Helmet>
    {/* Hero */}
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-tag">📍 Based in Dehradun, Uttarakhand</span>
          <h1>Explore the Himalayas on Two Wheels</h1>
          <p>Premium bike rentals from the gateway to the Himalayas. Start your adventure today!</p>
          <div className="hero-btns">
            <Link to="/bikes" className="btn-primary">Browse Bikes</Link>
            <Link to="/contact" className="btn-secondary">Plan Your Ride</Link>
          </div>
          <div className="hero-stats">
            <div><strong>500+</strong><span>Happy Riders</span></div>
            <div><strong>30+</strong><span>Premium Bikes</span></div>
            <div><strong>5★</strong><span>Rated Service</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="features-section">
      <div className="section-header">
        <h2>Why Choose Himalayan Cruiser?</h2>
        <p>Dehradun's most trusted bike rental service since 2018</p>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Popular Routes */}
    <section className="routes-section">
      <div className="section-header">
        <h2>Popular Routes from Dehradun</h2>
        <p>Discover breathtaking destinations on our well-maintained bikes</p>
      </div>
      <div className="routes-grid">
        {routes.map((r, i) => (
          <div key={i} className="route-card">
            <span className="route-emoji">{r.emoji}</span>
            <h4>{r.name}</h4>
            <p>{r.dist} from Dehradun</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="cta-section">
      <h2>Ready to Hit the Mountains?</h2>
      <p>Book your bike now and start the adventure of a lifetime from Dehradun!</p>
      <Link to="/bikes" className="btn-primary">View Available Bikes</Link>
    </section>
  </div>
);

export default Home;
