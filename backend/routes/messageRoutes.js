const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getConversations,
  getMessages,
  getAllMessages
} = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

// All routes require authentication
router.use(authMiddleware);

// Message routes
router.post("/", sendMessage);
router.get("/", getAllMessages); // Add this line
router.get("/conversations", getConversations);
router.get("/conversations/:conversationId", getMessages);

module.exports = router;