const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: Date,
    required: true,
  },
  applicationStatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Application', applicationSchema);
