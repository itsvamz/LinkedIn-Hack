const express = require("express");
const router = express.Router();
const mixpanel = require("../mixpanel");

// Track custom events
router.post("/track", (req, res) => {
  const { event, properties } = req.body;
  
  if (!event) {
    return res.status(400).json({ msg: "Event name is required" });
  }
  
  mixpanel.track(event, properties || {});
  res.json({ msg: "Event tracked successfully" });
});

module.exports = router;