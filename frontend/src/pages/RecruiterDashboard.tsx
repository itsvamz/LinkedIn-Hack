
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Users, MessageSquare, Calendar, Bookmark, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PitchCarousel from '@/components/recruiter/PitchCarousel';
import AvatarChatMode from '@/components/recruiter/AvatarChatMode';
import CandidatePreview from '@/components/recruiter/CandidatePreview';
import EngagementTools from '@/components/recruiter/EngagementTools';
import FilterPanel from '@/components/recruiter/FilterPanel';
import DashboardOverview from '@/components/recruiter/DashboardOverview';

const RecruiterDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const stats = [
    { title: 'Total Candidates', value: '1,247', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Shortlisted', value: '89', icon: Star, color: 'from-emerald-500 to-emerald-600' },
    { title: 'Interviews Scheduled', value: '12', icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { title: 'Bookmarked', value: '156', icon: Bookmark, color: 'from-orange-500 to-orange-600' },
  ];

  const handleModeSelect = (mode: string) => {
    setActiveView(mode);
  };

  const handleBackToOverview = () => {
    setActiveView('overview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Recruiter Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Discover, engage, and hire top talent efficiently</p>
            </div>
            {activeView !== 'overview' && (
              <Button
                onClick={handleBackToOverview}
                variant="outline"
                className="border-violet-200 text-violet-600 hover:bg-violet-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Overview
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats Grid - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="border-violet-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeView === 'overview' ? (
            <DashboardOverview onModeSelect={handleModeSelect} activeMode={activeView} />
          ) : (
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="carousel">Pitch Carousel</TabsTrigger>
                  <TabsTrigger value="chat">Avatar Chat</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                </TabsList>
                
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="border-violet-200 text-violet-600 hover:bg-violet-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <FilterPanel />
                </motion.div>
              )}

              {/* Tab Content */}
              <TabsContent value="carousel" className="mt-0">
                <PitchCarousel onCandidateSelect={setSelectedCandidate} />
              </TabsContent>

              <TabsContent value="chat" className="mt-0">
                <AvatarChatMode candidate={selectedCandidate} />
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <CandidatePreview candidate={selectedCandidate} />
              </TabsContent>

              <TabsContent value="tools" className="mt-0">
                <EngagementTools />
              </TabsContent>
            </Tabs>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
