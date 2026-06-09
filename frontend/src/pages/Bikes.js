import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BikeCard from '../components/BikeCard/BikeCard';
import API from '../utils/api';
import './Bikes.css';

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const types = ['All', 'Adventure', 'Cruiser', 'Sport', 'Commuter'];

  useEffect(() => {
    API.get('/bikes').then(res => {
      setBikes(res.data);
      setFiltered(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleFilter = (type) => {
    setFilter(type);
    setFiltered(type === 'All' ? bikes : bikes.filter(b => b.type === type));
  };

  if (loading) return <div className="loading">Loading bikes... 🏍️</div>;

  return (
    <div className="bikes-page">
      <Helmet>
        <title>Rent Bikes in Dehradun | Adventure & Touring Bikes | Himalayan Cruiser</title>
        <meta name="description" content="Browse our fleet of 30+ premium bikes for rent in Dehradun — Royal Enfield, adventure, cruiser & sport bikes. Best rates for Himalayan tours. Book online instantly!" />
        <link rel="canonical" href="https://himalayancruiser.in/bikes" />
      </Helmet>
      <div className="bikes-hero">
        <h1>Our Fleet</h1>
        <p>Choose from our premium collection of adventure & touring bikes</p>
      </div>
      <div className="bikes-container">
        <div className="filter-bar">
          {types.map(t => (
            <button key={t} className={`filter-btn ${filter === t ? 'active' : ''}`} onClick={() => handleFilter(t)}>
              {t}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="no-bikes">No bikes found. Check back soon!</div>
        ) : (
          <div className="bikes-grid">
            {filtered.map(bike => <BikeCard key={bike._id} bike={bike} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bikes;
