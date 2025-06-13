// In your profile component
const [profileData, setProfileData] = useState({
  fullName: "",
  email: "",
  bio: "",
  skills: [],
  // Add other fields as needed
});

const [loading, setLoading] = useState(true);

// Fetch profile data
const fetchProfile = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    
    const response = await axios.get("http://localhost:5000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    setProfileData(response.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching profile:", error);
    setLoading(false);
  }
};

// Save profile data
const saveProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.put(
      "http://localhost:5000/api/user/profile",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    // Update the profile data with the response
    setProfileData(response.data);
    alert("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile");
  }
};

// Handle input changes
const handleChange = (field, value) => {
  setProfileData({
    ...profileData,
    [field]: value
  });
};

useEffect(() => {
  fetchProfile();
}, []);

// Then in your form
<form onSubmit={(e) => {
  e.preventDefault();
  saveProfile();
}}>
  <div>
    <label>Full Name</label>
    <input
      type="text"
      value={profileData.fullName || ""}
      onChange={(e) => handleChange("fullName", e.target.value)}
    />
  </div>
  
  <div>
    <label>Bio</label>
    <textarea
      value={profileData.bio || ""}
      onChange={(e) => handleChange("bio", e.target.value)}
    />
  </div>
  
  {/* Add other fields as needed */}
  
  <button type="submit">Save Profile</button>
</form>