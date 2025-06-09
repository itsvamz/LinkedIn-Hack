const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  status: { 
    type: String, 
    enum: ['Applied', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'], 
    default: 'Applied' 
  },
  cv: { type: String },
  coverLetter: { type: String },
  notes: { type: String },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Application", ApplicationSchema);