
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
      id: 'carousel',
      title: 'Pitch Carousel',
      description: 'Swipeable Netflix/Tinder-style pitch cards with filters',
      icon: Play,
      color: 'from-violet-500 to-purple-600',
      features: ['Role Filters', 'Skills Filters', 'Location Filters', 'Experience Filters', 'Shortlist/Reject/Bookmark', 'Write Notes']
    },
    {
      id: 'chat',
      title: 'Avatar Chat Mode',
      description: 'Interactive avatar with scripted or AI-predicted Q&A',
      icon: MessageSquare,
      color: 'from-emerald-500 to-teal-600',
      features: ['FAQ Responses', 'Skills Discussion', 'Availability Check', 'Project Reviews']
    },
    {
      id: 'preview',
      title: 'Candidate Preview',
      description: 'View full profile with resume, skills, and work history',
      icon: User,
      color: 'from-blue-500 to-indigo-600',
      features: ['Full Resume', 'Skills Matrix', 'Work History', 'Contact Info', 'Portfolio']
    },
    {
      id: 'tools',
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Recruitment Hub</h2>
        <p className="text-gray-600 text-lg">Choose a mode to start discovering and engaging with top talent</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-violet-100 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-emerald-600 font-medium">{stat.change}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className={`border-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
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
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <p className="text-gray-600">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-1">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
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
        className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="border-violet-200 text-violet-600">
            View All Candidates
          </Button>
          <Button variant="outline" className="border-violet-200 text-violet-600">
            Schedule Interview
          </Button>
          <Button variant="outline" className="border-violet-200 text-violet-600">
            Send Bulk Message
          </Button>
          <Button variant="outline" className="border-violet-200 text-violet-600">
            Export Shortlist
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
