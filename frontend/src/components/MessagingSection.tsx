
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search } from 'lucide-react';

const MessagingSection = () => {
  const [activeTab, setActiveTab] = useState('sent');
  const [messageText, setMessageText] = useState('');

  const sentMessages = [
    {
      id: 1,
      recruiter: 'Tech Corp Recruiter',
      company: 'Tech Corp',
      avatar: '/placeholder.svg',
      lastMessage: 'Thank you for considering me for the Senior Developer position...',
      timestamp: '1 hour ago',
      status: 'read'
    },
    {
      id: 2,
      recruiter: 'StartupXYZ HR',
      company: 'StartupXYZ',
      avatar: '/placeholder.svg',
      lastMessage: 'I am very interested in the Frontend Developer role...',
      timestamp: '2 days ago',
      status: 'unread'
    }
  ];

  const receivedMessages = [
    {
      id: 1,
      recruiter: 'Jane Smith',
      company: 'Innovation Labs',
      avatar: '/placeholder.svg',
      lastMessage: 'Hi! I came across your profile and would love to discuss...',
      timestamp: '45 minutes ago',
      status: 'unread'
    },
    {
      id: 2,
      recruiter: 'Robert Kim',
      company: 'Global Solutions',
      avatar: '/placeholder.svg',
      lastMessage: 'We have an exciting opportunity that matches your skills...',
      timestamp: '4 hours ago',
      status: 'read'
    }
  ];

  const MessageList = ({ messages }: { messages: any[] }) => (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={message.avatar} />
                <AvatarFallback className="bg-blue-600 text-white">
                  {message.recruiter.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{message.recruiter}</h4>
                    <p className="text-xs text-gray-500">{message.company}</p>
                  </div>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">{message.lastMessage}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    message.status === 'unread' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.status}
                  </span>
                  <Button variant="outline" size="sm">Reply</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages</h2>
          <p className="text-gray-600">Manage your conversations with recruiters</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            New Message
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="sent">Sent to Recruiters</TabsTrigger>
            <TabsTrigger value="received">Received from Recruiters</TabsTrigger>
          </TabsList>

          <TabsContent value="sent" className="mt-6">
            <MessageList messages={sentMessages} />
          </TabsContent>

          <TabsContent value="received" className="mt-6">
            <MessageList messages={receivedMessages} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MessagingSection;
