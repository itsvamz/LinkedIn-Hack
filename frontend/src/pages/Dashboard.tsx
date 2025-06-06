
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Video, BarChart3, Settings, Upload, Eye, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DashboardSidebar from '@/components/DashboardSidebar';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'pitch' | 'analytics' | 'settings'>('profile');

  const stats = [
    { title: 'Profile Views', value: '1,247', icon: Eye, trend: '+12%' },
    { title: 'Pitch Views', value: '89', icon: Video, trend: '+8%' },
    { title: 'Bookmarks', value: '23', icon: Award, trend: '+15%' },
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
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-600 text-white text-xl">SJ</AvatarFallback>
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
                defaultValue="Sarah Johnson"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Title</label>
              <input 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue="Senior UX Designer"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue="sarah@example.com"
                type="email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
              <input 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue="San Francisco, CA"
              />
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
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Create Your Avatar</h3>
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
    <Card>
      <CardHeader>
        <CardTitle>Elevator Pitch</CardTitle>
        <CardDescription>Create your 1-minute professional pitch video</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Pitch Script</label>
            <textarea 
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
              placeholder="Write your elevator pitch here..."
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">Generate Video</Button>
            <Button variant="outline">Preview Script</Button>
          </div>
        </div>
      </CardContent>
    </Card>
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
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Sarah!
              </h1>
              <p className="text-gray-600">Manage your professional profile and track your progress</p>
            </div>

            {/* Content */}
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
