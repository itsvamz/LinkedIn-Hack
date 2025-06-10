import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Star, TrendingUp, Upload, Mail, Phone, MapPin, Briefcase, Eye, Video, MessageSquare, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  const resumeFileRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<HTMLInputElement>(null);

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

      if (userData.analytics) {
        setUserStats([
          { title: 'Profile Views', value: userData.analytics.profileViews.toString(), icon: Eye, trend: '+0%' },
          { title: 'Pitch Views', value: userData.analytics.pitchViews.toString(), icon: Video, trend: '+0%' },
          { title: 'Likes', value: userData.analytics.likes.toString(), icon: MessageSquare, trend: '+0%' },
          { title: 'Ranking', value: `#${userData.analytics.ranking || 0}`, icon: BarChart3, trend: '+0' },
        ]);
      }

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

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...profileData,
        skills: profileData.skills.split(',').map(skill => skill.trim())
      };
      await updateUserProfile(formattedData);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
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

      if (response.parsedData) {
        setResumeText(JSON.stringify(response.parsedData, null, 2));
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

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // You can implement avatar upload logic here
    toast({
      title: 'Avatar Upload',
      description: 'Avatar upload is not yet implemented',
    });
  };

  const renderAnalyticsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
                <h4 className="font-semibold text-gray-800">{stat.title}</h4>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">Trend: {stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMessagingSection = () => (
    <MessagingSection />
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
        return null; // Replace with your actual `renderProfileSection()` method
      case 'avatar':
        return null; // Replace with your actual `renderAvatarSection()` method
      case 'pitch':
        return null; // Replace with your actual `renderPitchSection()` method
      case 'analytics':
        return renderAnalyticsSection();
      case 'messaging':
        return renderMessagingSection();
      case 'settings':
        return renderSettingsSection();
      default:
        return null;
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {profileData.fullName || user?.fullName || 'User'}!
              </h1>
              <p className="text-gray-600">Manage your professional profile and career opportunities</p>
            </div>
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
