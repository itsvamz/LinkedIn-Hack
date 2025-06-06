const User = require("../models/User");
const mixpanel = require("../mixpanel");

exports.updatePitch = async (req, res) => {
  const { pitch } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { pitch },
    { new: true }
  );

  mixpanel.track("Pitch Updated", {
    distinct_id: req.user.id,
  });

  res.json({ msg: "Pitch updated", pitch: user.pitch });
};

exports.getAnalytics = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  res.json({
    views: user.analytics?.views || 0,
    clicks: user.analytics?.clicks || 0,
    likes: user.analytics?.likes || 0,
    bookmarks: user.analytics?.bookmarks || 0,
    pitchViews: user.analytics?.pitchViews || 0,
  });
};

exports.uploadResume = async (req, res) => {
  const { resumeText } = req.body;

  const educationMatch = resumeText.match(/Education:\n(.+?)(?:\n\S|$)/s);
  const experienceMatch = resumeText.match(/Experience:\n(.+?)(?:\n\S|$)/s);
  const skillsMatch = resumeText.match(/Skills:\n((?:- .+\n)+)/);
  const projectsMatch = resumeText.match(/Projects:\n((?:- .+\n)+)/);
  const certificationsMatch = resumeText.match(
    /Certifications:\n((?:- .+\n)+)/
  );

  const education = educationMatch ? educationMatch[1].trim() : "";
  const experience = experienceMatch ? experienceMatch[1].trim() : "";
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
        .map((s) => s.replace("- ", ""))
    : [];
  const certifications = certificationsMatch
    ? certificationsMatch[1]
        .split("\n")
        .filter(Boolean)
        .map((s) => s.replace("- ", ""))
    : [];

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile: {
        education,
        experience,
        skills,
        projects,
        certifications,
      },
    },
    { new: true }
  );

  mixpanel.track("Resume Uploaded", {
    distinct_id: req.user.id,
    skills_count: skills.length,
    projects_count: projects.length,
  });

  res.json({ msg: "Resume parsed and profile updated", profile: user.profile });
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { profile, avatar, pitch } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profile, avatar, pitch },
    { new: true }
  );

  mixpanel.track("Profile Updated", {
    distinct_id: req.user.id,
  });

  res.json(user);
};

exports.incrementAnalytics = async (req, res) => {
  const { type } = req.body;
  const validTypes = ["views", "clicks", "likes", "bookmarks", "pitchViews"];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ msg: "Invalid analytics type" });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!user.analytics) user.analytics = {};
  user.analytics[type] = (user.analytics[type] || 0) + 1;
  await user.save();

  mixpanel.track(`Analytics: ${type}`, {
    distinct_id: req.params.id,
    triggered_by: req.user?.id || "anonymous",
  });

  res.json({ msg: `${type} count incremented`, [type]: user.analytics[type] });
};

exports.getPublicProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "profile avatar pitch"
  );
  if (!user) return res.status(404).json({ msg: "User not found" });

  mixpanel.track("Profile Viewed", {
    distinct_id: req.params.id,
    viewed_by: req.user?.id || "anonymous",
  });

  res.json({
    profile: user.profile,
    avatar: user.avatar,
    pitch: user.pitch,
  });
};

exports.getPublicPitch = async (req, res) => {
  const user = await User.findById(req.params.id).select("pitch");
  if (!user) return res.status(404).json({ msg: "User not found" });

  mixpanel.track("Pitch Video Watched", {
    distinct_id: req.params.id,
    watched_by: req.user?.id || "anonymous",
  });

  res.json({ pitch: user.pitch });
};
