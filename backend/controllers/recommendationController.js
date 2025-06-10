const User = require("../models/User");
const Job = require("../models/Job");
const Recruiter = require("../models/Recruiter");

// Helper function to calculate match score between candidate skills and job skills
const calculateSkillMatchScore = (candidateSkills, jobSkills) => {
  if (!candidateSkills || !jobSkills || candidateSkills.length === 0 || jobSkills.length === 0) {
    return 0;
  }
  
  // Count matching skills
  const matchingSkills = candidateSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(jobSkill.toLowerCase())
    )
  );
  
  // Calculate match percentage
  return (matchingSkills.length / jobSkills.length) * 100;
};

// Helper function to calculate location match (exact match or partial match)
const calculateLocationMatch = (candidateLocation, jobLocation) => {
  if (!candidateLocation || !jobLocation) return 0;
  
  candidateLocation = candidateLocation.toLowerCase();
  jobLocation = jobLocation.toLowerCase();
  
  // Exact match
  if (candidateLocation === jobLocation) return 100;
  
  // Partial match (e.g., same city or state)
  const candidateParts = candidateLocation.split(/[,\s]+/);
  const jobParts = jobLocation.split(/[,\s]+/);
  
  const matchingParts = candidateParts.filter(part => 
    jobParts.includes(part) && part.length > 1
  );
  
  if (matchingParts.length > 0) {
    return 50; // Partial match
  }
  
  return 0;
};

// Get recommended jobs for a user
exports.getRecommendedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    // Get all active jobs
    const jobs = await Job.find({ status: 'Active' })
      .populate('postedBy', 'company');
    
    // Calculate match score for each job
    const recommendedJobs = jobs.map(job => {
      const skillMatchScore = calculateSkillMatchScore(user.skills, job.skills);
      const locationMatchScore = calculateLocationMatch(user.location, job.location);
      
      // Overall match score (weighted average)
      const overallMatchScore = (skillMatchScore * 0.7) + (locationMatchScore * 0.3);
      
      return {
        job,
        matchScore: Math.round(overallMatchScore),
        skillMatchScore: Math.round(skillMatchScore),
        locationMatchScore: Math.round(locationMatchScore)
      };
    });
    
    // Sort by match score (highest first)
    recommendedJobs.sort((a, b) => b.matchScore - a.matchScore);
    
    res.json(recommendedJobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get recommended candidates for a job
exports.getRecommendedCandidatesForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);
    
    if (!job) return res.status(404).json({ msg: "Job not found" });
    
    // Check if the recruiter owns this job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to view recommendations for this job" });
    }
    
    // Get all users with role 'Jobseeker' instead of 'user'
    const candidates = await User.find({ role: 'Jobseeker' }).select("-password");
    
    // Calculate match score for each candidate
    const recommendedCandidates = candidates.map(candidate => {
      const skillMatchScore = calculateSkillMatchScore(candidate.skills, job.skills);
      const locationMatchScore = calculateLocationMatch(candidate.location, job.location);
      
      // Overall match score (weighted average)
      const overallMatchScore = (skillMatchScore * 0.7) + (locationMatchScore * 0.3);
      
      return {
        candidate,
        matchScore: Math.round(overallMatchScore),
        skillMatchScore: Math.round(skillMatchScore),
        locationMatchScore: Math.round(locationMatchScore)
      };
    });
    
    // Sort by match score (highest first)
    recommendedCandidates.sort((a, b) => b.matchScore - a.matchScore);
    
    res.json(recommendedCandidates);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get recommended candidates for a recruiter (across all their jobs)
exports.getRecommendedCandidates = async (req, res) => {
  try {
    // Get recruiter's active jobs
    const recruiterJobs = await Job.find({ 
      postedBy: req.user.id,
      status: 'Active'
    });
    
    if (recruiterJobs.length === 0) {
      return res.json([]);
    }
    
    // Extract all skills from recruiter's jobs
    const jobSkills = recruiterJobs.reduce((skills, job) => {
      return [...skills, ...job.skills];
    }, []);
    
    // Remove duplicates
    const uniqueJobSkills = [...new Set(jobSkills)];
    
    // Get all users with role 'user'
    const candidates = await User.find({ role: 'user' }).select("-password");
    
    // Calculate match score for each candidate
    const recommendedCandidates = candidates.map(candidate => {
      const skillMatchScore = calculateSkillMatchScore(candidate.skills, uniqueJobSkills);
      
      // For location, find best match among all jobs
      const locationMatchScores = recruiterJobs.map(job => 
        calculateLocationMatch(candidate.location, job.location)
      );
      const bestLocationMatchScore = Math.max(...locationMatchScores, 0);
      
      // Overall match score (weighted average)
      const overallMatchScore = (skillMatchScore * 0.7) + (bestLocationMatchScore * 0.3);
      
      return {
        candidate,
        matchScore: Math.round(overallMatchScore),
        skillMatchScore: Math.round(skillMatchScore),
        locationMatchScore: Math.round(bestLocationMatchScore),
        // Include best matching jobs
        matchingJobs: recruiterJobs
          .map(job => {
            const jobSkillMatchScore = calculateSkillMatchScore(candidate.skills, job.skills);
            const jobLocationMatchScore = calculateLocationMatch(candidate.location, job.location);
            const jobOverallMatchScore = (jobSkillMatchScore * 0.7) + (jobLocationMatchScore * 0.3);
            
            return {
              jobId: job._id,
              title: job.title,
              matchScore: Math.round(jobOverallMatchScore)
            };
          })
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 3) // Top 3 matching jobs
      };
    });
    
    // Sort by match score (highest first)
    recommendedCandidates.sort((a, b) => b.matchScore - a.matchScore);
    
    res.json(recommendedCandidates);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};