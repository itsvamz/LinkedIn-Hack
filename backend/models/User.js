const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'recruiter'], required: true },
  fullName: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  
  // Professional profiles
  linkedin: { type: String },
  github: { type: String },
  leetcode: { type: String },
  portfolio: { type: String },
  
  // Skills and availability
  skills: [{ type: String }],
  availability: { type: String },
  
  // Resume data
  education: [{
    institution: { type: String },
    degree: { type: String },
    year: { type: String },
    gpa: { type: String }
  }],
  experience: [{
    company: { type: String },
    position: { type: String },
    duration: { type: String },
    description: { type: String }
  }],
  projects: [{
    name: { type: String },
    tech: [{ type: String }],
    description: { type: String }
  }],
  
  // Analytics
  profileViews: { type: Number, default: 0 },
  profileClicks: { type: Number, default: 0 },
  profileLikes: { type: Number, default: 0 },
  profileBookmarks: { type: Number, default: 0 },
  pitchViews: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);