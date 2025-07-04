import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase, BarChart3, LogOut, ArrowLeft, Users, Video, MessageSquare, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface RecruiterSidebarProps {
  activeSection: string;
  onSectionChange: (section: 'profile' | 'avatar' | 'overview' | 'jobs' | 'candidates' | 'messaging' | 'analytics' | 'settings') => void;
  recruiterData?: any; // Add this prop
}

const RecruiterSidebar = ({ activeSection, onSectionChange, recruiterData }: RecruiterSidebarProps) => {
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'avatar', label: 'Avatar', icon: Video },
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: User },
    { id: 'messaging', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/';
  };
  
  // Get user name from localStorage
  // Use recruiterData for name if available, otherwise fallback to localStorage
  const userName = recruiterData?.fullName || localStorage.getItem("userName") || "Recruiter";
  
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-black shadow-lg border-r border-gray-200 dark:border-gray-700 z-40"
    >
      <div className="p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-8">
          <ArrowLeft className="w-4 h-4 mr-2 text-blue-600" />
          <div className="text-center">
            <span className="text-xl font-bold text-blue-600">
              AVIRI
            </span>
          </div>
        </Link>

        {/* User Profile */}
        <div className="flex items-center mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Avatar className="w-12 h-12 mr-3">
            <AvatarImage src={recruiterData?.avatar || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback className="bg-blue-600 text-white">
              {userName.split(" ").map(name => name[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{userName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Talent Acquisition</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id as 'profile' | 'avatar' | 'overview' | 'jobs' | 'candidates' | 'messaging' | 'analytics' | 'settings')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default RecruiterSidebar;
