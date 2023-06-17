const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Import the User model
const User = require('../models/authmodel');

// Route: POST /register
// User registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /login
// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // TODO: Generate and send JWT token for authentication

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /logout
// User logout
router.post('/logout', (req, res) => {
  // TODO: Handle user logout, clear session or token

  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
