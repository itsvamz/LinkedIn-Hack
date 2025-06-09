const express = require("express");
const router = express.Router();
const {
  getRecommendedJobs,
  getRecommendedCandidatesForJob,
  getRecommendedCandidates
} = require("../controllers/recommendationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// All routes require authentication
router.use(authMiddleware);

// User routes
router.get("/jobs", getRecommendedJobs);

// Recruiter routes
router.get("/candidates", roleMiddleware("recruiter"), getRecommendedCandidates);
router.get("/job/:jobId/candidates", roleMiddleware("recruiter"), getRecommendedCandidatesForJob);

module.exports = router;