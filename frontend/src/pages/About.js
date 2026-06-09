import React from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';

const team = [
  { name: 'Rajesh Sharma', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Priya Negi', role: 'Operations Manager', emoji: '👩‍💼' },
  { name: 'Vikram Singh', role: 'Head Mechanic', emoji: '🔧' },
];

const About = () => (
  <div className="about-page">
    <Helmet>
      <title>About Us | Himalayan Cruiser - Dehradun Bike Rentals Since 2018</title>
      <meta name="description" content="Learn about Himalayan Cruiser — Dehradun's most trusted bike rental service since 2018. Meet our team and discover our story of passion for the Himalayas." />
      <link rel="canonical" href="https://himalayancruiser.in/about" />
    </Helmet>
    <div className="about-hero">
      <h1>About Himalayan Cruiser</h1>
      <p>Dehradun's Premier Bike Rental Service Since 2018</p>
    </div>

    <div className="about-container">
      <div className="about-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>Himalayan Cruiser was born out of a passion for the mountains and a love for motorcycles. Based in the heart of Dehradun — the Gateway to the Himalayas — we have been helping riders explore some of the most breathtaking landscapes in the world since 2018.</p>
          <p>From the serene roads of Mussoorie to the challenging terrains of Auli, our bikes have conquered every trail in Uttarakhand. We believe every rider deserves a premium experience without compromise on safety or quality.</p>
          <div className="about-stats">
            <div><strong>6+</strong><span>Years of Service</span></div>
            <div><strong>500+</strong><span>Happy Riders</span></div>
            <div><strong>30+</strong><span>Premium Bikes</span></div>
            <div><strong>15+</strong><span>Routes Covered</span></div>
          </div>
        </div>
        <div className="story-visual">
          <div className="visual-card">🏔️<p>Himalayas</p></div>
          <div className="visual-card">🏍️<p>Premium Bikes</p></div>
          <div className="visual-card">📍<p>Dehradun Base</p></div>
          <div className="visual-card">🛡️<p>Safe Rides</p></div>
        </div>
      </div>

      <div className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {team.map((m, i) => (
            <div key={i} className="team-card">
              <span className="team-emoji">{m.emoji}</span>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About;
