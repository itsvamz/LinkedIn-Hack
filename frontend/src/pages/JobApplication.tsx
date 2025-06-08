
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Eye, Share, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const JobApplication = () => {
  const navigate = useNavigate();
  const [showFullJob, setShowFullJob] = useState(false);
  const [cv, setCv] = useState('');

  const jobDetails = {
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: `We are looking for a senior frontend developer to join our team and help build the next generation of web applications.

Key Responsibilities:
• Develop and maintain high-quality React applications
• Collaborate with design and backend teams
• Implement responsive and accessible user interfaces
• Optimize applications for maximum speed and scalability
• Write clean, maintainable code with proper testing

Requirements:
• 5+ years of experience with React and TypeScript
• Strong knowledge of modern JavaScript (ES6+)
• Experience with state management (Redux, Context API)
• Proficiency in CSS frameworks (Tailwind, Material-UI)
• Experience with testing frameworks (Jest, React Testing Library)
• Knowledge of version control systems (Git)
• Bachelor's degree in Computer Science or related field

Benefits:
• Competitive salary and equity package
• Health, dental, and vision insurance
• Flexible work arrangements
• Professional development budget
• Unlimited PTO policy`,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  };

  const handleSubmit = () => {
    console.log('Application submitted');
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/jobs')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{jobDetails.title}</h1>
            <p className="text-gray-600">{jobDetails.company} • {jobDetails.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Job Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Write CV Section */}
              <div>
                <Label htmlFor="cv" className="text-lg font-semibold mb-2 block">
                  Write Your CV
                </Label>
                <Textarea
                  id="cv"
                  placeholder="Tell us about your experience, skills, and what makes you a great fit for this role..."
                  value={cv}
                  onChange={(e) => setCv(e.target.value)}
                  className="min-h-64 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowFullJob(!showFullJob)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showFullJob ? 'Hide' : 'View'} Full Job Description
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Share className="w-4 h-4 mr-2" />
                  Share My Profile
                </Button>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                  disabled={!cv.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">{jobDetails.title}</h3>
                <p className="text-blue-600 font-medium">{jobDetails.company}</p>
                <p className="text-gray-600">{jobDetails.location} • {jobDetails.type}</p>
                <p className="text-gray-800 font-medium">{jobDetails.salary}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {jobDetails.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Job Description */}
              {showFullJob && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t pt-4"
                >
                  <h4 className="font-medium mb-2">Full Job Description</h4>
                  <div className="text-sm text-gray-600 whitespace-pre-line">
                    {jobDetails.description}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
