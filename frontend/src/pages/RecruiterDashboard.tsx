import React, { useState, useEffect } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
import { getRecruiterProfile, updateRecruiterProfile, createAvatar } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'overview' | 'jobs' | 'candidates' | 'messaging' | 'analytics'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    company: '',
    position: '',
    industry: '',
    about: '',
    linkedin: '',
    github: '',
    portfolio: '',
    skills: '',
    availability: 'Available immediately'
  });
  
  const [stats, setStats] = useState([
    { title: 'Total Candidates', value: '0', icon: Users, trend: '0%' },
    { title: 'Shortlisted', value: '0', icon: Star, trend: '0%' },
    { title: 'Interviews Scheduled', value: '0', icon: Calendar, trend: '0%' },
    { title: 'Response Rate', value: '0%', icon: TrendingUp, trend: '0%' },
  ]);

  useEffect(() => {
    fetchRecruiterProfile();
  }, []);

  const fetchRecruiterProfile = async () => {
    try {
      setIsLoading(true);
      const recruiterData = await getRecruiterProfile();
      
      setProfileData({
        fullName: recruiterData.fullName || '',
        phone: recruiterData.phone || '',
        email: recruiterData.email || '',
        location: recruiterData.location || '',
        company: recruiterData.company || '',
        position: recruiterData.position || '',
        industry: recruiterData.industry || '',
        about: recruiterData.about || '',
        linkedin: recruiterData.linkedin || '',
        github: recruiterData.github || '',
        portfolio: recruiterData.portfolio || '',
        skills: Array.isArray(recruiterData.skills) ? recruiterData.skills.join(', ') : recruiterData.skills || '',
        availability: recruiterData.availability || 'Available immediately'
      });

      // If recruiter has analytics data, update the stats
      if (recruiterData.analytics) {
        setStats([
          { title: 'Total Candidates', value: recruiterData.analytics.totalCandidates?.toString() || '0', icon: Users, trend: '+0%' },
          { title: 'Shortlisted', value: recruiterData.analytics.shortlisted?.toString() || '0', icon: Star, trend: '+0%' },
          { title: 'Interviews Scheduled', value: recruiterData.analytics.interviews?.toString() || '0', icon: Calendar, trend: '+0%' },
          { title: 'Response Rate', value: recruiterData.analytics.responseRate?.toString() + '%' || '0%', icon: TrendingUp, trend: '+0%' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching recruiter profile:', error);
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

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      await updateRecruiterProfile(profileData);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
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
              <Input 
                id="fullName" 
                placeholder="Jane Smith" 
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
                placeholder="jane@company.com" 
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
            <div>
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                placeholder="Acme Inc." 
                value={profileData.company}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input 
                id="position" 
                placeholder="Senior Recruiter" 
                value={profileData.position}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input 
                id="industry" 
                placeholder="Technology" 
                value={profileData.industry}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          {/* About */}
          <div>
            <Label htmlFor="about">About</Label>
            <Textarea 
              id="about" 
              placeholder="Brief description about yourself and your recruiting focus..." 
              value={profileData.about}
              onChange={handleProfileChange}
            />
          </div>

          {/* Professional Profiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input 
                  id="linkedin" 
                  placeholder="linkedin.com/in/janesmith" 
                  value={profileData.linkedin}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input 
                  id="github" 
                  placeholder="github.com/janesmith" 
                  value={profileData.github}
                  onChange={handleProfileChange}
                />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input 
                  id="portfolio" 
                  placeholder="janesmith.dev" 
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
              placeholder="Talent Acquisition, HR Management, Interviewing..." 
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
              <option>Not actively recruiting</option>
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
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {profileData.fullName || user?.fullName || 'Recruiter'}!
              </h1>
              <p className="text-gray-600">Manage your recruiting activities and candidate pipeline</p>
            </div>
            
            {/* Content */}
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;