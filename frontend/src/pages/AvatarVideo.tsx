import React, { useState } from "react";
import axios from "axios";

function AvatarVideo() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [gender, setGender] = useState("male");
  const [nat, setNat] = useState("en");
  const [loading, setLoading] = useState(false);
  const [videoPath, setVideoPath] = useState("");

  const handleGenerate = async () => {
    if (!imageFile || !text || !gender || !nat) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("text", text);
    formData.append("gender", gender);
    formData.append("nat", nat);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/avatar/generate",
        formData
      );
      console.log("Success:", response.data);
      setVideoPath(response.data.videoPath);
    } catch (error: any) {
      console.error("Error generating avatar:", error);
      if (error.response) {
        console.error("Backend response:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Talking Avatar</h2>

      <div>
        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageFile(e.target.files[0]);
            }
          }}
        />
      </div>

      <div>
        <label>Enter Text:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <label>Select Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label>Nationality Code (nat):</label>
        <input
          type="text"
          value={nat}
          onChange={(e) => setNat(e.target.value)}
        />
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Avatar"}
      </button>

      {videoPath && (
        <div>
          <h3>Generated Video:</h3>
          <video controls width="480">
            <source
              src={http://localhost:5000/${videoPath}}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default AvatarVideo;