import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Mail, Phone, User, Video, MessageSquare } from 'lucide-react';
import axios from 'axios';

interface RecruiterType {
  _id: string;
  fullName: string;
  company: string;
  role: string;
  industry: string;
  avatar?: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  specialties: string[];
  activeJobs: number;
  rating: number;
  about: string;
}

const Recruiters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    company: '',
    role: '',
    industry: ''
  });
  const [recruiters, setRecruiters] = useState<RecruiterType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/recruiter/all');
      setRecruiters(response.data || []);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      setError('Failed to fetch recruiters. Please try again later.');
      setRecruiters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const industries = ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Sales'];
  const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Marketing Manager'];

  const filteredRecruiters = recruiters.filter(recruiter => {
    const matchesSearch =
      recruiter.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recruiter.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recruiter.role?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany = !selectedFilters.company || recruiter.company === selectedFilters.company;
    const matchesRole = !selectedFilters.role || recruiter.specialties?.includes(selectedFilters.role);
    const matchesIndustry = !selectedFilters.industry || recruiter.industry === selectedFilters.industry;

    return matchesSearch && matchesCompany && matchesRole && matchesIndustry;
  });

  const ProfileModal = ({ recruiter }: { recruiter: RecruiterType }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50" size="sm">
          <User className="w-4 h-4 mr-2" />
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {recruiter.fullName}'s Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-6 p-6 bg-blue-50 rounded-lg">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={recruiter.avatar || '/placeholder.svg'} />
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {recruiter.fullName?.split(' ').map(n => n[0]).join('') || 'R'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{recruiter.fullName}</h2>
              <p className="text-xl text-blue-600 font-medium">{recruiter.role}</p>
              <p className="text-lg text-gray-700 font-medium">{recruiter.company}</p>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-2" />
                {recruiter.location}
              </div>
              
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                <span>{recruiter.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span>{recruiter.phone}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed">{recruiter.about}</p>
          </div>

          

          <div className="flex gap-4 pt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Connect with Recruiter
            </Button>
            <Button variant="outline" className="flex-1">
              View Active Jobs
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AvatarChatModal = ({ recruiter }: { recruiter: RecruiterType }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
          <Video className="w-4 h-4 mr-2" />
          Avatar Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Chat with {recruiter.fullName}'s Avatar
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <Avatar className="w-16 h-16">
              <AvatarImage src={recruiter.avatar || '/placeholder.svg'} />
              <AvatarFallback className="bg-blue-600 text-white">
                {recruiter.fullName?.split(' ').map(n => n[0]).join('') || 'R'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{recruiter.fullName}</h4>
              <p className="text-sm text-gray-600">{recruiter.role}</p>
              <p className="text-xs text-blue-600">AI Avatar - Ready to discuss opportunities</p>
            </div>
          </div>
          <div className="h-64 border rounded-lg p-4 bg-gray-50">
            <div className="text-center text-gray-500 mt-20">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Start a conversation with {recruiter.fullName}'s AI avatar</p>
              <p className="text-xs">Ask about job opportunities, company culture, or requirements</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Ask about available positions..." className="flex-1" />
            <Button className="bg-blue-600 hover:bg-blue-700">Send</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 text-lg mt-4">Loading recruiters...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <Button onClick={fetchRecruiters} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Connect with Top Recruiters
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and connect with industry-leading recruiters who can help advance your career
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }} 
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recruiters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select 
              value={selectedFilters.company} 
              onChange={(e) => setSelectedFilters({ ...selectedFilters, company: e.target.value })} 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Companies</option>
              {recruiters && recruiters.length > 0 && Array.from(new Set(recruiters.map(r => r.company))).map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            <select 
              value={selectedFilters.role} 
              onChange={(e) => setSelectedFilters({ ...selectedFilters, role: e.target.value })} 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select 
              value={selectedFilters.industry} 
              onChange={(e) => setSelectedFilters({ ...selectedFilters, industry: e.target.value })} 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {filteredRecruiters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recruiters found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecruiters.map((recruiter, index) => (
              <motion.div 
                key={recruiter._id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-100 bg-white">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-blue-100">
                      <AvatarImage src={recruiter.avatar || '/placeholder.svg'} />
                      <AvatarFallback className="bg-blue-600 text-white text-lg">
                        {recruiter.fullName?.split(' ').map(n => n[0]).join('') || 'R'}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{recruiter.fullName}</CardTitle>
                    <p className="text-sm text-gray-600">{recruiter.position}</p>
                    <p className="text-sm font-medium text-blue-600">{recruiter.company}</p>
                    
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">{recruiter.description}</p>
                    
                    <div className="flex gap-2 pt-4">
                      <ProfileModal recruiter={recruiter} />
                      <AvatarChatModal recruiter={recruiter} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recruiters;