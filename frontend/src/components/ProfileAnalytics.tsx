
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Play, Bookmark, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileAnalytics = () => {
  const metrics = [
    {
      title: 'Profile Views',
      value: '1,247',
      change: '+12%',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    {
      title: 'Pitch Plays',
      value: '89',
      change: '+8%',
      icon: Play,
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    {
      title: 'Bookmarks',
      value: '156',
      change: '+23%',
      icon: Bookmark,
      color: 'from-purple-500 to-violet-500',
      trend: 'up'
    },
    {
      title: 'Recruiter Interest',
      value: '94%',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-orange-500 to-pink-500',
      trend: 'up'
    }
  ];

  const recentActivity = [
    {
      action: 'Profile viewed by Senior Recruiter at TechCorp',
      time: '2 hours ago',
      type: 'view'
    },
    {
      action: 'Pitch video played by HR Manager at StartupXYZ',
      time: '4 hours ago',
      type: 'play'
    },
    {
      action: 'Profile bookmarked by Talent Acquisition Lead',
      time: '1 day ago',
      type: 'bookmark'
    },
    {
      action: 'Profile shared in recruiting team',
      time: '2 days ago',
      type: 'share'
    }
  ];

  const viewsByDay = [
    { day: 'Mon', views: 45 },
    { day: 'Tue', views: 67 },
    { day: 'Wed', views: 89 },
    { day: 'Thu', views: 156 },
    { day: 'Fri', views: 178 },
    { day: 'Sat', views: 134 },
    { day: 'Sun', views: 98 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-violet-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.change} from last week
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-r ${metric.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <Card className="border-violet-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-violet-600" />
              Profile Views This Week
            </CardTitle>
            <CardDescription>
              Daily breakdown of profile views
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {viewsByDay.map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.views / 200) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="w-full bg-gradient-to-t from-violet-500 to-purple-500 rounded-t-sm min-h-[4px]"
                  />
                  <span className="text-xs text-gray-600 mt-2">{day.day}</span>
                  <span className="text-xs font-medium text-gray-900">{day.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-violet-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-violet-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest interactions with your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-violet-50 rounded-lg"
                >
                  <div className={`p-2 rounded-full ${
                    activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'play' ? 'bg-green-100 text-green-600' :
                    activity.type === 'bookmark' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {activity.type === 'view' && <Eye className="w-4 h-4" />}
                    {activity.type === 'play' && <Play className="w-4 h-4" />}
                    {activity.type === 'bookmark' && <Bookmark className="w-4 h-4" />}
                    {activity.type === 'share' && <Users className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Strength */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle>Profile Strength</CardTitle>
          <CardDescription>
            Complete these sections to increase your profile visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-sm font-medium">Basic Info</p>
                <p className="text-xs text-gray-600">Complete</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-sm font-medium">Elevator Pitch</p>
                <p className="text-xs text-gray-600">Complete</p>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <p className="text-sm font-medium">Skills Assessment</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileAnalytics;
