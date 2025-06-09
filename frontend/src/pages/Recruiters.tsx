import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MessageSquare, Video } from 'lucide-react';
import { getAllRecruiters } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

// Define the Recruiter interface
interface Recruiter {
  id: string | number;
  name?: string;
  company?: string;
  role?: string;
  industry?: string;
  avatar?: string;
  rating?: number;
  activeJobs?: number;
  description?: string;
  specialties?: string[];
}

const Recruiters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    company: '',
    role: '',
    industry: ''
  });
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch recruiters from API
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        setLoading(true);
        const data = await getAllRecruiters();
        setRecruiters(data);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
        toast({
          title: 'Error',
          description: 'Failed to load recruiters. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, [toast]);

  const industries = ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Sales'];
  const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Marketing Manager'];

  // Fixed: Add safety checks for all properties to prevent undefined errors
  const filteredRecruiters = recruiters.filter(recruiter => {
    const matchesSearch = (recruiter?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (recruiter?.company?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (recruiter?.role?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesCompany = !selectedFilters.company || recruiter?.company === selectedFilters.company;
    const matchesRole = !selectedFilters.role || (recruiter?.specialties && recruiter.specialties.includes(selectedFilters.role));
    const matchesIndustry = !selectedFilters.industry || recruiter?.industry === selectedFilters.industry;
  
    return matchesSearch && matchesCompany && matchesRole && matchesIndustry;
  });

  // Helper function to safely get unique companies
  const getUniqueCompanies = () => {
    return Array.from(new Set(recruiters.map(r => r?.company).filter(Boolean)));
  };

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
              {getUniqueCompanies().map(company => (
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

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading recruiters...</p>
          </div>
        ) : (
          <>
            {/* Recruiters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecruiters.map((recruiter) => (
                <motion.div
                  key={recruiter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-gray-200">
                    <CardHeader className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage src={recruiter?.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white text-lg">
                          {/* Fixed: Add safety checks before calling split() */}
                          {(recruiter?.name || 'Unknown')
                            .split(' ')
                            .map(n => n?.[0] || '')
                            .join('')
                            .toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">{recruiter?.name || 'Unknown'}</CardTitle>
                      <p className="text-sm text-gray-600">{recruiter?.role || 'Role not specified'}</p>
                      <p className="text-sm font-medium text-blue-600">{recruiter?.company || 'Company not specified'}</p>
                      <div className="flex items-center justify-center mt-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">{recruiter?.rating || 0}</span>
                        <span className="text-sm text-gray-500 ml-2">({recruiter?.activeJobs || 0} active jobs)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 text-center">
                        {recruiter?.description || 'No description available'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        {(recruiter?.specialties || []).map((specialty) => (
                          <Badge key={`${recruiter.id}-${specialty}`} variant="secondary" className="text-xs">
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

            {/* No Results Message */}
            {filteredRecruiters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No recruiters found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Recruiters;