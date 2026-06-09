const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, enum: ['Adventure', 'Cruiser', 'Sport', 'Commuter'], required: true },
  cc: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  isAvailable: { type: Boolean, default: true },
  features: [String],
}, { timestamps: true });

module.exports = mongoose.model('Bike', bikeSchema);
