
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, User, Settings, LogOut, BarChart3, Eye, Play, Bookmark, Edit3, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardSidebar from '@/components/DashboardSidebar';
import ProfileCreation from '@/components/ProfileCreation';
import AvatarCustomization from '@/components/AvatarCustomization';
import ElevatorPitch from '@/components/ElevatorPitch';
import ProfileAnalytics from '@/components/ProfileAnalytics';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'pitch' | 'analytics' | 'settings'>('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileCreation />;
      case 'avatar':
        return <AvatarCustomization />;
      case 'pitch':
        return <ElevatorPitch />;
      case 'analytics':
        return <ProfileAnalytics />;
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        );
      default:
        return <ProfileCreation />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="flex">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 p-6 ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome back, Sarah!
              </h1>
              <p className="text-gray-600">Manage your profile and track your career journey</p>
            </div>

            {/* Content */}
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
