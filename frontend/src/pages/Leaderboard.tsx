
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Eye, Heart, Award, Crown, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month');
  const [category, setCategory] = useState<'views' | 'likes' | 'engagement'>('views');

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      title: 'Senior UX Designer',
      avatar: '/placeholder.svg',
      views: 2450,
      likes: 189,
      engagement: 92.5,
      change: '+15%',
      badge: 'top-performer'
    },
    {
      rank: 2,
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      avatar: '/placeholder.svg',
      views: 2340,
      likes: 167,
      engagement: 88.3,
      change: '+8%',
      badge: 'rising-star'
    },
    {
      rank: 3,
      name: 'Michael Chen',
      title: 'Full Stack Developer',
      avatar: '/placeholder.svg',
      views: 2180,
      likes: 145,
      engagement: 85.7,
      change: '+12%',
      badge: 'consistent'
    },
    {
      rank: 4,
      name: 'Lisa Wang',
      title: 'Marketing Director',
      avatar: '/placeholder.svg',
      views: 1980,
      likes: 134,
      engagement: 82.1,
      change: '+5%',
      badge: null
    },
    {
      rank: 5,
      name: 'David Park',
      title: 'Data Scientist',
      avatar: '/placeholder.svg',
      views: 1850,
      likes: 128,
      engagement: 79.8,
      change: '+18%',
      badge: 'fast-climber'
    },
    {
      rank: 6,
      name: 'Alex Thompson',
      title: 'DevOps Engineer',
      avatar: '/placeholder.svg',
      views: 1720,
      likes: 115,
      engagement: 76.5,
      change: '+3%',
      badge: null
    },
    {
      rank: 7,
      name: 'Jessica Liu',
      title: 'Frontend Developer',
      avatar: '/placeholder.svg',
      views: 1650,
      likes: 108,
      engagement: 74.2,
      change: '+7%',
      badge: null
    },
    {
      rank: 8,
      name: 'Ryan Mitchell',
      title: 'Backend Developer',
      avatar: '/placeholder.svg',
      views: 1580,
      likes: 102,
      engagement: 71.9,
      change: '+10%',
      badge: null
    }
  ];

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

  const getBadgeColor = (badge: string | null) => {
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

  const getCurrentValue = (item: any) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Talent Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the top-performing professionals on our platform
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Timeframe Selector */}
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Timeframe:</span>
                <div className="flex bg-violet-50 rounded-lg p-1">
                  {['week', 'month', 'all'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setTimeframe(option as any)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        timeframe === option
                          ? 'bg-white text-violet-700 shadow-sm'
                          : 'text-violet-600 hover:text-violet-700'
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
                <div className="flex bg-violet-50 rounded-lg p-1">
                  {[
                    { key: 'views', label: 'Views', icon: Eye },
                    { key: 'likes', label: 'Likes', icon: Heart },
                    { key: 'engagement', label: 'Engagement', icon: TrendingUp }
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.key}
                        onClick={() => setCategory(option.key as any)}
                        className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          category === option.key
                            ? 'bg-white text-violet-700 shadow-sm'
                            : 'text-violet-600 hover:text-violet-700'
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
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboardData.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
            >
              <Card className={`border-2 ${item.rank === 1 ? 'border-yellow-300 shadow-lg' : 'border-violet-100'} hover:shadow-xl transition-all`}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {getRankIcon(item.rank)}
                  </div>
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-lg">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback className="bg-violet-500 text-white text-xl">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-violet-600 font-medium mb-3">{item.title}</p>
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
        <Card className="border-violet-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-violet-600" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {leaderboardData.map((item, index) => (
                <motion.div
                  key={item.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center p-4 border-b border-gray-100 hover:bg-violet-50 transition-colors ${
                    item.rank <= 3 ? 'bg-gradient-to-r from-violet-25 to-transparent' : ''
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {getRankIcon(item.rank)}
                  </div>
                  
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback className="bg-violet-500 text-white">
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
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                  >
                    View Profile
                  </Button>
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
