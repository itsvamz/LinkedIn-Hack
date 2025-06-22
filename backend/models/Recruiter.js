const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "recruiter",
      enum: ["recruiter", "admin"],
    },
    phone: { type: String },
    location: { type: String },
    // Add resume path
    resumePath: { type: String },
    
    // Professional profiles
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    
    // Company information
    company: { type: String },
    position: { type: String },
    industry: [{ type: String }],
    about: { type: String },
    
    // Candidate management
    shortlistedCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rejectedCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    
    // Analytics
    profileViews: { type: Number, default: 0 },
    responseRate: { type: Number, default: 0 },
    
    // Avatar and customization
    avatar: { type: String },
    avatarSettings: { type: Object },
    // Add bookmarkedCandidates field to the schema
    bookmarkedCandidates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recruiter", RecruiterSchema);