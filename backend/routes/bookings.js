const express = require('express');
const Booking = require('../models/Booking');
const Bike = require('../models/Bike');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { bikeId, startDate, endDate, licenseNumber } = req.body;
    const bike = await Bike.findById(bikeId);
    if (!bike || !bike.isAvailable) return res.status(400).json({ message: 'Bike not available' });
    const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (totalDays < 1) return res.status(400).json({ message: 'Invalid dates' });
    const totalAmount = totalDays * bike.pricePerDay;
    const booking = await Booking.create({
      user: req.user.id, bike: bikeId, startDate, endDate,
      totalDays, totalAmount, licenseNumber
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('bike');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('bike').populate('user', 'name email phone');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
