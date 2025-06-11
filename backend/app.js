require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/recruiter", require("./routes/recruiterRoutes"));
app.use("/api/mixpanel", require("./routes/mixpanelRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes")); // Add this line

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // allow cookies
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
