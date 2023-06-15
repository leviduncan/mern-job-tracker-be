const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route: GET /jobs/search
// Search for jobs using a keyword
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  
  try {
    // Make an API request to an external job search API
    const response = await axios.get(`https://api.example.com/jobs?keyword=${keyword}`);
    const jobs = response.data;
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve job search results' });
  }
});

module.exports = router;
