
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Briefcase, Star, Play, MessageSquare, User, X, Mail, Phone, MapPin as Location, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ViewCandidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [bookmarkedRecruiters, setBookmarkedRecruiters] = useState<Set<number>>(new Set());
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'recruiter' as 'candidate' | 'recruiter'
  });

  // Mock recruiters data
  const recruitersData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      role: 'Senior Technical Recruiter',
      location: 'San Francisco, CA',
      experience: '5+ years',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      about: 'Passionate about connecting top talent with innovative companies. Specialized in technical roles and startup environments.',
      skills: ['Technical Recruiting', 'Startup Culture', 'Remote Work', 'Full-Stack Development'],
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      activeJobs: 12,
      placementRate: '85%'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'InnovateLabs',
      role: 'Head of Talent Acquisition',
      location: 'Austin, TX',
      experience: '8+ years',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      about: 'Building world-class teams for cutting-edge technology companies. Expert in scaling engineering teams.',
      skills: ['Team Building', 'Engineering Recruitment', 'Leadership', 'AI/ML Recruiting'],
      email: 'michael.chen@innovatelabs.com',
      phone: '+1 (555) 987-6543',
      activeJobs: 8,
      placementRate: '92%'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'GlobalTech Solutions',
      role: 'Director of Recruiting',
      location: 'New York, NY',
      experience: '10+ years',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      about: 'Dedicated to finding the perfect match between candidates and companies. Specialized in executive placements.',
      skills: ['Executive Search', 'C-Level Recruiting', 'Strategic Planning', 'Global Recruitment'],
      email: 'emily.rodriguez@globaltech.com',
      phone: '+1 (555) 456-7890',
      activeJobs: 15,
      placementRate: '88%'
    }
  ];

  const skills = ['Technical Recruiting', 'Executive Search', 'Startup Culture', 'Remote Work', 'AI/ML Recruiting'];

  const filteredRecruiters = recruitersData.filter(recruiter => 
    recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSkill === '' || recruiter.skills.includes(selectedSkill))
  );

  const toggleBookmark = (recruiterId: number) => {
    const newBookmarked = new Set(bookmarkedRecruiters);
    if (newBookmarked.has(recruiterId)) {
      newBookmarked.delete(recruiterId);
    } else {
      newBookmarked.add(recruiterId);
    }
    setBookmarkedRecruiters(newBookmarked);
  };

  const ProfileModal = ({ recruiter }: { recruiter: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {recruiter.name}'s Complete Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center space-x-6 p-6 bg-blue-50 rounded-lg">
            <img
              src={recruiter.avatar}
              alt={recruiter.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{recruiter.name}</h2>
              <p className="text-xl text-blue-600 font-medium">{recruiter.role}</p>
              <p className="text-lg text-gray-700 font-medium">{recruiter.company}</p>
              <div className="flex items-center text-gray-600 mt-2">
                <Location className="w-4 h-4 mr-2" />
                {recruiter.location}
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Briefcase className="w-4 h-4 mr-2" />
                {recruiter.experience}
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {recruiter.activeJobs} Active Jobs
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {recruiter.placementRate} Success Rate
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed">{recruiter.about}</p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {recruiter.skills.map((skill: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact Information */}
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
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Connect with Recruiters
          </h1>
          <p className="text-gray-600 text-lg">
            Find the right recruiter to help advance your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search recruiters by name, company, or specialization"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedSkill === '' ? 'default' : 'outline'}
                onClick={() => setSelectedSkill('')}
                size="sm"
                className={selectedSkill === '' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}
              >
                All Specializations
              </Button>
              {skills.map(skill => (
                <Button
                  key={skill}
                  variant={selectedSkill === skill ? 'default' : 'outline'}
                  onClick={() => setSelectedSkill(skill)}
                  size="sm"
                  className={selectedSkill === skill ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recruiters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecruiters.map((recruiter, index) => (
            <motion.div
              key={recruiter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6">
                  {/* Recruiter Header */}
                  <div className="flex items-center mb-4">
                    <img
                      src={recruiter.avatar}
                      alt={recruiter.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{recruiter.name}</h3>
                      <p className="text-blue-600 font-medium">{recruiter.role}</p>
                      <p className="text-gray-600 text-sm">{recruiter.company}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {recruiter.location}
                      </div>
                    </div>
                  </div>

                  {/* Experience & Stats */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {recruiter.experience}
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="bg-green-50 text-green-700 px-2 py-1 rounded">
                        {recruiter.activeJobs} Active Jobs
                      </div>
                      <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {recruiter.placementRate} Success
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {recruiter.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                      {recruiter.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                          +{recruiter.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* About */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {recruiter.about}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <ProfileModal recruiter={recruiter} />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => toggleBookmark(recruiter.id)}
                        className={`${bookmarkedRecruiters.has(recruiter.id) 
                          ? 'bg-yellow-100 border-yellow-300 text-yellow-600' 
                          : 'border-gray-200 text-gray-400 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${bookmarkedRecruiters.has(recruiter.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredRecruiters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recruiters found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCandidates;
