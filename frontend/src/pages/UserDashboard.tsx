
import React, { useState } from 'react';
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

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'pitch' | 'analytics' | 'settings'>('profile');

  const stats = [
    { title: 'Profile Views', value: '1,247', icon: Eye, trend: '+12%' },
    { title: 'Pitch Views', value: '89', icon: Video, trend: '+8%' },
    { title: 'Likes', value: '156', icon: MessageSquare, trend: '+15%' },
    { title: 'Ranking', value: '#156', icon: BarChart3, trend: '+5' },
  ];

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
              <Button variant="outline" size="sm">Upload Resume</Button>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC up to 5MB</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="San Francisco, CA" />
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" placeholder="linkedin.com/in/johndoe" />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" placeholder="github.com/johndoe" />
              </div>
              <div>
                <Label htmlFor="leetcode">LeetCode</Label>
                <Input id="leetcode" placeholder="leetcode.com/johndoe" />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input id="portfolio" placeholder="johndoe.dev" />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Textarea id="skills" placeholder="React, Node.js, Python, Machine Learning..." />
          </div>

          {/* Availability */}
          <div>
            <Label htmlFor="availability">Availability</Label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Available immediately</option>
              <option>Available in 2 weeks</option>
              <option>Available in 1 month</option>
              <option>Not actively looking</option>
            </select>
          </div>

          <Button className="w-full">Save Profile</Button>
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

          <Button className="w-full">Generate New Avatar</Button>
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
            />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Generate from Profile</Button>
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
            <Button className="flex-1">Save Pitch</Button>
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
                Welcome back, John!
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
