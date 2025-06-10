<<<<<<< HEAD
import React, { useState, useRef } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
import { motion } from 'framer-motion';
import { Users, Calendar, Star, TrendingUp, Upload, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserSidebar from '@/components/UserSidebar';
<<<<<<< HEAD
import VoiceRecorder from '@/components/VoiceRecorder';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'pitch' | 'analytics' | 'messaging' | 'settings'>('profile');
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<HTMLInputElement>(null);

  const handleResumeUpload = () => {
    resumeFileRef.current?.click();
  };

  const handleAvatarUpload = () => {
    avatarFileRef.current?.click();
  };

  const handleResumeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Resume uploaded:', file.name);
      // Handle file upload logic here
    }
  };

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Avatar image uploaded:', file.name);
      // Handle file upload logic here
=======
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
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card className="border-gray-200 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-blue-800">Professional Profile</CardTitle>
          <CardDescription className="text-blue-600">Complete your profile to attract top recruiters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Resume Upload */}
          <div>
<<<<<<< HEAD
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">Resume Upload</Label>
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
              <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <p className="text-sm text-gray-700 mb-3 font-medium">Upload your resume to auto-fill profile</p>
              <Button variant="outline" size="sm" onClick={handleResumeUpload} className="border-blue-300 text-blue-600 hover:bg-blue-50">
                Upload Resume
              </Button>
              <p className="text-xs text-gray-500 mt-3">PDF, DOC up to 5MB</p>
=======
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
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
            </div>
            <input
              ref={resumeFileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeFileChange}
              className="hidden"
            />
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
<<<<<<< HEAD
              <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" className="mt-2 border-gray-300 focus:border-blue-500" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" className="mt-2 border-gray-300 focus:border-blue-500" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
              <Input id="email" type="email" placeholder="john@email.com" className="mt-2 border-gray-300 focus:border-blue-500" />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Location</Label>
              <Input id="location" placeholder="San Francisco, CA" className="mt-2 border-gray-300 focus:border-blue-500" />
=======
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
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Professional Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
<<<<<<< HEAD
                <Label htmlFor="linkedin" className="text-sm font-semibold text-gray-700">LinkedIn</Label>
                <Input id="linkedin" placeholder="linkedin.com/in/johndoe" className="mt-2 border-gray-300 focus:border-blue-500" />
              </div>
              <div>
                <Label htmlFor="github" className="text-sm font-semibold text-gray-700">GitHub</Label>
                <Input id="github" placeholder="github.com/johndoe" className="mt-2 border-gray-300 focus:border-blue-500" />
              </div>
              <div>
                <Label htmlFor="leetcode" className="text-sm font-semibold text-gray-700">LeetCode</Label>
                <Input id="leetcode" placeholder="leetcode.com/johndoe" className="mt-2 border-gray-300 focus:border-blue-500" />
              </div>
              <div>
                <Label htmlFor="portfolio" className="text-sm font-semibold text-gray-700">Portfolio</Label>
                <Input id="portfolio" placeholder="johndoe.dev" className="mt-2 border-gray-300 focus:border-blue-500" />
=======
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
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
<<<<<<< HEAD
            <Label htmlFor="skills" className="text-sm font-semibold text-gray-700">Skills</Label>
            <Textarea id="skills" placeholder="JavaScript, React, Node.js, Python..." className="mt-2 border-gray-300 focus:border-blue-500" />
=======
            <Label htmlFor="skills">Skills</Label>
            <Textarea 
              id="skills" 
              placeholder="React, Node.js, Python, Machine Learning..." 
              value={profileData.skills}
              onChange={handleProfileChange}
            />
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
          </div>

          {/* Availability */}
          <div>
<<<<<<< HEAD
            <Label htmlFor="availability" className="text-sm font-semibold text-gray-700">Availability</Label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 focus:border-blue-500">
=======
            <Label htmlFor="availability">Availability</Label>
            <select 
              id="availability"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={profileData.availability}
              onChange={handleProfileChange}
            >
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
              <option>Available immediately</option>
              <option>Available in 2 weeks</option>
              <option>Available in 1 month</option>
              <option>Not actively looking</option>
            </select>
          </div>

<<<<<<< HEAD
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3">Save Profile</Button>
=======
          <Button 
            className="w-full" 
            onClick={handleSaveProfile}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </Button>
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
        </CardContent>
      </Card>
    </div>
  );

  const renderAvatarSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Avatar Creation</CardTitle>
        <CardDescription className="text-blue-600">Create and manage your professional avatar</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Current Avatar */}
          <div className="text-center">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Briefcase className="w-20 h-20 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Current Avatar</h3>
            <p className="text-gray-600 mb-4">Upload a clear photo to generate your professional avatar</p>
          </div>

          {/* Upload New Photo */}
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
            <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <p className="text-sm text-gray-700 mb-3 font-medium">Upload a new photo</p>
            <Button variant="outline" size="sm" onClick={handleAvatarUpload} className="border-blue-300 text-blue-600 hover:bg-blue-50">
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

          {/* Previous Avatars */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Previous Avatars</h4>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-all duration-300">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3">Generate New Avatar</Button>
=======
          <Button 
            className="w-full"
            onClick={handleGenerateAvatar}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate New Avatar'}
          </Button>
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
        </div>
      </CardContent>
    </Card>
  );

  const renderPitchSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Elevator Pitch</CardTitle>
        <CardDescription className="text-blue-600">Record your 1-minute elevator pitch</CardDescription>
      </CardHeader>
<<<<<<< HEAD
      <CardContent className="p-6">
        <VoiceRecorder />
=======
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
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
      </CardContent>
    </Card>
  );

  const renderAnalyticsSection = () => (
<<<<<<< HEAD
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Profile Analytics</CardTitle>
        <CardDescription className="text-blue-600">Track your profile performance</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-blue-200 shadow-md">
=======
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat) => (
          <Card key={stat.title}>
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3 text-gray-800">Profile Views</h4>
              <p className="text-3xl font-bold text-blue-600 mb-1">247</p>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card className="border border-green-200 shadow-md">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3 text-gray-800">Recruiter Interest</h4>
              <p className="text-3xl font-bold text-green-600 mb-1">18</p>
              <p className="text-sm text-gray-600">Profile saves</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );

  const renderMessagingSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Messages</CardTitle>
        <CardDescription className="text-blue-600">Manage your conversations</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Messages from Recruiters</TabsTrigger>
            <TabsTrigger value="sent">Messages Sent to Recruiters</TabsTrigger>
          </TabsList>
          <TabsContent value="received" className="space-y-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Sarah Johnson - TechCorp</h4>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-600 mb-2">Hi John, I came across your profile and was impressed by your React skills...</p>
                    <Button size="sm" variant="outline">Reply</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sent" className="space-y-4">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">To: Michael Chen - Elite Search</h4>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-gray-600 mb-2">Thank you for reaching out. I'm interested in learning more about the position...</p>
                    <Button size="sm" variant="outline">View Thread</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  const renderSettingsSection = () => (
    <Card className="border-gray-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-blue-800">Settings</CardTitle>
        <CardDescription className="text-blue-600">Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Settings panel is currently under development</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'avatar':
        return renderAvatarSection();
      case 'pitch':
        return renderPitchSection();
      case 'analytics':
        return renderAnalyticsSection();
      case 'messaging':
        return renderMessagingSection();
      case 'settings':
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
        />
        
        <main className="flex-1 p-6 ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
<<<<<<< HEAD
=======
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {profileData.fullName || user?.fullName || 'User'}!
              </h1>
              <p className="text-gray-600">Manage your professional profile and career opportunities</p>
            </div>

            {/* Content */}
>>>>>>> ca66d2d0bd4756b94397761ce54bd826d861ca77
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;