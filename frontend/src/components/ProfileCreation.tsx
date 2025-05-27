
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, User, MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileCreation = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior UX Designer',
    company: 'Tech Innovations Inc.',
    experience: '5+ years',
  });

  const handleResumeUpload = () => {
    setResumeUploaded(true);
    // TODO: Implement actual file upload and parsing
    console.log('Resume uploaded and parsed');
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Resume Upload Section */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-violet-600" />
            Smart Profile Creation
          </CardTitle>
          <CardDescription>
            Upload your resume to auto-fill your profile details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              resumeUploaded
                ? 'border-green-300 bg-green-50'
                : 'border-violet-300 bg-violet-50 hover:border-violet-400'
            }`}
          >
            {resumeUploaded ? (
              <div>
                <FileText className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <p className="text-green-700 font-medium">Resume uploaded successfully!</p>
                <p className="text-sm text-green-600">Profile details have been auto-filled</p>
              </div>
            ) : (
              <div>
                <Upload className="w-12 h-12 mx-auto mb-4 text-violet-600" />
                <Button
                  onClick={handleResumeUpload}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                >
                  Upload Resume
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Supports PDF, DOC, DOCX files (max 5MB)
                </p>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Profile Details Form */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-violet-600" />
            Profile Details
          </CardTitle>
          <CardDescription>
            Review and edit your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </Label>
            <Input
              id="location"
              value={profileData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                Job Title
              </Label>
              <Input
                id="title"
                value={profileData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={profileData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              value={profileData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="e.g., 5+ years"
              className="focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCreation;
