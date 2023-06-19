const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());

const jwt = require('jsonwebtoken')

// Import routes
const jobsRoutes = require('./routes/jobs');
const applicationsRoutes = require('./routes/applications');
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const jobSearchRoutes = require('./routes/jobSearch');
const profileRoutes = require('./routes/profile');
const userDashboardRoutes = require('./routes/userDashboard');
const connectDB = require('./config/db');



// Middleware

app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/jobs', jobsRoutes);
app.use('/applications', applicationsRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/auth', authRoutes);
app.use('/jobSearch', jobSearchRoutes);
app.use('/profile', profileRoutes);
app.use('/userDashboard', userDashboardRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
