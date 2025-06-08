import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Star, TrendingUp, Upload, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RecruiterSidebar from '@/components/recruiter/RecruiterSidebar';
import DashboardOverview from '@/components/recruiter/DashboardOverview';
import JobsSection from '@/components/recruiter/JobsSection';
import CandidatesSection from '@/components/recruiter/CandidatesSection';
import MessagingSection from '@/components/recruiter/MessagingSection';

const RecruiterDashboard = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'overview' | 'jobs' | 'candidates' | 'messaging' | 'analytics'>('overview');

  const stats = [
    { title: 'Total Candidates', value: '1,247', icon: Users, trend: '+12%' },
    { title: 'Shortlisted', value: '89', icon: Star, trend: '+8%' },
    { title: 'Interviews Scheduled', value: '12', icon: Calendar, trend: '+15%' },
    { title: 'Response Rate', value: '78%', icon: TrendingUp, trend: '+5%' },
  ];

  const renderOverviewSection = () => (
    <DashboardOverview onModeSelect={() => setActiveSection('jobs')} activeMode={activeSection} />
  );

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recruiter Profile</CardTitle>
          <CardDescription>Complete your profile to increase visibility to candidates</CardDescription>
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
              <Input id="fullName" placeholder="Jane Smith" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane@company.com" />
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
                <Input id="linkedin" placeholder="linkedin.com/in/janesmith" />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" placeholder="github.com/janesmith" />
              </div>
              <div>
                <Label htmlFor="leetcode">LeetCode</Label>
                <Input id="leetcode" placeholder="leetcode.com/janesmith" />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input id="portfolio" placeholder="janesmith.dev" />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Textarea id="skills" placeholder="Talent Acquisition, HR Management, Interviewing..." />
          </div>

          {/* Availability */}
          <div>
            <Label htmlFor="availability">Availability</Label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Available immediately</option>
              <option>Available in 2 weeks</option>
              <option>Available in 1 month</option>
              <option>Not actively recruiting</option>
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
              <Briefcase className="w-16 h-16 text-blue-600" />
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
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Generate New Avatar</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalyticsSection = () => (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Talent Response Rate</h4>
                <p className="text-2xl font-bold text-blue-600">76%</p>
                <p className="text-sm text-gray-600">Job click-through rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Talent Acquisition Rate</h4>
                <p className="text-2xl font-bold text-green-600">23%</p>
                <p className="text-sm text-gray-600">Successful hires</p>
              </CardContent>
            </Card>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Detailed analytics charts coming soon...
          </div>
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
      case 'overview':
        return renderOverviewSection();
      case 'jobs':
        return <JobsSection />;
      case 'candidates':
        return <CandidatesSection />;
      case 'messaging':
        return <MessagingSection />;
      case 'analytics':
        return renderAnalyticsSection();
      default:
        return renderOverviewSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <RecruiterSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 p-6 ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Content */}
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
