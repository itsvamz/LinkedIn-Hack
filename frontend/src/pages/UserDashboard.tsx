import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Video, FileText, BarChart3, Settings, Upload, Eye, Briefcase, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import UserSidebar from '@/components/UserSidebar';
import MessagingSection from '@/components/MessagingSection';
import { useToast } from '@/components/ui/use-toast';
import { getUserProfile, updateUserProfile, uploadResume, createPitch, updatePitch, createAvatar } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'pitch' | 'messaging' | 'analytics' | 'settings'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    linkedin: '',
    github: '',
    leetcode: '',
    portfolio: '',
    skills: '',
    availability: 'Available immediately'
  });
  const [pitchData, setPitchData] = useState({
    content: '',
    videoUrl: ''
  });
  const [resumeText, setResumeText] = useState('');
  const [userStats, setUserStats] = useState([
    { title: 'Profile Views', value: '0', icon: Eye, trend: '0%' },
    { title: 'Pitch Views', value: '0', icon: Video, trend: '0%' },
    { title: 'Likes', value: '0', icon: MessageSquare, trend: '0%' },
    { title: 'Ranking', value: '#0', icon: BarChart3, trend: '0' },
  ]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserProfile();
      
      setProfileData({
        fullName: userData.fullName || '',
        phone: userData.phone || '',
        email: userData.email || '',
        location: userData.location || '',
        linkedin: userData.linkedin || '',
        github: userData.github || '',
        leetcode: userData.leetcode || '',
        portfolio: userData.portfolio || '',
        skills: Array.isArray(userData.skills) ? userData.skills.join(', ') : userData.skills || '',
        availability: userData.availability || 'Available immediately'
      });

      // If user has analytics data, update the stats
      if (userData.analytics) {
        setUserStats([
          { title: 'Profile Views', value: userData.analytics.profileViews.toString(), icon: Eye, trend: '+0%' },
          { title: 'Pitch Views', value: userData.analytics.pitchViews.toString(), icon: Video, trend: '+0%' },
          { title: 'Likes', value: userData.analytics.likes.toString(), icon: MessageSquare, trend: '+0%' },
          { title: 'Ranking', value: `#${userData.analytics.ranking || 0}`, icon: BarChart3, trend: '+0' },
        ]);
      }

      // If user has pitch data, update the pitch state
      if (userData.pitch) {
        setPitchData({
          content: userData.pitch.content || '',
          videoUrl: userData.pitch.videoUrl || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPitchData(prev => ({
      ...prev,
      content: e.target.value
    }));
  };

  // Update the handleSaveProfile function
  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      
      // Convert comma-separated skills to array
      const formattedData = {
        ...profileData,
        skills: profileData.skills.split(',').map(skill => skill.trim())
      };
      
      await updateUserProfile(formattedData);
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      
      // Refresh the profile data
      await fetchUserProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await uploadResume(formData);
      
      // Update the resume text with the parsed data
      if (response.parsedData) {
        setResumeText(JSON.stringify(response.parsedData, null, 2));
        
        // Update profile with parsed data if available
        if (response.parsedData.skills) {
          setProfileData(prev => ({
            ...prev,
            skills: response.parsedData.skills.join(', ')
          }));
        }
      }
      
      toast({
        title: 'Success',
        description: 'Resume uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload resume',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePitch = async () => {
    try {
      setIsLoading(true);
      // Determine if we need to create or update the pitch
      if (pitchData.content) {
        await updatePitch(pitchData);
      } else {
        await createPitch({
          title: "My Professional Pitch",
          content: pitchData.content,
          mediaUrl: pitchData.videoUrl
        });
      }
      toast({
        title: 'Success',
        description: 'Pitch saved successfully',
      });
    } catch (error) {
      console.error('Error saving pitch:', error);
      toast({
        title: 'Error',
        description: 'Failed to save pitch',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAvatar = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('imageUrl', '/placeholder.svg');
      await createAvatar(formData);
      toast({
        title: 'Success',
        description: 'Avatar generated successfully',
      });
    } catch (error) {
      console.error('Error generating avatar:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate avatar',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Professional Profile</CardTitle>
          <CardDescription>Complete your profile to increase visibility to recruiters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resume Upload */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Resume Upload</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload your resume to auto-fill profile</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // In a real implementation, this would open a file picker
                  // For this example, we'll use a text area for resume content
                  const text = prompt('Enter resume text (format: Education:\n..., Experience:\n..., Skills:\n- skill1\n- skill2, Projects:\n- project1:tech1,tech2:description)');
                  if (text) {
                    setResumeText(text);
                    const formData = new FormData();
                    formData.append('resume', new Blob([text], { type: 'text/plain' }));
                    const mockEvent = {
                      target: { files: [new File([text], 'resume.txt')] },
                      nativeEvent: new Event('change'),
                      currentTarget: null,
                      bubbles: true,
                      cancelable: true,
                      defaultPrevented: false,
                      eventPhase: 0,
                      isTrusted: true,
                      preventDefault: () => {},
                      stopPropagation: () => {},
                      persist: () => {},
                      isDefaultPrevented: () => false,
                      isPropagationStopped: () => false,
                      timeStamp: Date.now(),
                      type: 'change'
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleResumeUpload(mockEvent);
                  }
                }}
                disabled={isLoading}
              >
                Upload Resume
              </Button>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC up to 5MB</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                placeholder="John Doe" 
                value={profileData.fullName}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                placeholder="+1 (555) 123-4567" 
                value={profileData.phone}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                value={profileData.email}
                onChange={handleProfileChange}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="San Francisco, CA" 
                value={profileData.location}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input 
                  id="linkedin" 
                  placeholder="linkedin.com/in/johndoe" 
                  value={profileData.linkedin}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input 
                  id="github" 
                  placeholder="github.com/johndoe" 
                  value={profileData.github}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="leetcode">LeetCode</Label>
                <Input 
                  id="leetcode" 
                  placeholder="leetcode.com/johndoe" 
                  value={profileData.leetcode}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input 
                  id="portfolio" 
                  placeholder="johndoe.dev" 
                  value={profileData.portfolio}
                  onChange={handleProfileChange}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Textarea 
              id="skills" 
              placeholder="React, Node.js, Python, Machine Learning..." 
              value={profileData.skills}
              onChange={handleProfileChange}
            />
          </div>

          {/* Availability */}
          <div>
            <Label htmlFor="availability">Availability</Label>
            <select 
              id="availability"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={profileData.availability}
              onChange={handleProfileChange}
            >
              <option>Available immediately</option>
              <option>Available in 2 weeks</option>
              <option>Available in 1 month</option>
              <option>Not actively looking</option>
            </select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSaveProfile}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAvatarSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Avatar Creation</CardTitle>
        <CardDescription>Create and manage your professional avatar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Avatar */}
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-16 h-16 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Current Avatar</h3>
            <p className="text-gray-600 mb-4">Upload a clear photo to generate your professional avatar</p>
          </div>

          {/* Upload New Photo */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload a new photo</p>
            <Button variant="outline" size="sm">Choose Photo</Button>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 2MB</p>
          </div>

          {/* Previous Avatars */}
          <div>
            <h4 className="font-medium mb-3">Previous Avatars</h4>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full"
            onClick={handleGenerateAvatar}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate New Avatar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPitchSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Elevator Pitch</CardTitle>
        <CardDescription>Create your compelling 1-minute professional pitch</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Pitch Generation */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Pitch Text</Label>
            <Textarea 
              className="min-h-32"
              placeholder="Write your elevator pitch here or click generate to auto-create from your profile..."
              value={pitchData.content}
              onChange={handlePitchChange}
            />
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // This would typically call an API to generate a pitch based on profile
                  setPitchData(prev => ({
                    ...prev,
                    content: `Hi, I'm ${profileData.fullName}. I'm a professional with skills in ${profileData.skills}. I'm currently ${profileData.availability.toLowerCase()}.`
                  }));
                }}
              >
                Generate from Profile
              </Button>
              <Button variant="outline" size="sm">Use Template</Button>
            </div>
          </div>

          {/* Video Preview */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Video Preview</Label>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Your pitch video will appear here</p>
                <Button className="mt-2" size="sm">Generate Video</Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={handleSavePitch}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Pitch'}
            </Button>
            <Button variant="outline">Preview</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalyticsSection = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.trend}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Performance</CardTitle>
          <CardDescription>Track your profile engagement over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Analytics chart will be displayed here
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'avatar':
        return renderAvatarSection();
      case 'pitch':
        return renderPitchSection();
      case 'messaging':
        return <MessagingSection />;
      case 'analytics':
        return renderAnalyticsSection();
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        );
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <UserSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 p-6 ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {profileData.fullName || user?.fullName || 'User'}!
              </h1>
              <p className="text-gray-600">Manage your professional profile and career opportunities</p>
            </div>

            {/* Content */}
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;