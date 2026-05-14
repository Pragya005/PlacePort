const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  jobType: { type: String, enum: ['Full-Time', 'Internship', 'Part-Time', 'Contract'], default: 'Full-Time' },
  eligibility: {
    minCGPA: { type: Number, default: 0 },
    branches: [{ type: String }],
    passingYear: { type: Number },
  },
  skills: [{ type: String }],
  deadline: { type: Date },
  openings: { type: Number, default: 1 },
  isOpen: { type: Boolean, default: true },
  applicants: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected'], default: 'Applied' }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);