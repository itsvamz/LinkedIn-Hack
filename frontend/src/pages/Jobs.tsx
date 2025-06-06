
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, DollarSign, Building2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      posted: "2 days ago",
      description: "We're looking for a Senior Frontend Developer to join our growing team...",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90k - $120k",
      posted: "1 week ago",
      description: "Join our creative team to design beautiful user experiences...",
      skills: ["Figma", "Sketch", "User Research", "Prototyping"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $140k",
      posted: "3 days ago",
      description: "Help us unlock insights from data to drive business decisions...",
      skills: ["Python", "Machine Learning", "SQL", "Pandas"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130k - $170k",
      posted: "5 days ago",
      description: "Lead product strategy and execution for our flagship product...",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$125k - $155k",
      posted: "1 day ago",
      description: "Build and maintain our cloud infrastructure and deployment pipelines...",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Mobile Developer",
      company: "AppDev Co.",
      location: "Los Angeles, CA",
      type: "Contract",
      salary: "$80 - $120/hr",
      posted: "1 week ago",
      description: "Develop high-quality mobile applications for iOS and Android...",
      skills: ["React Native", "Swift", "Kotlin", "Mobile UI"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
    }
  ];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Opportunities
          </h1>
          <p className="text-gray-600">
            Discover {jobs.length} open positions from top companies
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search jobs by title, company, or skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Building2 className="w-4 h-4 mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.posted}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="secondary">{job.type}</Badge>
                            {job.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
