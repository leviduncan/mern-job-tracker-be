const express = require('express');
const router = express.Router();

// Import the Application model
const Application = require('../models/applicationmodel');

// Route: GET /applications
// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /applications
// Create a new application
router.post('/', async (req, res) => {
  const { jobTitle, companyName, applicationDate, applicationStatus } = req.body;

  try {
    const newApplication = new Application({
      jobTitle,
      companyName,
      applicationDate,
      applicationStatus,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: GET /applications/:id
// Get a specific application by ID
router.get('/:id', getApplicationById, (req, res) => {
  res.json(res.application);
});

// Route: PUT /applications/:id
// Update a specific application by ID
router.put('/:id', getApplicationById, async (req, res) => {
  const { jobTitle, companyName, applicationDate, applicationStatus } = req.body;

  if (jobTitle) res.application.jobTitle = jobTitle;
  if (companyName) res.application.companyName = companyName;
  if (applicationDate) res.application.applicationDate = applicationDate;
  if (applicationStatus) res.application.applicationStatus = applicationStatus;

  try {
    const updatedApplication = await res.application.save();
    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: DELETE /applications/:id
// Delete a specific application by ID
router.delete('/:id', getApplicationById, async (req, res) => {
  try {
    await res.application.remove();
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get an application by ID
async function getApplicationById(req, res, next) {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.application = application;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = router;
