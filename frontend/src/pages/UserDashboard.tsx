// UserDashboard.tsx
import ProfileAnalytics from "@/components/ProfileAnalytics";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Star,
  TrendingUp,
  Upload,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSidebar from "@/components/UserSidebar";
import VoiceRecorder from "@/components/VoiceRecorder";
import { Edit, Video, Play } from 'lucide-react';

interface UserData {
  _id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  portfolio?: string;
  skills?: string;
  availability?: string;
  avatar?: string;
  education?: any;
  experience?: any;
}

interface SaveMessage {
  type: string;
  text: string;
}

const UserDashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({});
  const [activeSection, setActiveSection] = useState("profile");
  const [saveMessage, setSaveMessage] = useState<SaveMessage>({ type: "", text: "" });
  const [pitchText, setPitchText] = useState("Welcome to my profile! I'm a passionate professional with expertise in various technologies and a strong commitment to delivering exceptional results. With my diverse skill set and experience, I'm ready to contribute to your team's success and take on new challenges that drive innovation and growth.");
  const [isEditingPitch, setIsEditingPitch] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [hasGeneratedVideo, setHasGeneratedVideo] = useState(false);
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched user data:", res.data);
        setUserData(res.data);
        
        // Fetch the user's pitch
        const pitchRes = await axios.get("http://localhost:5000/api/user/pitch", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (pitchRes.data) {
          setPitchText(pitchRes.data.content);
          if (pitchRes.data.videoUrl) {
            setHasGeneratedVideo(true);
            // Update userData with the video URL from the pitch
            setUserData(prevData => ({
              ...prevData,
              videoUrl: pitchRes.data.videoUrl
            }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUser();
  }, []);

  const handleResumeUpload = () => resumeFileRef.current?.click();
  const handleAvatarUpload = () => avatarFileRef.current?.click();

  // Update the handleResumeFileChange function with proper error handling
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  // Show loading state
  setSaveMessage({ type: "info", text: "Uploading and parsing resume..." });
  
  const formData = new FormData();
  formData.append("file", file);
  
  // Upload and parse the resume
  axios.post("http://localhost:5000/api/parse-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  // Inside handleResumeFileChange function
  .then(response => {
    console.log("Resume parsed:", response.data);
    
    // Extract profile data from the response
    const profileData = response.data.data?.attributes?.result || {};
    const parsedData = response.data.data || {};
    
    // Extract skills and format as string
    const skillsData = response.data.skills || profileData.skills || [];
    const skillsString = Array.isArray(skillsData) 
      ? skillsData.join(", ") 
      : typeof skillsData === 'string' 
        ? skillsData 
        : "";
    
    // Extract professional profiles from text content
    const extractProfileUrl = (text, platform) => {
      if (!text) return "";
      const regex = {
        linkedin: /linkedin\.com\/in\/([\w-]+)/i,
        github: /github\.com\/([\w-]+)/i,
        leetcode: /leetcode\.com\/([\w-]+)/i,
        portfolio: /(https?:\/\/[\w.-]+\.[\w.-]+\/?[\w\/-]*)/i
      };
      
      const match = text.match(regex[platform]);
      return match ? match[0] : "";
    };
    
    // Get text content if available
    const textContent = parsedData.text_content || "";
    
    // Create updated user data object
    const updatedUserData = {
      fullName: profileData.candidate_name || response.data.profileData?.name || "",
      email: profileData.candidate_email || response.data.profileData?.email || "",
      phone: profileData.candidate_phone || response.data.profileData?.phone || "",
      location: profileData.candidate_location || response.data.profileData?.location || "",
      linkedin: profileData.linkedin || extractProfileUrl(textContent, "linkedin") || "",
      github: profileData.github || extractProfileUrl(textContent, "github") || "",
      leetcode: profileData.leetcode || extractProfileUrl(textContent, "leetcode") || "",
      portfolio: profileData.portfolio || extractProfileUrl(textContent, "portfolio") || "",
      education: response.data.education || profileData.education_qualifications || [],
      experience: response.data.experience || profileData.positions || [],
      skills: skillsString || ""
    };
    
    // Update user data state
    setUserData(prev => {
      // Create merged data that preserves existing data when parsed data is empty
      const mergedData = {
        ...prev,
        fullName: profileData.candidate_name || response.data.profileData?.name || prev.fullName || "",
        email: profileData.candidate_email || response.data.profileData?.email || prev.email || "",
        phone: profileData.candidate_phone || response.data.profileData?.phone || prev.phone || "",
        location: profileData.candidate_location || response.data.profileData?.location || prev.location || "",
        linkedin: profileData.linkedin || extractProfileUrl(textContent, "linkedin") || prev.linkedin || "",
        github: profileData.github || extractProfileUrl(textContent, "github") || prev.github || "",
        leetcode: profileData.leetcode || extractProfileUrl(textContent, "leetcode") || prev.leetcode || "",
        portfolio: profileData.portfolio || extractProfileUrl(textContent, "portfolio") || prev.portfolio || "",
        education: response.data.education || profileData.education_qualifications || prev.education || [],
        experience: response.data.experience || profileData.positions || prev.experience || [],
        skills: skillsString || prev.skills || ""
      };
      
      return mergedData;
    });
    
    // Automatically save the updated profile to the database
    const token = localStorage.getItem("token");
    
    // Get current user data first to merge with parsed data
    axios.get("http://localhost:5000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(currentProfileResponse => {
      const currentData = currentProfileResponse.data;
      
      // Create merged data that preserves existing data when parsed data is empty
      const mergedData = {
        fullName: profileData.candidate_name || response.data.profileData?.name || currentData.fullName || "",
        email: profileData.candidate_email || response.data.profileData?.email || currentData.email || "",
        phone: profileData.candidate_phone || response.data.profileData?.phone || currentData.phone || "",
        location: profileData.candidate_location || response.data.profileData?.location || currentData.location || "",
        linkedin: profileData.linkedin || extractProfileUrl(textContent, "linkedin") || currentData.linkedin || "",
        github: profileData.github || extractProfileUrl(textContent, "github") || currentData.github || "",
        leetcode: profileData.leetcode || extractProfileUrl(textContent, "leetcode") || currentData.leetcode || "",
        portfolio: profileData.portfolio || extractProfileUrl(textContent, "portfolio") || currentData.portfolio || "",
        education: response.data.education || profileData.education_qualifications || currentData.education || [],
        experience: response.data.experience || profileData.positions || currentData.experience || [],
        skills: skillsString || currentData.skills || ""
      };
      
      // Update the database with merged data
      return axios.put(
        "http://localhost:5000/api/user/profile",
        mergedData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    })
    .then(profileResponse => {
      console.log("Profile automatically updated:", profileResponse.data);
    })
    .catch(profileError => {
      console.error("Error auto-updating profile:", profileError);
    });
    
    // Generate a pitch based on the parsed resume data
    if (response.data.data && response.data.data.pitch) {
      // If the Python service already generated a pitch, use it
      setPitchText(response.data.data.pitch);
    } else if (response.data.pitch) {
      // If pitch is directly in the response
      setPitchText(response.data.pitch);
    } else {
      // Otherwise, call the pitch generation endpoint
      axios.post("http://localhost:8000/generate-pitch", {
        data: response.data.data || response.data
      })
      // Inside handleResumeFileChange function, after pitch generation
      .then(pitchResponse => {
        if (pitchResponse.data && pitchResponse.data.pitch) {
          const generatedPitch = pitchResponse.data.pitch;
          setPitchText(generatedPitch);
          
          // Automatically save the pitch to the database
          const token = localStorage.getItem("token");
          axios.post("http://localhost:5000/api/user/pitch", 
            { content: generatedPitch },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(saveResponse => {
            console.log("Pitch automatically saved:", saveResponse.data);
          })
          .catch(saveError => {
            console.error("Error auto-saving pitch:", saveError);
          });
        }
      })
      .catch(pitchError => {
        console.error("Error generating pitch:", pitchError);
        // Keep the current pitch text if generation fails
      });
    }
    
    setSaveMessage({ 
      type: "success", 
      text: "Resume parsed and profile updated successfully!" 
    });
    
    // Switch to profile section to show the updated profile
    setActiveSection("profile");
  })
  .catch(error => {
    console.error("Error parsing resume:", error);
    
    // Extract the most useful error message
    let errorMessage = "Failed to parse resume. Please try again.";
    
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setSaveMessage({ 
      type: "error", 
      text: errorMessage
    });
  });
};

  // Update the handleAvatarFileChange function
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Show loading state
    setSaveMessage({ type: "info", text: "Uploading avatar..." });
    
    const formData = new FormData();
    formData.append("avatar", file);
    
    // Upload the avatar
    axios.post("http://localhost:5000/api/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      console.log("Avatar uploaded:", response.data);
      
      // Update user data with new avatar URL
      setUserData(prev => ({
        ...prev,
        avatar: response.data.avatarUrl
      }));
      
      setSaveMessage({ 
        type: "success", 
        text: "Avatar updated successfully!" 
      });
    })
    .catch(error => {
      console.error("Error uploading avatar:", error);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to upload avatar. Please try again." 
      });
    });
  };

  // Add a function to handle the "Generate New Avatar" button click
  const handleGenerateAvatar = () => {
    if (avatarFileRef.current?.files?.length) {
      handleAvatarFileChange({ target: { files: avatarFileRef.current.files } } as React.ChangeEvent<HTMLInputElement>);
    } else {
      setSaveMessage({ 
        type: "error", 
        text: "Please select an image first." 
      });
    }
  };

  const handleSavePitch = () => {
    // Save the pitch to the backend
    const token = localStorage.getItem("token");
    
    axios.post("http://localhost:5000/api/user/pitch", 
      { pitch: pitchText },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      setIsEditingPitch(false);
      setSaveMessage({ 
        type: "success", 
        text: "Pitch saved successfully!" 
      });
    })
    .catch(error => {
      console.error("Error saving pitch:", error);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to save pitch. Please try again." 
      });
    });
  };

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    const token = localStorage.getItem("token");
    
    // Call the backend to generate a video from the pitch text
    axios.post("http://localhost:5000/api/generate-video", 
      { pitch: pitchText },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      setIsGeneratingVideo(false);
      setHasGeneratedVideo(true);
      
      // Save the video URL to the pitch
      return axios.put("http://localhost:5000/api/user/pitch", 
        { 
          pitch: pitchText,
          videoUrl: response.data.videoUrl 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    })
    .then(response => {
      setSaveMessage({ 
        type: "success", 
        text: "Video generated and saved successfully!" 
      });
    })
    .catch(error => {
      console.error("Error generating video:", error);
      setIsGeneratingVideo(false);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to generate video. Please try again." 
      });
    });
  };

  const saveProfile = async () => {
    try {
      setSaveMessage({ type: "", text: "" }); // Clear previous messages
      const token = localStorage.getItem("token");
      
      const response = await axios.put(
        "http://localhost:5000/api/user/profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSaveMessage({ 
        type: "success", 
        text: "Profile updated successfully!" 
      });
      
      // Update localStorage with new name if it changed
      if (userData?.fullName) {
        localStorage.setItem("userName", userData.fullName);
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to update profile. Please try again." 
      });
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card className="border-gray-200 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-blue-800">Professional Profile</CardTitle>
          <CardDescription className="text-blue-600">
            Complete your profile to attract top recruiters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Welcome Message */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              Welcome, {userData?.fullName || "User"}
            </h3>
          </div>
          
          {/* Resume Upload */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Resume Upload
            </Label>
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
              <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <p className="text-sm text-gray-700 mb-3 font-medium">
                Upload your resume to auto-fill profile
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeUpload}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Upload Resume
              </Button>
              <p className="text-xs text-gray-500 mt-3">PDF, DOC up to 5MB</p>
            </div>
            <input
              ref={resumeFileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeFileChange}
              className="hidden"
            />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-gray-700">Full Name</Label>
              <Input 
                className="mt-2 border-gray-300 focus:border-blue-500" 
                value={userData?.fullName || ""}
                onChange={(e) => setUserData({...userData, fullName: e.target.value})}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
              <Input 
                className="mt-2 border-gray-300 focus:border-blue-500" 
                value={userData?.phone || ""}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Email</Label>
              <Input 
                className="mt-2 border-gray-300 focus:border-blue-500" 
                value={userData?.email || ""}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Location</Label>
              <Input 
                className="mt-2 border-gray-300 focus:border-blue-500" 
                value={userData?.location || ""}
                onChange={(e) => setUserData({...userData, location: e.target.value})}
              />
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">
              Professional Profiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-semibold text-gray-700">LinkedIn</Label>
                <Input 
                  className="mt-2 border-gray-300 focus:border-blue-500" 
                  value={userData?.linkedin || ""}
                  onChange={(e) => setUserData({...userData, linkedin: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">GitHub</Label>
                <Input 
                  className="mt-2 border-gray-300 focus:border-blue-500" 
                  value={userData?.github || ""}
                  onChange={(e) => setUserData({...userData, github: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">LeetCode</Label>
                <Input 
                  className="mt-2 border-gray-300 focus:border-blue-500" 
                  value={userData?.leetcode || ""}
                  onChange={(e) => setUserData({...userData, leetcode: e.target.value})}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Portfolio</Label>
                <Input 
                  className="mt-2 border-gray-300 focus:border-blue-500" 
                  value={userData?.portfolio || ""}
                  onChange={(e) => setUserData({...userData, portfolio: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Skills</Label>
            <Textarea 
              className="mt-2 border-gray-300 focus:border-blue-500" 
              value={userData?.skills || ""}
              onChange={(e) => setUserData({...userData, skills: e.target.value})}
            />
          </div>

          {/* Availability */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Availability</Label>
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 focus:border-blue-500"
              value={userData?.availability || ""}
              onChange={(e) => setUserData({...userData, availability: e.target.value})}
            >
              <option value="">Select availability</option>
              <option value="Available immediately">Available immediately</option>
              <option value="Available in 2 weeks">Available in 2 weeks</option>
              <option value="Available in 1 month">Available in 1 month</option>
              <option value="Not actively looking">Not actively looking</option>
            </select>
          </div>

          {/* Save Profile Button */}
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 hover:from-blue-700 hover:to-indigo-700"
            onClick={saveProfile}
          >
            Save Profile
          </Button>
          
          {/* Display save message if present */}
          {saveMessage.text && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              saveMessage.type === "success" 
                ? "bg-green-50 text-green-600 border border-green-200" 
                : saveMessage.type === "info"
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {saveMessage.text}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAvatarSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Avatar Creation</CardTitle>
        <CardDescription className="text-blue-600">
          Create and manage your professional avatar
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            {userData?.avatar ? (
              <img src={userData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <Briefcase className="w-20 h-20 text-blue-600" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800">Current Avatar</h3>
          <p className="text-gray-600 mb-4">
            Upload a clear photo to generate your avatar
          </p>
        </div>
        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
          <p className="text-sm text-gray-700 mb-3 font-medium">
            Upload a new photo
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAvatarUpload}
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            Choose Photo
          </Button>
          <p className="text-xs text-gray-500 mt-3">JPG, PNG up to 2MB</p>
        </div>
        <input
          ref={avatarFileRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleAvatarFileChange}
          className="hidden"
        />
        
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 hover:from-blue-700 hover:to-indigo-700"
          onClick={handleGenerateAvatar}
        >
          Generate New Avatar
        </Button>
      </CardContent>
    </Card>
  );

  const renderPitchSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Elevator Pitch</CardTitle>
        <CardDescription className="text-blue-600">Create and manage your professional pitch</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Pitch Text Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Your Pitch</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingPitch(!isEditingPitch)}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4 mr-1" />
              {isEditingPitch ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          
          {isEditingPitch ? (
            <div className="space-y-4">
              <Textarea
                value={pitchText}
                onChange={(e) => setPitchText(e.target.value)}
                className="min-h-[120px] border-blue-300 focus:border-blue-500"
                placeholder="Write your elevator pitch here..."
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSavePitch}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditingPitch(false);
                    // Reset to original text if needed
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 leading-relaxed">{pitchText}</p>
            </div>
          )}
        </div>

        {/* Generate Video Button */}
        <div className="space-y-4">
          <Button
            onClick={handleGenerateVideo}
            disabled={isGeneratingVideo || isEditingPitch}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3"
          >
            <Video className="w-5 h-5 mr-2" />
            {isGeneratingVideo ? 'Generating Video...' : 'Generate Pitch Video'}
          </Button>
          
          {isGeneratingVideo && (
            <div className="space-y-2">
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-purple-600 text-center">Creating your personalized video...</p>
            </div>
          )}
        </div>

        {/* Generated Video Display */}
        {hasGeneratedVideo && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Generated Pitch Video</h4>
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              {(userData as UserData & { videoUrl?: string })?.videoUrl ? (
                <iframe
                  src={userData?.videoUrl || ''}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-75" />
                  <p className="text-lg font-medium">Your Pitch Video</p>
                  <p className="text-sm opacity-75">AI Generated • 1 minute</p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                    <Play className="w-4 h-4" />
                  </Button>
                  <span className="text-white text-sm">0:00 / 1:00</span>
                </div>
                <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Download
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleGenerateVideo}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                Regenerate Video
              </Button>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Share Video
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderAnalyticsSection = () => <ProfileAnalytics user={userData} />;
  
  // Add these state variables at the top of your component

  
  // Add this useEffect to fetch messages when the component mounts
  useEffect(() => {
    if (activeSection === "messaging") {
      fetchMessages();
    }
  }, [activeSection]);
  
  // Add this function to fetch messages
  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/messages', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Process messages into sent and received
      const allMessages = response.data;
      const sent = [];
      const received = [];
      
      allMessages.forEach(msg => {
        const messageObj = {
          id: msg._id,
          sender: msg.senderModel === 'Recruiter' 
            ? (msg.sender?.fullName || 'Recruiter')
            : 'You',
          receiver: msg.receiverModel === 'Recruiter'
            ? (msg.receiver?.fullName || 'Recruiter') 
            : 'You',
          content: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleString(),
          status: msg.read ? 'read' : 'unread'
        };
        
        if (msg.senderModel === 'User') {
          sent.push(messageObj);
        } else {
          received.push(messageObj);
        }
      });
      
      setSentMessages(sent);
      setReceivedMessages(received);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };
  
  // Update the renderMessagingSection function
  const renderMessagingSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Messages</CardTitle>
        <CardDescription className="text-blue-600">
          Manage your conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
          <TabsContent value="received" className="space-y-4">
            {loadingMessages ? (
              <p className="text-center py-4">Loading messages...</p>
            ) : receivedMessages.length === 0 ? (
              <p className="text-center py-4">No messages received yet.</p>
            ) : (
              receivedMessages.map((message) => (
                <Card key={message.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">From: {message.sender}</h4>
                      <span className="text-sm text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{message.content}</p>
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          <TabsContent value="sent" className="space-y-4">
            {loadingMessages ? (
              <p className="text-center py-4">Loading messages...</p>
            ) : sentMessages.length === 0 ? (
              <p className="text-center py-4">No messages sent yet.</p>
            ) : (
              sentMessages.map((message) => (
                <Card key={message.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">To: {message.receiver}</h4>
                      <span className="text-sm text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{message.content}</p>
                    <Button size="sm" variant="outline">
                      View Thread
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  const renderSettingsSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Settings</CardTitle>
        <CardDescription className="text-blue-600">
          Manage your account preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-center text-gray-500">
        Settings panel is currently under development
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "avatar":
        return renderAvatarSection();
      case "pitch":
        return renderPitchSection();
      case "analytics":
        return renderAnalyticsSection();
      case "messaging":
        return renderMessagingSection();
      case "settings":
        return renderSettingsSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex">
        <UserSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          userData={userData} 
        />
        <main className="flex-1 p-6 ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;