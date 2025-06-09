const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(cors());

const MUX_TOKEN_ID = process.env.MUX_TOKEN_ID;
const MUX_SECRET = process.env.MUX_SECRET;

app.get("/analytics/:assetId", async (req, res) => {
  const assetId = req.params.assetId;
  try {
    const response = await axios.get(
      `https://api.mux.com/data/v1/video-views?asset_id=${assetId}`,
      {
        auth: {
          username: MUX_TOKEN_ID,
          password: MUX_SECRET,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
