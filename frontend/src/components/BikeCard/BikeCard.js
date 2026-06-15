import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BikeCard.css';

const BikeCard = ({ bike }) => {
  const navigate = useNavigate();

  return (
    <div className="bike-card">
      <div className="bike-img-wrap">
        {bike.image ? (
          <img src={bike.image} alt={bike.name} />
        ) : (
          <div className="bike-img-placeholder">🏍️</div>
        )}
        <span className={`bike-badge ${bike.isAvailable && bike.stock > 0 ? 'available' : 'unavailable'}`}>
          {bike.isAvailable && bike.stock > 0 ? 'Available' : 'Booked'}
        </span>
        {bike.stock > 0 && bike.isAvailable && (
          <span className="bike-stock">{bike.stock} left</span>
        )}
      </div>
      <div className="bike-info">
        <div className="bike-header">
          <h3>{bike.name}</h3>
          <span className="bike-type">{bike.type}</span>
        </div>
        <p className="bike-brand">{bike.brand} • {bike.cc}cc</p>
        <p className="bike-desc">{bike.description}</p>
        {bike.features?.length > 0 && (
          <div className="bike-features">
            {bike.features.slice(0, 3).map((f, i) => <span key={i}>{f}</span>)}
          </div>
        )}
        <div className="bike-footer">
          <div className="bike-price">
            <span className="price">₹{bike.pricePerDay}</span>
            <span className="per">/day</span>
          </div>
          <button
            className="btn-book"
            disabled={!bike.isAvailable}
            onClick={() => navigate(`/book/${bike._id}`)}
          >
            {bike.isAvailable ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
