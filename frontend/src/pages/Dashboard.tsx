import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Video, BarChart3, Settings as SettingsIcon, Upload, Eye, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DashboardSidebar from '@/components/DashboardSidebar';
import VoiceRecorder from '@/components/VoiceRecorder';
import Settings from '@/components/Settings';
import axios from 'axios';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'pitch' | 'analytics' | 'settings'>('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          setLoading(false);
          return;
        }

        // Fetch user profile
        const userResponse = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('User data fetched:', userResponse.data);
        console.log('Pitch from DB:', userResponse.data.pitch);
        console.log('Video from DB:', userResponse.data.video);
        
        setUserData(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const stats = [
    { title: 'Profile Views', value: userData?.profileViews || '0', icon: Eye, trend: '+12%' },
    { title: 'Pitch Views', value: userData?.pitchViews || '0', icon: Video, trend: '+8%' },
    { title: 'Bookmarks', value: userData?.profileBookmarks || '0', icon: Award, trend: '+15%' },
    { title: 'Ranking', value: '#156', icon: TrendingUp, trend: '+5' },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Professional Profile</CardTitle>
          <CardDescription>Complete your profile to increase visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userData?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                {userData?.fullName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
              <input 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue={userData?.fullName || ""}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Title</label>
              <input 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue={userData?.experience?.[0]?.position || ""}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue={userData?.email || ""}
                type="email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
              <input 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue={userData?.location || ""}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Skills</label>
            <div className="flex flex-wrap gap-2">
              {userData?.skills?.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Resume</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Drag & drop your resume or click to browse</p>
              <Button variant="outline" size="sm">Upload Resume</Button>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">Save Profile</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAvatarSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Avatar Creation</CardTitle>
        <CardDescription>Create your professional avatar for video pitches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {userData?.avatar ? (
              <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {userData?.avatar ? 'Update Your Avatar' : 'Create Your Avatar'}
          </h3>
          <p className="text-gray-600 mb-4">Upload a photo to generate your professional avatar</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPitchSection = () => (
    <div className="space-y-6">
      {/* Debug section - remove this after testing */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Debug Info (Remove this later)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p><strong>User Data Exists:</strong> {userData ? 'Yes' : 'No'}</p>
            <p><strong>Pitch Value:</strong> {userData?.pitch || 'null/undefined'}</p>
            <p><strong>Video Value:</strong> {userData?.video || 'null/undefined'}</p>
            <p><strong>Full Name:</strong> {userData?.fullName || 'null/undefined'}</p>
            <details>
              <summary>Full User Data Object</summary>
              <pre className="mt-2 text-xs bg-white p-2 rounded">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </details>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Elevator Pitch</CardTitle>
              <CardDescription>Create and manage your professional pitch</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Display the pitch content */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Your Pitch</h3>
              {userData?.pitch ? (
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-gray-700 leading-relaxed text-base">{userData.pitch}</p>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                  <p className="text-gray-500 text-lg mb-2">No pitch available</p>
                  <p className="text-gray-400 text-sm">Create your elevator pitch to get started</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Create Pitch
                  </Button>
                </div>
              )}
            </div>
            
            {/* Display video if available */}
            {userData?.video ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Your Pitch Video</h3>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <iframe
                    src={userData.video}
                    className="w-full h-full"
                    allowFullScreen
                    title="Pitch Video"
                    frameBorder="0"
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-600">
                    Views: {userData.pitchViews || 0}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Update Video
                    </Button>
                    <Button variant="outline" size="sm">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Pitch Video</h3>
                <div className="aspect-video bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Ready to create your video?</h4>
                    <p className="text-gray-500 mb-4">Transform your pitch into an engaging video presentation</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2">
                      <Video className="w-4 h-4 mr-2" />
                      Generate Pitch Video
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action buttons only if we have a pitch but no video */}
            {userData?.pitch && !userData?.video && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1">
                  <Video className="w-4 h-4 mr-2" />
                  Generate Pitch Video
                </Button>
                <Button variant="outline">
                  Preview Script
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voice Recorder - only show if no pitch exists */}
      {!userData?.pitch && (
        <VoiceRecorder 
          onRecordingComplete={(blob) => {
            console.log('Recording completed:', blob);
          }} 
        />
      )}
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
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

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Activity</CardTitle>
          <CardDescription>Your profile views over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Analytics chart placeholder
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
      case 'analytics':
        return renderAnalyticsSection();
      case 'settings':
        return <Settings userType="user" />;
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="flex">
        <DashboardSidebar
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {userData?.fullName || 'User'}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your professional profile and track your progress</p>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading...</div>
              </div>
            ) : (
              renderContent()
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;