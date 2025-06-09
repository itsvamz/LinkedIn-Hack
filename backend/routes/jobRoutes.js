const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getRecruiterJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
  getJobApplications,
  updateApplicationStatus,
  getUserApplications
} = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public routes
router.get("/", getAllJobs);
router.get("/detail/:id", getJobById);

// Protected routes
router.use(authMiddleware);

// User routes
router.post("/apply/:id", applyForJob);
router.get("/applications/user", getUserApplications);

// Recruiter routes
router.post("/", roleMiddleware("recruiter"), createJob);
router.get("/recruiter", roleMiddleware("recruiter"), getRecruiterJobs);
router.put("/:id", roleMiddleware("recruiter"), updateJob);
router.delete("/:id", roleMiddleware("recruiter"), deleteJob);
router.get("/applications/:id", roleMiddleware("recruiter"), getJobApplications);
router.put("/applications/:applicationId", roleMiddleware("recruiter"), updateApplicationStatus);

module.exports = router;