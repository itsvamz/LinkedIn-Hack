
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Image, Mic, BarChart3, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: 'profile' | 'avatar' | 'pitch' | 'analytics' | 'settings') => void;
}

const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  const menuItems = [
    { id: 'profile', label: 'Smart Profile', icon: User },
    { id: 'avatar', label: 'Avatar', icon: Image },
    { id: 'pitch', label: 'Elevator Pitch', icon: Mic },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
    window.location.href = '/';
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-violet-100 z-40"
    >
      <div className="p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-8">
          <ArrowLeft className="w-4 h-4 mr-2 text-violet-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            TalentFlow
          </span>
        </Link>

        {/* User Profile */}
        <div className="flex items-center mb-8 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
          <Avatar className="w-12 h-12 mr-3">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-violet-500 text-white">SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
            <p className="text-sm text-gray-600">UX Designer</p>
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
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
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
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
