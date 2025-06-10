const mongoose = require("mongoose");

const AvatarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'userModel',
    required: true
  },
  userModel: {
    type: String,
    required: true,
    enum: ['User', 'Recruiter']
  },
  settings: {
    hair: { type: String },
    face: { type: String },
    outfit: { type: String },
    accessories: { type: String },
    background: { type: String },
    color: { type: String }
  },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Avatar", AvatarSchema);