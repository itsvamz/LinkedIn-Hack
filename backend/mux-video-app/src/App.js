import React, { useEffect, useState } from "react";
import MuxPlayerComponent from "./MuxPlayerComponent";

function App() {
  const [analytics, setAnalytics] = useState(null);

  // Replace with your actual Mux asset_id
  const assetId = "zKZgMSwYV020000gmZsouPhU6lPJnPtv6BQlB3iqs00XWVA";
  const playbackId = "lxtYH02IHjQWsqxK4tj1N3MwOE9S6D1k6S2wxGSyaumw";

  useEffect(() => {
    // Call backend to fetch analytics
    fetch(`http://localhost:5000/analytics/${assetId}`)
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <MuxPlayerComponent playbackId={playbackId} />

      <div style={{ maxWidth: "800px", margin: "20px auto", fontSize: "18px" }}>
        <h3>Analytics</h3>
        {analytics ? (
          <pre>{JSON.stringify(analytics, null, 2)}</pre>
        ) : (
          <p>Loading analytics...</p>
        )}
      </div>
    </div>
  );
}

export default App;
