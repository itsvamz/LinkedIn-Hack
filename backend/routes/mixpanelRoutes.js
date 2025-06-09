const express = require("express");
const router = express.Router();
const mixpanelSecret = process.env.MIXPANEL_SECRET;

// Utility: Last 7 Days
function getLast7Days() {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - 7);

  const formatDate = (date) => date.toISOString().slice(0, 10);
  return {
    from_date: formatDate(fromDate),
    to_date: formatDate(toDate),
  };
}

// Utility: Last 30 Days
function getLast30Days() {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - 30);

  const formatDate = (date) => date.toISOString().slice(0, 10);
  return {
    from_date: formatDate(fromDate),
    to_date: formatDate(toDate),
  };
}

router.get("/events/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const fetch = (await import("node-fetch")).default;
    const { from_date, to_date } = getLast30Days(); // safer to check 30 days

    const url = `https://data.mixpanel.com/api/2.0/export/?from_date=${from_date}&to_date=${to_date}&format=json`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(mixpanelSecret + ":").toString(
          "base64"
        )}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: `Mixpanel API error: ${errorText}` });
    }

    const text = await response.text();
    if (!text.trim()) return res.json([]);

    const lines = text.trim().split("\n");
    const events = lines.map((line) => JSON.parse(line));

    // 🔍 Filter by userId
    const filteredEvents = events.filter(
      (event) => event.properties?.distinct_id === userId
    );

    res.json(filteredEvents);
  } catch (error) {
    console.error("Mixpanel API error:", error);
    res.status(500).json({ error: "Failed to fetch user events" });
  }
});

// ✅ GET all events (last 30 days)
router.get("/events", async (req, res) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const { from_date, to_date } = getLast30Days();

    const url = `https://data.mixpanel.com/api/2.0/export/?from_date=${from_date}&to_date=${to_date}&format=json`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(mixpanelSecret + ":").toString(
          "base64"
        )}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mixpanel API error:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const text = await response.text();
    if (!text.trim()) return res.json([]);

    const events = text
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
    res.json(events);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

module.exports = router;
