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
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleResumeUpload = () => resumeFileRef.current?.click();
  const handleAvatarUpload = () => avatarFileRef.current?.click();

  // Update the handleResumeFileChange function
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Show loading state
    setSaveMessage({ type: "info", text: "Uploading and parsing resume..." });
    
    const formData = new FormData();
    formData.append("file", file);
    // Remove this line as it's not needed - the user ID is already in the auth token
    // formData.append("userId", userData?._id || "");
    
    // Upload and parse the resume
    axios.post("http://localhost:5000/api/parse-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      console.log("Resume parsed:", response.data);
      
      // Update user data with parsed information
      setUserData(prev => ({
        ...prev,
        ...response.data.profileData,
        education: response.data.education,
        experience: response.data.experience,
        skills: response.data.skills.join(", ") // Convert array to comma-separated string
      }));
      
      // Update pitch text
      setPitchText(response.data.pitch);
      
      setSaveMessage({ 
        type: "success", 
        text: "Resume parsed and profile updated successfully!" 
      });
      
      // Switch to pitch section to show the generated pitch
      setActiveSection("pitch");
    })
    .catch(error => {
      console.error("Error parsing resume:", error);
      
      // Extract the most useful error message
      let errorMessage = "Failed to parse resume. Please try again.";
      
      if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
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
    setIsEditingPitch(false);
    console.log('Pitch saved:', pitchText);
  };

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    // Simulate video generation process
    setTimeout(() => {
      setIsGeneratingVideo(false);
      setHasGeneratedVideo(true);
    }, 3000);
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
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-75" />
                <p className="text-lg font-medium">Your Pitch Video</p>
                <p className="text-sm opacity-75">AI Generated • 1 minute</p>
              </div>
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
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Recruiter Name</h4>
                    <span className="text-sm text-gray-500">2h ago</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Hi! I viewed your profile and would like to connect...
                  </p>
                  <Button size="sm" variant="outline">
                    Reply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="sent" className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">To: Recruiter Name</h4>
                    <span className="text-sm text-gray-500">1d ago</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Thank you for reaching out. I'm interested...
                  </p>
                  <Button size="sm" variant="outline">
                    View Thread
                  </Button>
                </CardContent>
              </Card>
            ))}
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