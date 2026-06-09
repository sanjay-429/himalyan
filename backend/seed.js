const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const User = require('./models/User');
  const Bike = require('./models/Bike');

  // Create admin user
  const existing = await User.findOne({ email: 'admin@himalayancruiser.com' });
  if (!existing) {
    await User.create({
      name: 'Admin',
      email: 'admin@himalayancruiser.com',
      phone: '+91 98765 43210',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    });
    console.log('✅ Admin created: admin@himalayancruiser.com / admin123');
  } else {
    console.log('ℹ️  Admin already exists');
  }

  // Seed sample bikes
  const count = await Bike.countDocuments();
  if (count === 0) {
    await Bike.insertMany([
      { name: 'Royal Enfield Himalayan', brand: 'Royal Enfield', type: 'Adventure', cc: 411, pricePerDay: 1500, description: 'Perfect for Himalayan trails and mountain roads', features: ['ABS', 'Dual Channel', 'Trip Meter'], isAvailable: true },
      { name: 'KTM 390 Adventure', brand: 'KTM', type: 'Adventure', cc: 373, pricePerDay: 2000, description: 'Performance adventure bike for serious riders', features: ['WP Suspension', 'Cornering ABS', 'Quickshifter'], isAvailable: true },
      { name: 'Bajaj Dominar 400', brand: 'Bajaj', type: 'Cruiser', cc: 373, pricePerDay: 1200, description: 'Comfortable cruiser for long highway rides', features: ['LED Lights', 'Digital Console', 'Dual ABS'], isAvailable: true },
      { name: 'Honda CB300R', brand: 'Honda', type: 'Sport', cc: 286, pricePerDay: 1100, description: 'Sporty naked bike for city and highway', features: ['USD Forks', 'Round LED', 'ABS'], isAvailable: true },
      { name: 'Hero Xpulse 200', brand: 'Hero', type: 'Adventure', cc: 200, pricePerDay: 800, description: 'Light and nimble adventure tourer', features: ['Fuel Injection', 'USB Charging', 'Rally Kit'], isAvailable: true },
      { name: 'Yamaha FZ-S V3', brand: 'Yamaha', type: 'Sport', cc: 149, pricePerDay: 700, description: 'Popular street sport for daily touring', features: ['Fuel Injection', 'ABS', 'LED DRL'], isAvailable: true },
    ]);
    console.log('✅ Sample bikes seeded');
  }

  console.log('🎉 Seed complete!');
  process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });
