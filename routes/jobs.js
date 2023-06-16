const express = require('express');
const router = express.Router();

// Import the Job model
const Job = require('../models/jobmodel');

// Route: GET /jobs
// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /jobs
// Create a new job
router.post('/', async (req, res) => {
  const { jobTitle, companyName, jobDescription, applicationDeadline, jobPostingURL } = req.body;

  try {
    const newJob = new Job({
      jobTitle,
      companyName,
      jobDescription,
      applicationDeadline,
      jobPostingURL
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: GET /jobs/:id
// Get a specific job by ID
router.get('/:id', getJobById, (req, res) => {
  res.json(res.job);
});

// Route: PUT /jobs/:id
// Update a specific job by ID
router.put('/:id', getJobById, async (req, res) => {
  const { jobTitle, companyName, jobDescription } = req.body;

  if (jobTitle) res.job.jobTitle = jobTitle;
  if (companyName) res.job.companyName = companyName;
  if (jobDescription) res.job.jobDescription = jobDescription;
  if (applicationDeadline) res.job.applicationDeadline = applicationDeadline;
  if (jobPostingURL) res.job.jobPostingURL = jobPostingURL;

  try {
    const updatedJob = await res.job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: DELETE /jobs/:id
// Delete a specific job by ID
router.delete('/:id', getJobById, async (req, res) => {
  try {
    await res.job.remove();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a job by ID
async function getJobById(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.job = job;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = router;
