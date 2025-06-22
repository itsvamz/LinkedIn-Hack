import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Eye, Heart, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

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
  currentPosition: string;
  avatar: string;
  views: number;
  likes: number;
  engagement: number;
  email: string;
  phone: string;
  location: string;
  experience: { company: string; role: string; duration: string }[];
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
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:5000/api/user/leaderboard?timeframe=${timeframe}&category=${category}&role=${roleFilter}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }

        const data = await response.json();
        
        const processedData = data.map((user: User, index: number) => ({
          rank: index + 1,
          id: user._id,
          name: user.fullName,
          currentPosition: getCurrentPosition(user.experience),
          avatar: '/placeholder.svg',
          views: user.profileViews || 0,
          likes: user.profileLikes || 0,
          engagement: calculateEngagement(user),
          email: user.email,
          phone: user.phone || 'Not provided',
          location: user.location || 'Not specified',
          experience: user.experience || [],
          skills: user.skills || [],
          about: user.about || 'No description provided'
        }));

        // Sort by the selected category
        processedData.sort((a, b) => {
          if (category === 'views') return b.views - a.views;
          if (category === 'likes') return b.likes - a.likes;
          return b.engagement - a.engagement;
        });

        // Update ranks after sorting
        processedData.forEach((user, index) => {
          user.rank = index + 1;
        });

        setUsers(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [timeframe, category, roleFilter]);

  const getCurrentPosition = (experience: { company: string; role: string; duration: string }[]): string => {
    if (!experience || experience.length === 0) return 'Professional';
    
    // Get the most recent position (first in array)
    const mostRecent = experience[0];
    return `${mostRecent.role} at ${mostRecent.company}`;
  };

  const calculateEngagement = (user: User): number => {
    const views = user.profileViews || 0;
    if (views === 0) return 0;
    
    const interactions = (user.profileLikes || 0) + (user.profileClicks || 0) + (user.profileBookmarks || 0);
    return Math.min(Math.round((interactions / views) * 100), 100);
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
            if (!checkAuth()) {
              e.preventDefault();
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
              <p className="text-xl text-blue-600 font-medium">{user.currentPosition}</p>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-2" />
                {user.location}
              </div>
              <div className="flex items-center mt-2">
              
                <span className="text-sm font-medium">Rank {user.rank}</span>
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

          {/* Experience */}
          {user.experience.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Experience</h3>
              <div className="space-y-3">
                {user.experience.map((exp, idx) => (
                  <div key={idx} className="flex items-start">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{exp.role}</p>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {user.skills.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
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
            Top-performing professionals on our platform
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

        {/* Leaderboard Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-blue-600" />
              Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    <span className="text-lg font-bold text-gray-600">{user.rank}</span>
                  </div>
                  
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.currentPosition}</p>
                  </div>
                  
                  <div className="text-right mr-4">
                    <div className="text-lg font-bold text-gray-900">
                      {getCurrentValue(user)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {category === 'views' ? 'Views' : category === 'likes' ? 'Likes' : 'Engagement'}
                    </div>
                  </div>
                  
                  <ProfileModal user={user} />
                </motion.div>
              ))}
              
              {users.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No users found matching the selected criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;