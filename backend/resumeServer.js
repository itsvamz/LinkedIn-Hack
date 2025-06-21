const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data'); // Fixed syntax error

const app = express();
// Update the CORS configuration to match your frontend URL
app.use(cors({
  origin: "http://localhost:8080", // Make sure this matches your frontend URL
  credentials: true
}));
const PORT = 5000;

// Set up multer for local file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static files from /uploads for public access
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the file content
    const fileContent = fs.readFileSync(req.file.path);
    
    // Create a form data object for the API request
    const formData = new FormData();
    formData.append('file', fileContent, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Use the file upload endpoint instead of URL endpoint
    const response = await axios.post('https://api.apilayer.com/resume_parser/upload', formData, {
      headers: {
        apikey: 'ES4RiFmezFQ30w6fFhaRNxY9GmPx9hLb',
        ...formData.getHeaders() // Important for multipart/form-data
      }
    });

    res.json({ parsed: response.data });
  } catch (err) {
    console.error('Error parsing resume:', err.response?.data || err.message);
    res.status(500).json({ error: 'Resume parsing failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});