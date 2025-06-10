import React from "react";
import MuxPlayer from "@mux/mux-player-react";
const MuxPlayerComponent = ({ playbackId }) => {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Candidate Pitch</h2>
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay={false}
        controls
        style={{ width: "100%", height: "auto", borderRadius: "12px" }}
      />
    </div>
  );
};

export default MuxPlayerComponent;
