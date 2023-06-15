const express = require('express');
const router = express.Router();

// Import the User model
const User = require('../models/profilemodel');

// Route: GET /profile
// Get user profile details
router.get('/', async (req, res) => {
  try {
    // Get the user profile based on the authenticated user (assuming authentication middleware is used)
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: PUT /profile
// Update user profile
router.put('/', async (req, res) => {
  const { username, email } = req.body;

  try {
    // Get the user profile based on the authenticated user (assuming authentication middleware is used)
    const user = await User.findById(req.user.id);

    if (username) user.username = username;
    if (email) user.email = email;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: DELETE /profile
// Delete user profile
router.delete('/', async (req, res) => {
  try {
    // Get the user profile based on the authenticated user (assuming authentication middleware is used)
    const user = await User.findById(req.user.id);

    // TODO: Delete associated data, such as jobs or applications related to the user

    await user.remove();
    res.json({ message: 'User profile deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
