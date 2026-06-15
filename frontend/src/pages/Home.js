import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Home.css';

const features = [
  { icon: '🌿', title: 'Road Ready', desc: 'Every bike serviced for mountain roads of Uttarakhand' },
  { icon: '🛡️', title: 'Fully Insured', desc: 'Complete insurance coverage on every ride' },
  { icon: '📍', title: 'Dehradun Base', desc: 'Pickup & drop at Rajpur Road, Dehradun' },
  { icon: '🔧', title: '24/7 Support', desc: 'Roadside assistance anytime, anywhere' },
];

const routes = [
  {
    name: 'Mussoorie', dist: '35 km', emoji: '🌄', tag: 'Hill Station',
    img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Mussoorie,+Uttarakhand'
  },
  {
    name: 'Rishikesh', dist: '45 km', emoji: '🕉️', tag: 'Adventure Capital',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Rishikesh,+Uttarakhand'
  },
  {
    name: 'Auli', dist: '280 km', emoji: '⛷️', tag: 'Ski Resort',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Auli,+Uttarakhand'
  },
  {
    name: 'Chakrata', dist: '88 km', emoji: '🌲', tag: 'Forest Trails',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Chakrata,+Uttarakhand'
  },
  {
    name: 'Lansdowne', dist: '120 km', emoji: '🏕️', tag: 'Camping',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Lansdowne,+Uttarakhand'
  },
  {
    name: 'Kedarnath', dist: '245 km', emoji: '⛰️', tag: 'Pilgrimage',
    img: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=600&q=80',
    mapUrl: 'https://www.google.com/maps/dir/Dehradun,+Uttarakhand/Kedarnath,+Uttarakhand'
  },
];

const steps = [
  { num: '01', icon: '🔍', title: 'Browse Bikes', desc: 'Explore our fleet of 30+ premium adventure & touring bikes' },
  { num: '02', icon: '📅', title: 'Book Online', desc: 'Pick your dates and confirm your booking in 2 minutes' },
  { num: '03', icon: '📍', title: 'Pick Up in Dehradun', desc: 'Collect your bike at Rajpur Road with full gear' },
  { num: '04', icon: '🌲', title: 'Ride & Explore', desc: 'Wind through green hills, forests & scenic mountain roads' },
];

const testimonials = [
  { name: 'Arjun Mehta', city: 'Delhi', rating: 5, text: 'Best bike rental experience ever! The Royal Enfield Himalayan was in perfect condition. The team at Dehradun was super helpful.', avatar: 'A' },
  { name: 'Sneha Patel', city: 'Mumbai', rating: 5, text: 'Rode to Kedarnath and back — not a single issue. 24/7 support is real, they picked up at 2am when I had a query. Highly recommend!', avatar: 'S' },
  { name: 'Rohit Verma', city: 'Bangalore', rating: 5, text: 'Rented a KTM 390 for the Auli trip. Immaculate condition, fair pricing, and the pickup process was seamless. Will be back!', avatar: 'R' },
];

// Animated counter hook
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const Home = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef(null);

  const riders = useCounter(500, 1800, statsVisible);
  const bikes = useCounter(30, 1500, statsVisible);
  const years = useCounter(6, 1200, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>Himalayan Wheels | Bike Rentals in Dehradun, Uttarakhand</title>
        <meta name="description" content="Rent premium adventure & touring bikes in Dehradun. Explore Mussoorie, Rishikesh, Auli, Kedarnath & more with Himalayan Wheels. 500+ happy riders since 2018." />
        <link rel="canonical" href="https://himalyanwheels.com/" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tag">📍 Dehradun • Mussoorie • Chakrata • Rishikesh</span>
            <h1>Where Every Road<br />Becomes an <span>Adventure</span></h1>
            <p>Rent a bike, roll into the hills, and let the green<br />mountain roads of Uttarakhand do the talking.</p>
            <div className="hero-btns">
              <Link to="/bikes" className="btn-primary">🏍️ Browse Bikes</Link>
              <Link to="/contact" className="btn-secondary">Plan Your Ride ➔</Link>
            </div>
            <div className="hero-stats" ref={statsRef}>
              <div><strong>{riders}+</strong><span>Happy Riders</span></div>
              <div><strong>{bikes}+</strong><span>Premium Bikes</span></div>
              <div><strong>{years}+</strong><span>Years of Service</span></div>
              <div><strong>5★</strong><span>Rated Service</span></div>
            </div>
          </div>
        </div>
        <div className="hero-road">
          <svg viewBox="0 0 1440 130" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 C360,140 720,20 1080,80 C1260,110 1380,90 1440,80 L1440,130 L0,130 Z" fill="#f9fafb" />
            <path d="M660,80 L780,80" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="18,14" />
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="section-header">
          <span className="section-badge">Simple Process</span>
          <h2>How It Works</h2>
          <p>Book your dream ride in under 2 minutes</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Why Us</span>
          <h2>Why Choose Himalayan Wheels?</h2>
          <p>Dehradun's most trusted bike rental service since 2018</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-wrap"><span>{f.icon}</span></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR ROUTES ── */}
      <section className="routes-section">
        <div className="section-header">
          <span className="section-badge">Destinations</span>
          <h2>Popular Routes from Dehradun</h2>
          <p>Breathtaking destinations waiting to be explored</p>
        </div>
        <div className="routes-grid">
          {routes.map((r, i) => (
            <a key={i} className="route-card" href={r.mapUrl} target="_blank" rel="noopener noreferrer">
              <div className="route-img-wrap">
                <img src={r.img} alt={r.name} loading="lazy" />
                <span className="route-tag">{r.tag}</span>
                <div className="route-overlay">
                  <span className="route-emoji">{r.emoji}</span>
                  <h4>{r.name}</h4>
                  <p>{r.dist} from Dehradun</p>
                  <span className="route-map-btn">🗺️ Open in Maps</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-badge">Reviews</span>
          <h2>What Riders Say</h2>
          <p>500+ happy riders can't be wrong</p>
        </div>
        <div className="testimonials-wrapper">
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-card ${i === activeTestimonial ? 'active' : ''}`}>
              <div className="stars">{'★'.repeat(t.rating)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.avatar}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dot ${i === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-content">
          <span className="section-badge light">Limited Availability</span>
          <h2>Ready to Chase the Hills?</h2>
          <p>Mussoorie, Chakrata, Rishikesh — your next ride is just a booking away.</p>
          <div className="cta-btns">
            <Link to="/bikes" className="btn-primary">View Available Bikes</Link>
            <Link to="/contact" className="btn-secondary">Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
