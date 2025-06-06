
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Video, FileText, BarChart3, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface UserSidebarProps {
  activeSection: string;
  onSectionChange: (section: 'profile' | 'avatar' | 'pitch' | 'analytics' | 'settings') => void;
}

const UserSidebar = ({ activeSection, onSectionChange }: UserSidebarProps) => {
  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'avatar', label: 'Avatar', icon: Video },
    { id: 'pitch', label: 'Pitch', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/';
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40"
    >
      <div className="p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-8">
          <ArrowLeft className="w-4 h-4 mr-2 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">
            TalentFlow
          </span>
        </Link>

        {/* User Profile */}
        <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
          <Avatar className="w-12 h-12 mr-3">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-600">Software Developer</p>
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
                onClick={() => onSectionChange(item.id as any)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
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
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default UserSidebar;
