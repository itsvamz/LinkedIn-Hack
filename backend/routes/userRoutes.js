const User = require("../models/User");
const { getAllUsers } = require("../controllers/userController");
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
  getUserById,
   // Add this import
} = require("../controllers/userController");

// Then add the route
router.get("/all", getAllUsers);
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public routes (no authentication required)
router.get("/public/:id", getPublicProfile);
router.get("/public/:id/pitch", getPublicPitch);
router.post("/analytics/:id", incrementAnalytics);

// Protected routes (require authentication)
router.use(authMiddleware);

// User profile routes (protected)
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/resume", uploadResume);

// Pitch routes
router.post("/pitch", createPitch);
router.put("/pitch", updatePitch);
router.get("/analytics", getAnalytics);

// Fetch user by ID
router.get("/:id", getUserById);

router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err); // <-- add this
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
