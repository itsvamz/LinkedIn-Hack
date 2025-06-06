
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, TrendingUp, Heart, Globe, Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const stats = [
    { label: 'Active Professionals', value: '10,000+', icon: Users },
    { label: 'Successful Matches', value: '2,500+', icon: Target },
    { label: 'Partner Companies', value: '500+', icon: Award },
    { label: 'Platform Growth', value: '200%', icon: TrendingUp },
  ];

  const teamMembers = [
    {
      name: 'Alex Rivera',
      role: 'CEO & Founder',
      bio: 'Former tech executive with 15+ years in talent acquisition and product development.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'AI and machine learning expert, previously at Google and Microsoft.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Talent',
      bio: 'Experienced recruiter and HR leader with expertise in tech talent acquisition.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Emma Davis',
      role: 'VP of Product',
      bio: 'Product strategist focused on creating exceptional user experiences.',
      avatar: '/placeholder.svg'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Human-Centered',
      description: 'We believe every professional has a unique story worth telling.'
    },
    {
      icon: Globe,
      title: 'Inclusive',
      description: 'Creating opportunities for talent from all backgrounds and experiences.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation-Driven',
      description: 'Constantly evolving our platform with cutting-edge technology.'
    },
    {
      icon: Target,
      title: 'Results-Focused',
      description: 'Committed to successful matches that benefit both talent and companies.'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'contact@talentflow.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm PST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'San Francisco, CA',
      description: '123 Innovation Drive, Suite 400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="about">About TalentFlow</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About TalentFlow
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing how talent connects with opportunity through innovative pitch presentations, 
                AI-powered matching, and comprehensive professional showcasing.
              </p>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <Card className="border-gray-200 shadow-lg">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                    To bridge the gap between exceptional talent and forward-thinking companies by providing 
                    a platform where professionals can authentically showcase their skills, personality, and 
                    potential through engaging pitch presentations and comprehensive profiles.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Platform Impact
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="border-gray-200 hover:shadow-lg transition-all text-center">
                        <CardContent className="p-6">
                          <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Card className="border-gray-200 hover:shadow-lg transition-all h-full">
                        <CardContent className="p-6 text-center">
                          <Icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            {value.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {value.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Meet Our Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="border-gray-200 hover:shadow-lg transition-all">
                      <CardContent className="p-6 text-center">
                        <Avatar className="w-20 h-20 mx-auto mb-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-blue-600 text-white text-lg">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-3">
                          {member.role}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Send className="w-5 h-5 mr-2 text-blue-600" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            className="focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                          className="focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your inquiry..."
                          required
                          rows={6}
                          className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <motion.div
                          key={info.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{info.title}</h3>
                            <p className="text-blue-600 font-medium">{info.value}</p>
                            <p className="text-sm text-gray-600">{info.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle>Office Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="font-medium">8:00 AM - 6:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default About;
