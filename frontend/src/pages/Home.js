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
  {
    name: 'Mussoorie', dist: '35 km', emoji: '🌄',
    img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Mussoorie,+Uttarakhand',
  },
  {
    name: 'Rishikesh', dist: '45 km', emoji: '🕉️',
    img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Rishikesh,+Uttarakhand',
  },
  {
    name: 'Auli', dist: '280 km', emoji: '⛷️',
    img: 'https://images.unsplash.com/photo-1580289519426-aa01d9e3b89f?w=400&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Auli,+Uttarakhand',
  },
  {
    name: 'Chakrata', dist: '88 km', emoji: '🌲',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Chakrata,+Uttarakhand',
  },
  {
    name: 'Lansdowne', dist: '120 km', emoji: '🏕️',
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Lansdowne,+Uttarakhand',
  },
  {
    name: 'Kedarnath', dist: '245 km', emoji: '⛰️',
    img: 'https://images.unsplash.com/photo-1617195737496-bc30194e3a19?w=400&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Kedarnath,+Uttarakhand',
  },
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
          <a key={i} className="route-card" href={r.mapUrl} target="_blank" rel="noopener noreferrer">
            <div className="route-img-wrap">
              <img src={r.img} alt={r.name} />
              <span className="route-emoji">{r.emoji}</span>
            </div>
            <h4>{r.name}</h4>
            <p>{r.dist} from Dehradun</p>
            <span className="route-map-link">🗺️ View Route</span>
          </a>
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
