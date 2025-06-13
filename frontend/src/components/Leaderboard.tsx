import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Eye, Heart, Award, Crown, Medal, Filter, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
// import { useAuthGuard } from '@/utils/authGuard';

interface User {
  _id: string;
  fullName: string;
  skills: string[];
  profileViews: number;
  profileLikes: number;
  profileClicks: number;
  profileBookmarks: number;
  email: string;
  phone?: string;
  location?: string;
  experience: { company: string; role: string; duration: string }[];
  about?: string;
}

interface ProcessedUser {
  rank: number;
  id: string;
  name: string;
  title: string;
  role: string;
  avatar: string;
  views: number;
  likes: number;
  engagement: number;
  change: string;
  badge: string | null;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  about: string;
}

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month');
  const [category, setCategory] = useState<'views' | 'likes' | 'engagement'>('views');
  const [roleFilter, setRoleFilter] = useState<'all' | 'developer' | 'designer' | 'manager'>('all');
  const [users, setUsers] = useState<ProcessedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get the token from localStorage
        
        const response = await fetch('http://localhost:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}` // Add the token to the request headers
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data: User[] = await response.json();
        
        // Process the data to match the leaderboard format
        const processedData = data.map((user, index) => ({
          rank: index + 1,
          id: user._id,
          name: user.fullName,
          title: determineTitle(user.skills),
          role: determineRole(user.skills),
          avatar: '/placeholder.svg',
          views: user.profileViews || 0,
          likes: user.profileLikes || 0,
          engagement: calculateEngagement(user),
          change: '+5%', // Placeholder
          badge: determineBadge(index),
          email: user.email,
          phone: user.phone || 'Not provided',
          location: user.location || 'Not specified',
          experience: determineExperience(user.experience),
          skills: user.skills || [],
          about: determineAbout(user)
        }));
        
        // Sort by the selected category
        processedData.sort((a, b) => {
          if (category === 'views') return b.views - a.views;
          if (category === 'likes') return b.likes - a.likes;
          return b.engagement - a.engagement;
        });
        
        setUsers(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [category]);

  // Helper functions
  const determineTitle = (skills: string[]): string => {
    if (!skills || skills.length === 0) return 'Professional';
    
    if (skills.some(s => ['React', 'Angular', 'Vue', 'JavaScript', 'TypeScript'].includes(s))) {
      return 'Frontend Developer';
    } else if (skills.some(s => ['Node.js', 'Java', 'Python', 'C#', '.NET', 'PHP'].includes(s))) {
      return 'Backend Developer';
    } else if (skills.some(s => ['UI', 'UX', 'Figma', 'Design'].includes(s))) {
      return 'UX Designer';
    } else if (skills.some(s => ['Product', 'Manager', 'Agile', 'Scrum'].includes(s))) {
      return 'Product Manager';
    } else if (skills.some(s => ['Data', 'Machine Learning', 'AI', 'Python', 'TensorFlow'].includes(s))) {
      return 'Data Scientist';
    }
    
    return 'Full Stack Developer';
  };
  
  const determineRole = (skills: string[]): string => {
    if (!skills || skills.length === 0) return 'developer';
    
    if (skills.some(s => ['UI', 'UX', 'Figma', 'Design'].includes(s))) {
      return 'designer';
    } else if (skills.some(s => ['Product', 'Manager', 'Agile', 'Scrum'].includes(s))) {
      return 'manager';
    }
    
    return 'developer';
  };
  
  const calculateEngagement = (user: User): number => {
    const views = user.profileViews || 0;
    if (views === 0) return 0;
    
    const interactions = (user.profileLikes || 0) + (user.profileClicks || 0) + (user.profileBookmarks || 0);
    return Math.min(Math.round((interactions / views) * 100), 100);
  };
  
  const determineBadge = (index: number): string | null => {
    if (index === 0) return 'top-performer';
    if (index === 1) return 'rising-star';
    if (index === 2) return 'consistent';
    if (index === 4) return 'fast-climber';
    return null;
  };
  
  const determineExperience = (experience: { company: string; role: string; duration: string }[]): string => {
    if (!experience || experience.length === 0) return 'Experience not specified';
    return `${experience.length}+ years experience`;
  };
  
  const determineAbout = (user: User): string => {
    if (user.about) return user.about;
    
    const skills = user.skills ? user.skills.join(', ') : 'various technologies';
    const experience = user.experience ? user.experience.length : 'several';
    
    return `Professional with experience in ${skills}. Has worked on ${experience} projects or roles.`;
  };

  const filteredData = users.filter(item => 
    roleFilter === 'all' || item.role === roleFilter
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string | null): string => {
    switch (badge) {
      case 'top-performer':
        return 'bg-yellow-100 text-yellow-800';
      case 'rising-star':
        return 'bg-blue-100 text-blue-800';
      case 'consistent':
        return 'bg-green-100 text-green-800';
      case 'fast-climber':
        return 'bg-purple-100 text-purple-800';
      default:
        return '';
    }
  };

  const getCurrentValue = (item: ProcessedUser): string => {
    switch (category) {
      case 'views':
        return item.views.toLocaleString();
      case 'likes':
        return item.likes.toLocaleString();
      case 'engagement':
        return `${item.engagement}%`;
      default:
        return item.views.toLocaleString();
    }
  };

  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return false;
    }
    return true;
  };

  const ProfileModal = ({ user }: { user: ProcessedUser }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={(e) => {
            if (!checkAuth(() => {})) {
              e.preventDefault(); // Prevent dialog from opening
            }
          }}
        >
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {user.name}'s Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center space-x-6 p-6 bg-blue-50 rounded-lg">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-blue-600 text-white text-xl">
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-xl text-blue-600 font-medium">{user.title}</p>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-2" />
                {user.location}
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Briefcase className="w-4 h-4 mr-2" />
                {user.experience}
              </div>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="text-sm font-medium">Rank #{user.rank}</span>
                </div>
                {user.badge && (
                  <Badge className={getBadgeColor(user.badge)}>
                    {user.badge.replace('-', ' ')}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Eye className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">{user.views.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Profile Views</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-600">{user.likes}</p>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{user.engagement}%</p>
              <p className="text-sm text-gray-600">Engagement</p>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed">{user.about}</p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Talent Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the top-performing professionals on our platform
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Timeframe Selector */}
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Timeframe:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['week', 'month', 'all'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setTimeframe(option as 'week' | 'month' | 'all')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        timeframe === option
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:text-blue-700'
                      }`}
                    >
                      {option === 'all' ? 'All Time' : `This ${option.charAt(0).toUpperCase() + option.slice(1)}`}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Selector */}
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {[
                    { key: 'views', label: 'Views', icon: Eye },
                    { key: 'likes', label: 'Likes', icon: Heart },
                    { key: 'engagement', label: 'Engagement', icon: TrendingUp }
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.key}
                        onClick={() => setCategory(option.key as 'views' | 'likes' | 'engagement')}
                        className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          category === option.key
                            ? 'bg-white text-blue-700 shadow-sm'
                            : 'text-gray-600 hover:text-blue-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-1" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Filter */}
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Role:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'developer', label: 'Developer' },
                    { key: 'designer', label: 'Designer' },
                    { key: 'manager', label: 'Manager' }
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setRoleFilter(option.key as 'all' | 'developer' | 'designer' | 'manager')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        roleFilter === option.key
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:text-blue-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filteredData.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
            >
              <Card className={`border-2 ${item.rank === 1 ? 'border-yellow-300 shadow-lg' : 'border-gray-200'} hover:shadow-xl transition-all`}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {getRankIcon(item.rank)}
                  </div>
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-lg">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-xl">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{item.title}</p>
                  {item.badge && (
                    <Badge className={`mb-3 ${getBadgeColor(item.badge)}`}>
                      {item.badge.replace('-', ' ')}
                    </Badge>
                  )}
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {getCurrentValue(item)}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {item.change}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-blue-600" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    item.rank <= 3 ? 'bg-blue-25' : ''
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {getRankIcon(item.rank)}
                  </div>
                  
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {item.badge && (
                        <Badge className={`text-xs ${getBadgeColor(item.badge)}`}>
                          {item.badge.replace('-', ' ')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.title}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {getCurrentValue(item)}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {item.change}
                    </div>
                  </div>
                  
                  <ProfileModal user={item} />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
