const express = require('express');
const router = express.Router();

// Import the User and Profile models
const User = require('../models/authmodel');
const Profile = require('../models/profilemodel');

// Route: GET /user/dashboard
// Get user's dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Retrieve the logged-in user's profile
    const userProfile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
    
    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
