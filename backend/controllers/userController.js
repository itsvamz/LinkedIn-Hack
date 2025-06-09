const User = require("../models/User");
const Pitch = require("../models/Pitch");
const Avatar = require("../models/Avatar");
const Job = require("../models/Job");
const mixpanel = require("../mixpanel");

// Profile Management
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { 
    fullName, phone, location, linkedin, github, 
    leetcode, portfolio, skills, availability 
  } = req.body;

  try {
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;
    if (linkedin) updateData.linkedin = linkedin;
    if (github) updateData.github = github;
    if (leetcode) updateData.leetcode = leetcode;
    if (portfolio) updateData.portfolio = portfolio;
    if (skills) updateData.skills = skills;
    if (availability) updateData.availability = availability;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    mixpanel.track("Profile Updated", {
      distinct_id: req.user.id,
    });

    res.json({ msg: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Resume Management
exports.uploadResume = async (req, res) => {
  const { resumeText } = req.body;

  try {
    // Parse resume text to extract information
    const educationMatch = resumeText.match(/Education:\n(.+?)(?:\n\S|$)/s);
    const experienceMatch = resumeText.match(/Experience:\n(.+?)(?:\n\S|$)/s);
    const skillsMatch = resumeText.match(/Skills:\n((?:- .+\n)+)/);
    const projectsMatch = resumeText.match(/Projects:\n((?:- .+\n)+)/);

    // Extract and format the data
    const education = educationMatch ? 
      educationMatch[1].trim().split('\n').map(edu => {
        const parts = edu.split(',');
        return {
          institution: parts[0]?.trim() || '',
          degree: parts[1]?.trim() || '',
          year: parts[2]?.trim() || '',
          gpa: parts[3]?.trim() || ''
        };
      }) : [];

    const experience = experienceMatch ? 
      experienceMatch[1].trim().split('\n').map(exp => {
        const parts = exp.split(',');
        return {
          company: parts[0]?.trim() || '',
          position: parts[1]?.trim() || '',
          duration: parts[2]?.trim() || '',
          description: parts[3]?.trim() || ''
        };
      }) : [];

    const skills = skillsMatch
      ? skillsMatch[1]
          .split("\n")
          .filter(Boolean)
          .map((s) => s.replace("- ", ""))
      : [];

    const projects = projectsMatch
      ? projectsMatch[1]
          .split("\n")
          .filter(Boolean)
          .map((p) => {
            const parts = p.replace("- ", "").split(':');
            return {
              name: parts[0]?.trim() || '',
              tech: parts[1] ? parts[1].split(',').map(t => t.trim()) : [],
              description: parts[2]?.trim() || ''
            };
          })
      : [];

    // Update user profile with parsed data
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        education,
        experience,
        skills,
        projects
      },
      { new: true }
    ).select("-password");

    mixpanel.track("Resume Uploaded", {
      distinct_id: req.user.id,
      skills_count: skills.length,
      projects_count: projects.length,
    });

    res.json({ 
      msg: "Resume parsed and profile updated successfully", 
      user 
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Pitch Management
exports.createPitch = async (req, res) => {
  const { content, videoUrl } = req.body;

  try {
    const pitch = new Pitch({
      user: req.user.id,
      content,
      videoUrl
    });

    await pitch.save();

    mixpanel.track("Pitch Created", {
      distinct_id: req.user.id,
    });

    res.status(201).json({ 
      msg: "Elevator pitch created successfully", 
      pitch 
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updatePitch = async (req, res) => {
  const { content, videoUrl } = req.body;

  try {
    let pitch = await Pitch.findOne({ user: req.user.id });

    if (pitch) {
      // Update existing pitch
      pitch = await Pitch.findOneAndUpdate(
        { user: req.user.id },
        { 
          content, 
          videoUrl,
          updatedAt: Date.now() 
        },
        { new: true }
      );
    } else {
      // Create new pitch
      pitch = new Pitch({
        user: req.user.id,
        content,
        videoUrl
      });

      await pitch.save();
    }

    mixpanel.track("Pitch Updated", {
      distinct_id: req.user.id,
    });

    res.json({ 
      msg: "Elevator pitch updated successfully", 
      pitch 
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getPitch = async (req, res) => {
  try {
    const pitch = await Pitch.findOne({ user: req.user.id });
    
    if (!pitch) {
      return res.status(404).json({ msg: "Elevator pitch not found" });
    }
    
    res.json(pitch);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Avatar Management
exports.createAvatar = async (req, res) => {
  const { settings, imageUrl } = req.body;

  try {
    let avatar = await Avatar.findOne({ 
      user: req.user.id,
      userModel: 'User'
    });

    if (avatar) {
      // Update existing avatar
      avatar = await Avatar.findOneAndUpdate(
        { 
          user: req.user.id,
          userModel: 'User'
        },
        { 
          settings, 
          imageUrl,
          updatedAt: Date.now() 
        },
        { new: true }
      );
    } else {
      // Create new avatar
      avatar = new Avatar({
        user: req.user.id,
        userModel: 'User',
        settings,
        imageUrl
      });

      await avatar.save();
    }

    mixpanel.track("Avatar Created", {
      distinct_id: req.user.id,
    });

    res.status(201).json({ 
      msg: "Avatar created/updated successfully", 
      avatar 
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getAvatar = async (req, res) => {
  try {
    const avatar = await Avatar.findOne({ 
      user: req.user.id,
      userModel: 'User'
    });
    
    if (!avatar) {
      return res.status(404).json({ msg: "Avatar not found" });
    }
    
    res.json(avatar);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Job Application
exports.applyForJob = async (req, res) => {
  const { jobId, cv } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    
    // Check if already applied
    const alreadyApplied = job.applicants.some(
      applicant => applicant.user.toString() === req.user.id
    );
    
    if (alreadyApplied) {
      return res.status(400).json({ msg: "You have already applied for this job" });
    }
    
    // Add user to applicants
    job.applicants.push({
      user: req.user.id,
      cv,
      status: 'Applied',
      appliedAt: Date.now()
    });
    
    await job.save();
    
    mixpanel.track("Job Application Submitted", {
      distinct_id: req.user.id,
      job_id: jobId,
      job_title: job.title,
      company: job.company
    });
    
    res.json({ msg: "Job application submitted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const jobs = await Job.find({
      'applicants.user': req.user.id
    }).select('title company location type salary status postedDate applicants');
    
    // Filter applicant data to only include the current user's application
    const applications = jobs.map(job => {
      const myApplication = job.applicants.find(
        app => app.user.toString() === req.user.id
      );
      
      return {
        job: {
          id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          salary: job.salary,
          status: job.status,
          postedDate: job.postedDate
        },
        status: myApplication.status,
        appliedAt: myApplication.appliedAt
      };
    });
    
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Get pitch views
    const pitch = await Pitch.findOne({ user: req.user.id });
    const pitchViews = pitch ? pitch.views : 0;
    const pitchLikes = pitch ? pitch.likes : 0;
    
    res.json({
      profileViews: user.profileViews || 0,
      profileClicks: user.profileClicks || 0,
      profileLikes: user.profileLikes || 0,
      profileBookmarks: user.profileBookmarks || 0,
      pitchViews,
      pitchLikes
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.incrementAnalytics = async (req, res) => {
  const { type } = req.body;
  const userId = req.params.id;
  
  try {
    const validTypes = ['profileView', 'profileClick', 'profileLike', 'profileBookmark', 'pitchView', 'pitchLike'];
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({ msg: "Invalid analytics type" });
    }
    
    if (type.startsWith('pitch')) {
      // Update pitch analytics
      const pitch = await Pitch.findOne({ user: userId });
      if (!pitch) return res.status(404).json({ msg: "Pitch not found" });
      
      if (type === 'pitchView') {
        pitch.views += 1;
      } else if (type === 'pitchLike') {
        pitch.likes += 1;
      }
      
      await pitch.save();
    } else {
      // Update user profile analytics
      const updateField = {};
      if (type === 'profileView') updateField.profileViews = 1;
      if (type === 'profileClick') updateField.profileClicks = 1;
      if (type === 'profileLike') updateField.profileLikes = 1;
      if (type === 'profileBookmark') updateField.profileBookmarks = 1;
      
      await User.findByIdAndUpdate(userId, { $inc: updateField });
    }
    
    mixpanel.track(type, {
      distinct_id: req.user ? req.user.id : 'anonymous',
      target_user_id: userId
    });
    
    res.json({ msg: "Analytics updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Public Profile
exports.getPublicProfile = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findById(userId).select(
      "-password -email -phone"
    );
    
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    // Increment profile view
    user.profileViews += 1;
    await user.save();
    
    mixpanel.track("Profile Viewed", {
      distinct_id: req.user ? req.user.id : 'anonymous',
      target_user_id: userId
    });
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getPublicPitch = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const pitch = await Pitch.findOne({ user: userId });
    
    if (!pitch) return res.status(404).json({ msg: "Pitch not found" });
    
    // Increment pitch view
    pitch.views += 1;
    await pitch.save();
    
    mixpanel.track("Pitch Viewed", {
      distinct_id: req.user ? req.user.id : 'anonymous',
      target_user_id: userId
    });
    
    res.json(pitch);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    // Increment profile views
    user.profileViews += 1;
    await user.save();
    
    // Track profile view in Mixpanel
    if (req.user.role === 'recruiter') {
      mixpanel.track("Profile Viewed", {
        distinct_id: req.user.id,
        user_id: user._id,
        viewer_role: req.user.role
      });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
