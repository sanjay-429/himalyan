const express = require('express');
const Booking = require('../models/Booking');
const Bike = require('../models/Bike');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { bikeId, startDate, endDate, licenseNumber, quantity = 1 } = req.body;
    const bike = await Bike.findById(bikeId);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    if (!bike.isAvailable) return res.status(400).json({ message: 'Bike not available' });
    if (bike.stock < quantity) return res.status(400).json({ message: `Only ${bike.stock} bike(s) available` });
    const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (totalDays < 1) return res.status(400).json({ message: 'Invalid dates' });
    const totalAmount = totalDays * bike.pricePerDay * quantity;
    const booking = await Booking.create({
      user: req.user.id, bike: bikeId, startDate, endDate,
      totalDays, totalAmount, quantity, licenseNumber
    });
    // Stock is NOT decreased here — only when admin confirms
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
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    const prevStatus = booking.status;
    const newStatus = req.body.status;
    const qty = booking.quantity || 1;

    // Admin confirms → decrease stock
    if (newStatus === 'confirmed' && prevStatus === 'pending') {
      const bike = await Bike.findById(booking.bike);
      if (!bike || bike.stock < qty)
        return res.status(400).json({ message: `Only ${bike?.stock || 0} bike(s) in stock` });
      bike.stock -= qty;
      if (bike.stock === 0) bike.isAvailable = false;
      await bike.save();
    }

    // Admin cancels a confirmed booking → restore stock
    if (newStatus === 'cancelled' && prevStatus === 'confirmed') {
      await Bike.findByIdAndUpdate(booking.bike, { $inc: { stock: qty }, isAvailable: true });
    }

    // Admin completes → restore stock (bike back in fleet)
    if (newStatus === 'completed' && prevStatus === 'confirmed') {
      await Bike.findByIdAndUpdate(booking.bike, { $inc: { stock: qty }, isAvailable: true });
    }

    booking.status = newStatus;
    await booking.save();
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
    // Restore stock only if booking was confirmed
    if (booking.status === 'confirmed') {
      await Bike.findByIdAndUpdate(booking.bike, {
        $inc: { stock: booking.quantity || 1 },
        isAvailable: true
      });
    }
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
