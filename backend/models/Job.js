const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'], required: true },
  salary: { type: String },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  skills: [{ type: String }],
  benefits: [{ type: String }],
  status: { type: String, enum: ['Active', 'Draft', 'Closed'], default: 'Active' },
  applicants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Applied', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'], default: 'Applied' },
    appliedAt: { type: Date, default: Date.now },
    cv: { type: String },
    coverLetter: { type: String }
  }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  postedDate: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  applications: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);