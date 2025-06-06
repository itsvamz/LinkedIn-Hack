
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Briefcase, Star, Play, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { candidatesData } from '../data/candidatesData';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  const skills = ['React', 'Python', 'JavaScript', 'Node.js', 'UI/UX', 'Data Science'];

  const filteredUsers = candidatesData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSkill === '' || user.skills.includes(selectedSkill))
  );

  const PitchModal = ({ user }: { user: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <Play className="w-4 h-4 mr-1" />
          View Pitch
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {user.name}'s Elevator Pitch
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">{user.name}'s Pitch Video</p>
              <p className="text-sm opacity-75">1 minute presentation</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">About this pitch:</h4>
            <p className="text-gray-600 text-sm">
              A personalized 1-minute video showcasing {user.name}'s skills, experience, and passion for {user.role.toLowerCase()}. 
              This pitch highlights their expertise in {user.skills.slice(0, 2).join(' and ')} and their commitment to delivering exceptional results.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AvatarChatModal = ({ user }: { user: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
          <MessageSquare className="w-4 h-4 mr-1" />
          Chat with Avatar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Chat with {user.name}'s Avatar
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-600">{user.role}</p>
              <p className="text-xs text-blue-600">AI Avatar - Ready to answer your questions</p>
            </div>
          </div>
          <div className="h-64 border rounded-lg p-4 bg-gray-50">
            <div className="text-center text-gray-500 mt-20">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Start a conversation with {user.name}'s AI avatar</p>
              <p className="text-xs">Ask about their skills, experience, or project interests</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Ask about their experience with React..." className="flex-1" />
            <Button className="bg-blue-600 hover:bg-blue-700">Send</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Talent
          </h1>
          <p className="text-gray-600">
            Connect with {candidatesData.length}+ professionals ready for new opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search professionals by name, role, or skills"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedSkill === '' ? 'default' : 'outline'}
                onClick={() => setSelectedSkill('')}
                size="sm"
                className={selectedSkill === '' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                All Skills
              </Button>
              {skills.map(skill => (
                <Button
                  key={skill}
                  variant={selectedSkill === skill ? 'default' : 'outline'}
                  onClick={() => setSelectedSkill(skill)}
                  size="sm"
                  className={selectedSkill === skill ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {/* User Header */}
                  <div className="flex items-center mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-blue-600 font-medium">{user.role}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {user.location}
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {user.experience}
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {user.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {user.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* About */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {user.about}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        View Profile
                      </Button>
                      <Button variant="outline" size="icon">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <PitchModal user={user} />
                      <AvatarChatModal user={user} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
