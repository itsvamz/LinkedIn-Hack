require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

// Remove the first generic cors() middleware and place the configured one here
app.use(cors({
  origin: "http://localhost:8080", // Updated to match your frontend origin
  credentials: true, // allow cookies
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/recruiter", require("./routes/recruiterRoutes"));
app.use("/api/mixpanel", require("./routes/mixpanelRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));

const PORT = process.env.PORT || 5000;

// Remove this second CORS configuration
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
