
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      applicants: 24,
      postedDate: '2024-01-15',
      skills: ['React', 'TypeScript', 'Next.js'],
      description: 'We are looking for a senior frontend developer to join our team...'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'Contract',
      salary: '$80k - $100k',
      applicants: 18,
      postedDate: '2024-01-12',
      skills: ['Figma', 'UI/UX', 'Design Systems'],
      description: 'Join our design team to create amazing user experiences...'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'AI Solutions',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $170k',
      applicants: 31,
      postedDate: '2024-01-10',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      description: 'We need a data scientist to work on cutting-edge AI projects...'
    }
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApplyJob = (jobId: number) => {
    navigate('/job-application');
  };

  const renderJobCard = (job: any) => (
    <Card key={job.id} className="border-gray-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-blue-600 font-medium">{job.company}</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Job Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            {job.salary}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {job.applicants} applicants
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Posted {new Date(job.postedDate).toLocaleDateString()}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

        {/* Apply Button */}
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => handleApplyJob(job.id)}
        >
          Apply Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing opportunities from top companies
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search jobs by title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map(renderJobCard)}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
