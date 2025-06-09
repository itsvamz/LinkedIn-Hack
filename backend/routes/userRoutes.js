const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadResume,
  createPitch,
  updatePitch,
  getPitch,
  createAvatar,
  getAvatar,
  applyForJob,
  getMyApplications,
  getAnalytics,
  incrementAnalytics,
  getPublicProfile,
  getPublicPitch,
  getUserById
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public routes
router.get("/public/:id", getPublicProfile);
router.get("/public/:id/pitch", getPublicPitch);
router.post("/analytics/:id", incrementAnalytics);

// Protected routes (require authentication)
router.use(authMiddleware);

// User-specific routes (require user role)
router.use(roleMiddleware("user"));

// Profile routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/resume", uploadResume);

// Pitch routes
router.post("/pitch", createPitch);
router.put("/pitch", updatePitch);
router.get("/analytics", getAnalytics);

// Fetch user by ID
router.get("/:id", getUserById);

module.exports = router;
