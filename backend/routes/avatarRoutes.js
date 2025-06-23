const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// Setup Multer for uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatar_video_uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// POST route to process the avatar video
router.post("/generate", upload.single("image"), (req, res) => {
  console.log("✅ /api/avatar/generate called");

  const { text, gender, nat } = req.body;
  console.log("📥 Request Body:", { text, gender, nat });

  if (!req.file) {
    console.error("❌ No image file received");
    return res.status(400).json({ error: "Image file is required" });
  }

  const imagePath = path.resolve(req.file.path);
  const outputFolderName = output_${uuidv4()};
  const outputFolderPath = path.resolve(
    "avatar_video_output",
    outputFolderName
  );

  // Ensure the output folder exists
  fs.mkdirSync(outputFolderPath, { recursive: true });

  console.log("📸 Image path:", imagePath);
  console.log("📤 Output folder:", outputFolderPath);

  const pythonExecutable =
    "C:\\Users\\ruchi\\miniconda3\\envs\\avatar-pitch\\python.exe";

  console.log("🚀 Starting Python script...");

  const pythonProcess = spawn(pythonExecutable, [
    "C:\\Users\\ruchi\\OneDrive\\Documents\\LinkedIn-Hack\\Avatar\\MYCODE.py",
    text,
    imagePath,
    "--gender",
    gender,
    "--nat",
    nat,
    "--subs",
    "--output",
    outputFolderPath,
  ]);

  pythonProcess.stdout.on("data", (data) => {
    console.log([🐍 PYTHON STDOUT]: ${data});
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error([🐍 PYTHON STDERR]: ${data});
  });

  pythonProcess.on("close", (code) => {
    console.log(🛑 Python process exited with code ${code});
    if (code === 0) {
      console.log("✅ Video generation successful");

      const publicVideoPath = avatar_video_output/${outputFolderName}/video/final.mp4;

      res.status(200).json({
        message: "Video generated successfully!",
        videoPath: publicVideoPath,
      });
    } else {
      console.error("❌ Video generation failed");
      res.status(500).json({ error: "Failed to generate video." });
    }
  });
});

module.exports = router;