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
  education?: any[];
  experience?: any[];
}

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [saveMessage, setSaveMessage] = useState({ type: "", text: "" });
  const [activeSection, setActiveSection] = useState<
    "profile" | "avatar" | "pitch" | "analytics" | "messaging" | "settings"
  >("profile");
  const [isEditingPitch, setIsEditingPitch] = useState(false);
  const [pitchText, setPitchText] = useState("");
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [hasGeneratedVideo, setHasGeneratedVideo] = useState(false);
  
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
        setPitchText(res.data.pitch || "");
      } catch (err) {
        console.error("Error fetching user data:", err);
        setSaveMessage({
          type: "error",
          text: "Failed to load user profile"
        });
      }
    };

    fetchUser();
  }, []);

  const handleResumeUpload = () => resumeFileRef.current?.click();
  const handleAvatarUpload = () => avatarFileRef.current?.click();

  const handleResumeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSaveMessage({ type: "info", text: "Uploading and parsing resume..." });
    
    const formData = new FormData();
    formData.append("file", file);
    if (userData?._id) {
      formData.append("userId", userData._id);
    }
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/parse-resume", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setUserData(prev => ({
        ...prev,
        ...response.data.profileData,
        education: response.data.education,
        experience: response.data.experience,
        skills: response.data.skills
      }));
      
      setPitchText(response.data.pitch);
      setActiveSection("pitch");
      setSaveMessage({ 
        type: "success", 
        text: "Resume parsed and profile updated successfully!" 
      });
    } catch (error) {
      console.error("Error parsing resume:", error);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to parse resume. Please try again." 
      });
    }
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSaveMessage({ type: "info", text: "Uploading avatar..." });
    
    const formData = new FormData();
    formData.append("avatar", file);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setUserData(prev => ({
        ...prev,
        avatar: response.data.avatarUrl
      }));
      
      setSaveMessage({ 
        type: "success", 
        text: "Avatar updated successfully!" 
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to upload avatar. Please try again." 
      });
    }
  };

  const handleGenerateAvatar = () => {
    if (avatarFileRef.current?.files?.length) {
      handleAvatarFileChange({ 
        target: { files: avatarFileRef.current.files } 
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      setSaveMessage({ 
        type: "error", 
        text: "Please select an image first." 
      });
    }
  };

  const handleSavePitch = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/pitch",
        { pitch: pitchText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      setIsEditingPitch(false);
      setSaveMessage({
        type: "success",
        text: "Pitch saved successfully!"
      });
    } catch (error) {
      console.error("Error saving pitch:", error);
      setSaveMessage({
        type: "error",
        text: "Failed to save pitch. Please try again."
      });
    }
  };

  const handleGenerateVideo = async () => {
    try {
      setIsGeneratingVideo(true);
      
      const response = await axios.post(
        "http://localhost:5000/api/generate-video",
        { pitch: pitchText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      setHasGeneratedVideo(true);
      setIsGeneratingVideo(false);
      setSaveMessage({
        type: "success",
        text: "Video generated successfully!"
      });
    } catch (error) {
      console.error("Error generating video:", error);
      setIsGeneratingVideo(false);
      setSaveMessage({
        type: "error",
        text: "Failed to generate video. Please try again."
      });
    }
  };

  const saveProfile = async () => {
    try {
      setSaveMessage({ type: "", text: "" });
      const token = localStorage.getItem("token");
      
      await axios.put(
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

  // Render functions remain the same as in your original code
  const renderProfileSection = () => (
    // Your existing renderProfileSection code
  );

  const renderAvatarSection = () => (
    // Your existing renderAvatarSection code
  );

  const renderPitchSection = () => (
    // Your existing renderPitchSection code
  );

  const renderAnalyticsSection = () => <ProfileAnalytics user={userData} />;

  const renderMessagingSection = () => (
    // Your existing renderMessagingSection code
  );

  const renderSettingsSection = () => (
    // Your existing renderSettingsSection code
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
          setActiveSection={setActiveSection} 
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