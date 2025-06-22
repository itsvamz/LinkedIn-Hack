
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Eye, Heart, Award, Crown, Medal, Filter, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month');
  const [category, setCategory] = useState<'views' | 'likes' | 'engagement'>('views');
  const [roleFilter, setRoleFilter] = useState<'all' | 'developer' | 'designer' | 'manager'>('all');
  const [users, setUsers] = useState<{
    rank: number;
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
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Transform the data to match the leaderboard format
        const transformedData = res.data.map((user: {
          fullName: string;
          role?: string;
          avatar?: string;
          analytics?: {
            profileViews?: number;
            profileLikes?: number;
            engagement?: number;
          };
          email: string;
          phone?: string;
          location?: string;
          experience?: Array<{ company: string; position: string; duration: string }>;
          skills?: string[];
          about?: string;
        }, index: number) => ({
          rank: index + 1,
          name: user.fullName,
          title: user.role || 'Professional',
          role: determineRole(user.role),
          avatar: user.avatar || '/placeholder.svg',
          views: user.analytics?.profileViews || Math.floor(Math.random() * 10),
          likes: user.analytics?.profileLikes || 2 + Math.floor(Math.random() * 2),
          engagement: user.analytics?.engagement || Math.floor(Math.random() * 10),
          change: '+' + (Math.floor(Math.random() * 20) + 1) + '%',
          badge: determineBadge(index),
          email: user.email,
          phone: user.phone || 'Not provided',
          location: user.location || 'Not specified',
          experience: user.experience?.length ? `${user.experience.length}+ years experience` : 'Experience not specified',
          skills: user.skills || [],
        }));
        
        // Sort by views (default)
        const sortedData = transformedData.sort((a, b) => b.views - a.views);
        setUsers(sortedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Helper function to determine role category
  const determineRole = (role: string) => {
    if (!role) return 'all';
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes('develop') || lowerRole.includes('engineer') || lowerRole.includes('program')) {
      return 'developer';
    } else if (lowerRole.includes('design')) {
      return 'designer';
    } else if (lowerRole.includes('manager') || lowerRole.includes('director') || lowerRole.includes('lead')) {
      return 'manager';
    }
    return 'all';
  };

  // Helper function to assign badges
  const determineBadge = (index: number) => {
    if (index === 0) return 'top-performer';
    if (index === 1) return 'rising-star';
    if (index === 2) return 'consistent';
    if (index === 4) return 'fast-climber';
    return null;
  };

  // Replace leaderboardData with users
  const filteredData = users.filter(item => 
    roleFilter === 'all' || item.role === roleFilter
  );

  // const getRankIcon = (rank: number) => {
  //   switch (rank) {
  //     case 1:
  //       return <Crown className="w-6 h-6 text-yellow-500" />;
  //     case 2:
  //       return <Medal className="w-6 h-6 text-gray-400" />;
  //     case 3:
  //       return <Award className="w-6 h-6 text-amber-600" />;
  //     default:
  //       return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  //   }
  // };

  // const getBadgeColor = (badge: string | null) => {
  //   switch (badge) {
  //     case 'top-performer':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'rising-star':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'consistent':
  //       return 'bg-green-100 text-green-800';
  //     case 'fast-climber':
  //       return 'bg-purple-100 text-purple-800';
  //     default:
  //       return '';
  //   }
  // };

  const getCurrentValue = (item: {
    views: number;
    likes: number;
    engagement: number;
  }) => {
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

  const ProfileModal = ({ user }: { user: {
    rank: number;
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
  }}) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
                  {/* <Trophy className="w-4 h-4 mr-1 text-yellow-500" /> */}
                  <span className="text-sm font-medium">Rank #{user.rank}</span>
                </div>
                {/* {user.badge && (
                  <Badge className={getBadgeColor(user.badge)}>
                    {user.badge.replace('-', ' ')}
                  </Badge>
                )} */}
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
              <Card className={`border-2 ${item.rank === 1 ? ' shadow-lg' : 'border-gray-200'} hover:shadow-xl transition-all`}>
                <CardContent className="p-6 text-center">
                  {/* <div className="flex justify-center mb-4">
                    {getRankIcon(item.rank)}
                  </div> */}
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-lg">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-xl">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{item.title}</p>
                  {/* {item.badge && (
                    <Badge className={`mb-3 ${getBadgeColor(item.badge)}`}>
                      {item.badge.replace('-', ' ')}
                    </Badge>
                  )} */}
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
                  {/* <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {getRankIcon(item.rank)}
                  </div> */}
                  
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {/* {item.badge && (
                        <Badge className={`text-xs ${getBadgeColor(item.badge)}`}>
                          {item.badge.replace('-', ' ')}
                        </Badge>
                      )} */}
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
