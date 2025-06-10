import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  salary: string;
  applicants: number;
  postedDate: string;
  skills: string[];
  description: string;
}

const Jobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        // Prepare headers - include auth token if available
        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('http://localhost:5000/api/jobs', {
          headers
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const jobsData = await response.json();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Even if there's an error, we can show some fallback or handle gracefully
        // For now, we'll just log the error and continue
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some((skill: string) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleApplyJob = (jobId: number) => {
    if (!isLoggedIn) {
      // Redirect to sign-in page if not logged in
      navigate('/login');
      return;
    }
    // If logged in, proceed with job application
    navigate('/job-application');
  };

  // Fixed: Added the missing renderJobCard function
  const renderJobCard = (job: Job) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </CardTitle>
              <p className="text-lg font-medium text-blue-600 mb-1">{job.company}</p>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </div>
            </div>
            <Badge variant="secondary" className="ml-2">
              {job.type}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              {job.salary}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {job.applicants} applicants
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            Posted {job.postedDate}
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge key="more-skills" variant="outline" className="text-xs">
                +{job.skills.length - 3} more
              </Badge>
            )}
          </div>

          <Button 
            onClick={() => handleApplyJob(job.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoggedIn ? 'Apply Now' : 'Sign in to Apply'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing opportunities from top companies
          </p>
          {!isLoggedIn && (
            <p className="text-sm text-blue-600 mt-2">
              Sign in to apply for jobs
            </p>
          )}
        </div>

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

        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Fixed: Simplified the mapping with proper key */}
            {filteredJobs.map(job => (
              <div key={job.id}>
                {renderJobCard(job)}
              </div>
            ))}
          </div>
        ) : (
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