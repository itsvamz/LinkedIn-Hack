import { useState, useEffect } from 'react';
import axios from 'axios';

interface ProfileData {
  fullName: string;
  email: string;
  bio: string;
  skills: string[];
}

export default function UserProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
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
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.get<ProfileData>("http://localhost:5000/api/user/profile", {
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
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await axios.put<ProfileData>(
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
      console.error("Error updating profile:", error instanceof Error ? error.message : "Unknown error");
      alert("Failed to update profile");
    }
  };

  // Handle input changes
  const handleChange = (field: keyof ProfileData, value: string | string[]) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          saveProfile();
        }}>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={profileData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            />
          </div>
          
          {/* Add other fields as needed */}
          
          <button type="submit">Save Profile</button>
        </form>
      )}
    </>
  );
}
