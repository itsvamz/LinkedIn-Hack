const User = require("../models/User"); // ✅ Replaces Candidate
const Recruiter = require("../models/Recruiter");

// Shortlist candidate
exports.shortlistCandidate = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id);
    const candidateId = req.params.id;

    if (!recruiter) return res.status(403).json({ message: "Access denied" });

    if (!recruiter.shortlistedCandidates.includes(candidateId)) {
      recruiter.shortlistedCandidates.push(candidateId);
      recruiter.rejectedCandidates = recruiter.rejectedCandidates.filter(
        (id) => id.toString() !== candidateId
      );
      await recruiter.save();
    }

    res.json({ message: "Candidate shortlisted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error shortlisting candidate", error: err.message });
  }
};

// Reject candidate
exports.rejectCandidate = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id);
    const candidateId = req.params.id;

    if (!recruiter) return res.status(403).json({ message: "Access denied" });

    if (!recruiter.rejectedCandidates.includes(candidateId)) {
      recruiter.rejectedCandidates.push(candidateId);
      recruiter.shortlistedCandidates = recruiter.shortlistedCandidates.filter(
        (id) => id.toString() !== candidateId
      );
      await recruiter.save();
    }

    res.json({ message: "Candidate rejected successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error rejecting candidate", error: err.message });
  }
};

// View shortlisted
exports.getShortlistedCandidates = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id).populate(
      "shortlistedCandidates",
      "-password"
    );
    res.json(recruiter.shortlistedCandidates || []);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching shortlisted candidates",
      error: err.message,
    });
  }
};

// View rejected
exports.getRejectedCandidates = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id).populate(
      "rejectedCandidates",
      "-password"
    );
    res.json(recruiter.rejectedCandidates || []);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching rejected candidates",
      error: err.message,
    });
  }
};

// View all/filter candidates (optional utility)
exports.getCandidates = async (req, res) => {
  try {
    const filters = { role: "user" }; // Only candidates

    // Optional: add more filters from query string
    if (req.query.skills) {
      filters["profile.skills"] = { $in: req.query.skills.split(",") };
    }

    const candidates = await User.find(filters).select("-password");
    res.json(candidates);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching candidates", error: err.message });
  }
};
