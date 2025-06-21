const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getProfile,
  updateProfile,
  uploadResume,
  createPitch,
  updatePitch,
  getPitch,
  createAvatar,
  getAvatar,
  uploadAvatar, // ✅ Add this
  applyForJob,
  getMyApplications,
  getAnalytics,
  incrementAnalytics,
  getPublicProfile,
  getPublicPitch,
  getUserById,
  getAllUsers
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const User = require("../models/User");

// 📌 Public routes
router.get("/all", getAllUsers);
router.get("/public/:id", getPublicProfile);
router.get("/public/:id/pitch", getPublicPitch);
router.post("/analytics/:id", incrementAnalytics);

// 📌 Protected routes (require authentication)
router.use(authMiddleware);

// User profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/resume", uploadResume);

// Pitch
router.post("/pitch", createPitch);
router.put("/pitch", updatePitch);
router.get("/pitch", getPitch);  // Add this line
router.get("/analytics", getAnalytics);

// Get user by ID
router.get("/:id", getUserById);

// Fetch all users with role 'user'
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Configure avatar upload
// Add these imports at the top of the file
// Configure multer storage for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/avatars");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'avatar-' + uniqueSuffix + ext);
  }
});

const avatarUpload = multer({ storage: storage });

// ✅ Avatar routes
// Add this route before the module.exports line
router.post("/avatar", authMiddleware, avatarUpload.single("avatar"), uploadAvatar);
router.get("/avatar", authMiddleware, getAvatar);

module.exports = router;
