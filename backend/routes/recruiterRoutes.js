const express = require("express");
const router = express.Router();
const {
  shortlistCandidate,
  rejectCandidate,
  getShortlistedCandidates,
  getRejectedCandidates,
  getCandidates,
  bookmarkCandidate,
  getBookmarkedCandidates,
  getAllRecruiters
} = require("../controllers/recruiterController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public route - no auth required
router.get("/all", getAllRecruiters);

// All other routes require authentication
router.use(authMiddleware);

// All other routes require recruiter role
router.use(roleMiddleware("recruiter"));

// Candidate management routes
router.post("/shortlist/:id", shortlistCandidate);
router.post("/reject/:id", rejectCandidate);
router.get("/shortlisted", getShortlistedCandidates);
router.get("/rejected", getRejectedCandidates);
router.get("/candidates", getCandidates);

// Bookmark routes
router.post("/bookmark", bookmarkCandidate);
router.get("/bookmarked", getBookmarkedCandidates);

module.exports = router;
