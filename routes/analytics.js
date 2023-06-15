const express = require('express');
const router = express.Router();

// Import the Application model
const Application = require('../models/applicationmodel');

// Route: GET /analytics
// Get analytics or reporting data
router.get('/', async (req, res) => {
  try {
    // Calculate the total number of applications
    const totalApplications = await Application.countDocuments();

    // Calculate the number of applications by status
    const applicationsByStatus = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Calculate the average salary of all jobs
    const averageSalary = await Application.aggregate([
      { $group: { _id: null, averageSalary: { $avg: '$job.salary' } } },
    ]);

    res.json({
      totalApplications,
      applicationsByStatus,
      averageSalary: averageSalary.length > 0 ? averageSalary[0].averageSalary : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
