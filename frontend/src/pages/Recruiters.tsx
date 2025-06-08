
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MessageSquare, Video } from 'lucide-react';

const Recruiters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    company: '',
    role: '',
    industry: ''
  });

  const recruiters = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Tech Corp',
      role: 'Senior Talent Acquisition Manager',
      industry: 'Technology',
      avatar: '/placeholder.svg',
      description: 'Specialized in recruiting top-tier software engineers and product managers. 8+ years of experience in tech recruitment.',
      specialties: ['Software Engineering', 'Product Management', 'Data Science'],
      activeJobs: 12,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Innovation Labs',
      role: 'Lead Recruiter',
      industry: 'Fintech',
      avatar: '/placeholder.svg',
      description: 'Expert in fintech and blockchain recruitment. Passionate about connecting talented individuals with cutting-edge companies.',
      specialties: ['Blockchain', 'Fintech', 'Cybersecurity'],
      activeJobs: 8,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'Healthcare Plus',
      role: 'Healthcare Recruiter',
      industry: 'Healthcare',
      avatar: '/placeholder.svg',
      description: 'Dedicated to placing healthcare professionals in positions where they can make a real difference.',
      specialties: ['Healthcare', 'Medical Devices', 'Pharmaceuticals'],
      activeJobs: 15,
      rating: 4.7
    }
  ];

  const industries = ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Sales'];
  const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Marketing Manager'];

  const filteredRecruiters = recruiters.filter(recruiter => {
    const matchesSearch = recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recruiter.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recruiter.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = !selectedFilters.company || recruiter.company === selectedFilters.company;
    const matchesRole = !selectedFilters.role || recruiter.specialties.includes(selectedFilters.role);
    const matchesIndustry = !selectedFilters.industry || recruiter.industry === selectedFilters.industry;

    return matchesSearch && matchesCompany && matchesRole && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect with Top Recruiters</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and connect with industry-leading recruiters who can help advance your career
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recruiters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedFilters.company}
              onChange={(e) => setSelectedFilters({...selectedFilters, company: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Companies</option>
              {Array.from(new Set(recruiters.map(r => r.company))).map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            <select
              value={selectedFilters.role}
              onChange={(e) => setSelectedFilters({...selectedFilters, role: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select
              value={selectedFilters.industry}
              onChange={(e) => setSelectedFilters({...selectedFilters, industry: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Recruiters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecruiters.map((recruiter, index) => (
            <motion.div
              key={recruiter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-gray-200">
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={recruiter.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {recruiter.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{recruiter.name}</CardTitle>
                  <p className="text-sm text-gray-600">{recruiter.role}</p>
                  <p className="text-sm font-medium text-blue-600">{recruiter.company}</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">{recruiter.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">({recruiter.activeJobs} active jobs)</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 text-center">{recruiter.description}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {recruiter.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Avatar Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredRecruiters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recruiters found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recruiters;
