const express = require("express");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const FormData = require("form-data");
const User = require("../models/User");
const Pitch = require("../models/Pitch");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const waitForResult = async (statusUrl, maxAttempts = 10, delay = 2000) => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, delay));

    const statusRes = await axios.get(statusUrl, {
      headers: { "apy-token": process.env.APYHUB_API_KEY },
    });

    const job = statusRes.data.job;

    if (!job) {
      throw new Error("Invalid job status response.");
    }

    if (job.status === "completed") {
      return job.result;
    } else if (job.status === "failed") {
      throw new Error("Resume parsing failed.");
    }

    attempts++;
  }

  throw new Error("Resume parsing timed out.");
};

const generatePitch = async (resumeData) => {
  try {
    const formattedData = {
      data: {
        attributes: {
          result: resumeData
        }
      }
    };

    const response = await axios.post(
      "http://localhost:8080/generate-pitch",
      formattedData
    );

    return response.data.pitch;
  } catch (error) {
    console.error("Error generating pitch:", error.message);
    throw new Error("Failed to generate elevator pitch");
  }
};

router.post("/parse-resume", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: { message: "No file uploaded" } });
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (req.file.mimetype && !allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ 
        error: { message: `Invalid file type: ${req.file.mimetype}. Please upload a PDF or Word document.` }
      });
    }

    const filePath = req.file.path;
    const userId = req.user.id;

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("language", req.body.language || "English");

    if (!process.env.APYHUB_API_KEY) {
      throw new Error("API key for resume parsing service is not configured");
    }

    console.log(`Sending request to ApyHub API with key: ${process.env.APYHUB_API_KEY.substring(0, 10)}...`);

    const submitRes = await axios.post(
      "https://api.apilayer.com/resume_parser/url?url=https%3A%2F%2Fassets.apilayer.com%2Fapis%2Fcodes%2Fresume_parser%2Fsample_resume.docx",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "apy-token": process.env.APYHUB_API_KEY,
        },
      }
    );

    if (!submitRes.data || !submitRes.data.status_url) {
      throw new Error("Invalid response from resume parsing service");
    }

    const statusUrl = submitRes.data.status_url;

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (unlinkError) {
      console.warn(`Warning: Could not delete temporary file ${filePath}:`, unlinkError.message);
    }

    const parsedData = await waitForResult(statusUrl);
    const pitchContent = await generatePitch(parsedData);

    const profileData = {
      fullName: parsedData.candidate_name || "",
      email: parsedData.candidate_email || "",
      phone: parsedData.candidate_phone || "",
      location: parsedData.candidate_location || "",
    };

    const education = parsedData.education_qualifications?.map(edu => ({
      institution: edu.school_name || "",
      degree: edu.degree_type || "",
      year: edu.end_date ? edu.end_date.split("-")[0] : "",
      gpa: edu.grade || ""
    })) || [];

    const experience = parsedData.positions?.map(exp => ({
      company: exp.company_name || "",
      position: exp.position_name || "",
      duration: `${exp.start_date || ""} - ${exp.end_date || "Present"}`,
      description: exp.job_details || ""
    })) || [];

    const skills = [];
    parsedData.positions?.forEach(pos => {
      if (pos.skills && Array.isArray(pos.skills)) {
        skills.push(...pos.skills);
      }
    });

    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            ...profileData,
            education,
            experience,
            skills: [...new Set(skills)]
          }
        },
        { new: true }
      );

      const existingPitch = await Pitch.findOne({ user: userId });

      if (existingPitch) {
        await Pitch.findOneAndUpdate(
          { user: userId },
          { 
            content: pitchContent,
            updatedAt: Date.now() 
          },
          { new: true }
        );
      } else {
        const newPitch = new Pitch({
          user: userId,
          content: pitchContent
        });
        await newPitch.save();
      }
    }

    res.status(200).json({
      message: "Resume parsed successfully!",
      parsedData,
      profileData,
      education,
      experience,
      skills,
      pitch: pitchContent
    });

  } catch (error) {
    console.error("❌ Error during parsing:", error.response?.data || error.message);

    if (req.file && req.file.path) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (unlinkError) {
        console.warn(`Warning: Could not delete temporary file ${req.file.path}:`, unlinkError.message);
      }
    }

    if (error.response && error.response.status) {
      if (error.response.headers['content-type']?.includes('text/html')) {
        return res.status(500).json({
          error: { 
            message: "Invalid response from resume parsing service. Please check your API key and try again.",
            details: { apiError: "Received HTML response instead of JSON" }
          }
        });
      }
    }

    const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    const errorDetails = error.response?.data || {};

    res.status(500).json({
      error: { message: errorMessage, details: errorDetails },
    });
  }
});

module.exports = router;
