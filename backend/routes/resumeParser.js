const express = require("express");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const FormData = require("form-data");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Helper function: Poll the status URL until the job is complete or fails
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
      return job.result; // ✅ Final parsed resume data
    } else if (job.status === "failed") {
      throw new Error("Resume parsing failed.");
    }

    attempts++;
  }

  throw new Error("Resume parsing timed out.");
};

// ✅ Route to handle resume upload and parsing
router.post("/parse-resume", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("language", req.body.language || "English");

    const submitRes = await axios.post(
      "https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "apy-token": process.env.APYHUB_API_KEY,
        },
      }
    );

    // ✅ Clean up the uploaded file
    fs.unlinkSync(filePath);

    const statusUrl = submitRes.data.status_url;

    // ⏳ Wait for parsing to finish
    const parsedData = await waitForResult(statusUrl);

    // ✅ Return parsed data
    res.status(200).json({
      message: "Resume parsed successfully!",
      parsedData,
    });
  } catch (error) {
    console.error(
      "❌ Error during parsing:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: error.response?.data || { message: "Something went wrong" },
    });
  }
});

module.exports = router;
