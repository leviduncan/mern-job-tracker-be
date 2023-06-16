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
  applicationMethod: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
  interviewDates: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Application', applicationSchema);
