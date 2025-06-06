
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Eye, Users, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const JobManagement = () => {
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
      status: 'Active',
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
      status: 'Active',
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
      status: 'Draft',
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

  const renderJobCard = (job: any) => (
    <Card key={job.id} className="border-gray-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-blue-600 font-medium">{job.company}</p>
          </div>
          <Badge 
            variant={job.status === 'Active' ? 'default' : 'secondary'}
            className={job.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
          >
            {job.status}
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
            {job.type} • {job.salary}
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

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-1" />
            Candidates ({job.applicants})
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Management
            </h1>
            <p className="text-gray-600">
              Create, manage, and track your job postings
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
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

        {/* Job Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map(renderJobCard)}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.filter(job => job.status === 'Active').map(renderJobCard)}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.filter(job => job.status === 'Draft').map(renderJobCard)}
            </div>
          </TabsContent>

          <TabsContent value="closed" className="mt-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No closed jobs</h3>
              <p className="text-gray-600">Closed job postings will appear here</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search or create a new job posting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagement;
