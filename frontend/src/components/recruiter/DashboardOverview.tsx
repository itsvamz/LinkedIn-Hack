
import React from 'react';
import { motion } from 'framer-motion';
import { Play, MessageSquare, User, Settings, Star, Calendar, BarChart3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardOverviewProps {
  onModeSelect: (mode: string) => void;
  activeMode: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onModeSelect, activeMode }) => {
  const features = [
    {
      id: 'candidates',
      title: 'Pitch Carousel',
      description: 'Swipeable Netflix/Tinder-style pitch cards with filters',
      icon: Play,
      color: 'from-violet-500 to-purple-600',
      features: ['Role Filters', 'Skills Filters', 'Location Filters', 'Experience Filters', 'Shortlist/Reject/Bookmark', 'Write Notes']
    },
    {
      id: 'candidates',
      title: 'Avatar Chat Mode',
      description: 'Interactive avatar with scripted or AI-predicted Q&A',
      icon: MessageSquare,
      color: 'from-emerald-500 to-teal-600',
      features: ['FAQ Responses', 'Skills Discussion', 'Availability Check', 'Project Reviews']
    },
    {
      id: 'candidates',
      title: 'Candidate Preview',
      description: 'View full profile with resume, skills, and work history',
      icon: User,
      color: 'from-blue-500 to-indigo-600',
      features: ['Full Resume', 'Skills Matrix', 'Work History', 'Contact Info', 'Portfolio']
    },
    {
      id: 'candidates',
      title: 'Engagement Tools',
      description: 'Save profiles, schedule interviews, and send messages',
      icon: Settings,
      color: 'from-orange-500 to-red-600',
      features: ['Save/Bookmark', 'Schedule Interviews', 'Send Messages', 'Feedback System']
    }
  ];

  const stats = [
    { title: 'Total Candidates', value: '1,247', icon: Users, change: '+12%' },
    { title: 'Shortlisted', value: '89', icon: Star, change: '+8%' },
    { title: 'Interviews Scheduled', value: '12', icon: Calendar, change: '+15%' },
    { title: 'Response Rate', value: '78%', icon: BarChart3, change: '+5%' },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'candidates':
        onModeSelect('candidates');
        break;
      case 'interview':
        onModeSelect('messaging');
        break;
      case 'message':
        onModeSelect('messaging');
        break;
      case 'export':
        console.log('Exporting shortlist...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Your Recruitment Hub</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Choose a mode to start discovering and engaging with top talent</p>
      </motion.div>

      {/* Stats Overview
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-violet-100 dark:border-gray-700 shadow-lg dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-emerald-600 font-medium">{stat.change}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div> */}

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={`${feature.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className={`border-violet-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer dark:bg-gray-900 ${
              activeMode === feature.id ? 'ring-2 ring-violet-500' : ''
            }`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <Button
                    onClick={() => onModeSelect(feature.id)}
                    className={`${
                      activeMode === feature.id 
                        ? 'bg-violet-600 hover:bg-violet-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {activeMode === feature.id ? 'Active' : 'Launch'}
                  </Button>
                </div>
                <CardTitle className="text-xl dark:text-white">{feature.title}</CardTitle>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  <ul className="space-y-1">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400"
            onClick={() => handleQuickAction('candidates')}
          >
            View All Candidates
          </Button>
          <Button
            variant="outline"
            className="border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400"
            onClick={() => handleQuickAction('interview')}
          >
            Schedule Interview
          </Button>
          <Button
            variant="outline"
            className="border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400"
            onClick={() => handleQuickAction('message')}
          >
            Send Bulk Message
          </Button>
          <Button
            variant="outline"
            className="border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400"
            onClick={() => handleQuickAction('export')}
          >
            Export Shortlist
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
