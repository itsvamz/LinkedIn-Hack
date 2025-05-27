
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Star, Calendar, MessageSquare, Mail, Phone, Video, Clock, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EngagementTools = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [interviewDate, setInterviewDate] = useState('');

  const savedCandidates = [
    { id: '1', name: 'Sarah Johnson', role: 'UX Designer', status: 'shortlisted', lastContact: '2 days ago' },
    { id: '2', name: 'Michael Chen', role: 'Full Stack Developer', status: 'bookmarked', lastContact: '1 week ago' },
    { id: '3', name: 'Emily Rodriguez', role: 'Product Manager', status: 'interview_scheduled', lastContact: 'Today' },
    { id: '4', name: 'David Park', role: 'Data Scientist', status: 'shortlisted', lastContact: '3 days ago' },
  ];

  const interviewSlots = [
    { date: '2024-02-15', time: '10:00 AM', candidate: 'Emily Rodriguez', type: 'Technical Interview' },
    { date: '2024-02-16', time: '2:00 PM', candidate: 'Sarah Johnson', type: 'Culture Fit' },
    { date: '2024-02-17', time: '11:00 AM', candidate: 'Michael Chen', type: 'Portfolio Review' },
  ];

  const messageTemplates = [
    {
      name: 'Initial Interest',
      content: 'Hi [name], I came across your profile and was impressed by your experience in [role]. Would you be interested in discussing a new opportunity?'
    },
    {
      name: 'Interview Invitation',
      content: 'Hi [name], Thank you for your interest! We would like to schedule an interview to discuss the [role] position. When would be a good time for you?'
    },
    {
      name: 'Follow Up',
      content: 'Hi [name], I wanted to follow up on our previous conversation about the [role] position. Do you have any questions or would you like to proceed to the next step?'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'bg-emerald-100 text-emerald-700';
      case 'bookmarked': return 'bg-amber-100 text-amber-700';
      case 'interview_scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'Shortlisted';
      case 'bookmarked': return 'Bookmarked';
      case 'interview_scheduled': return 'Interview Scheduled';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="border-violet-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Profiles</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                <p className="text-3xl font-bold text-gray-900">43</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">78%</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="messaging">Messages</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Saved Candidates */}
          <TabsContent value="saved">
            <Card className="border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Saved Candidates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-violet-600 text-sm">{candidate.role}</p>
                          <p className="text-gray-500 text-xs">Last contact: {candidate.lastContact}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(candidate.status)}>
                          {getStatusText(candidate.status)}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="border-violet-200 text-violet-600">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-violet-200 text-violet-600">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messaging */}
          <TabsContent value="messaging">
            <Card className="border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Message Templates & Bulk Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Templates */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Message Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {messageTemplates.map((template, index) => (
                      <div key={index} className="p-4 border border-violet-200 rounded-lg hover:bg-violet-50 cursor-pointer transition-colors">
                        <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">{template.content}</p>
                        <Button 
                          size="sm" 
                          className="mt-3 bg-gradient-to-r from-violet-600 to-purple-600"
                          onClick={() => setMessageTemplate(template.content)}
                        >
                          Use Template
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compose Message */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Compose Message</h3>
                  <div className="space-y-4">
                    <Input placeholder="Subject line..." />
                    <Textarea 
                      placeholder="Write your message here..."
                      value={messageTemplate}
                      onChange={(e) => setMessageTemplate(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Use [name] and [role] for personalization
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-violet-200 text-violet-600">
                          Save Template
                        </Button>
                        <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
                          <Mail className="w-4 h-4 mr-2" />
                          Send to Selected
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar">
            <Card className="border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Interview Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quick Schedule */}
                  <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Schedule New Interview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
                      <Input type="time" />
                      <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
                        <Video className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>

                  {/* Upcoming Interviews */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
                    <div className="space-y-3">
                      {interviewSlots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-violet-200 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{slot.candidate}</h4>
                              <p className="text-blue-600 text-sm">{slot.type}</p>
                              <p className="text-gray-500 text-xs">{slot.date} at {slot.time}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-blue-200 text-blue-600">
                              <Video className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-200 text-blue-600">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card className="border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recruitment Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-4">Response Rates</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Email Open Rate</span>
                        <span className="font-semibold">84%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reply Rate</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Interview Acceptance</span>
                        <span className="font-semibold">92%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-violet-800 mb-4">Pipeline Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Outreach</span>
                        <span className="font-semibold">245</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Conversations</span>
                        <span className="font-semibold">67</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Interviews Scheduled</span>
                        <span className="font-semibold">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default EngagementTools;
