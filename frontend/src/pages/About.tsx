
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Users, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Replace your existing handleContactSubmit function with this simple version:

// Replace your existing handleContactSubmit function with this simple version:

const handleContactSubmit = (e) => {
  e.preventDefault();
  
  // Create the email subject and body
  const subject = encodeURIComponent(contactForm.subject || 'Contact Form Submission from AVIRI Website');
  const body = encodeURIComponent(
    `Hi,\n\n` +
    `You have received a new message from your AVIRI website contact form:\n\n` +
    `Name: ${contactForm.fullName}\n` +
    `Email: ${contactForm.email}\n` +
    `Subject: ${contactForm.subject}\n\n` +
    `Message:\n${contactForm.message}\n\n` +
    `Best regards,\n${contactForm.fullName}`
  );
  
  // Create mailto link with multiple recipients
  const mailtoLink = `mailto:abhipriya.kurasa@gmail.com, vamika.mendiratta1304@gmail.com?subject=${subject}&body=${body}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Show success popup
  alert('Email client opened successfully! Please send the email from your email application.');
  
  // Reset form after showing popup
  setContactForm({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
};
  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const teamMembers = [
    {
      name: 'Vamika Mendiratta',
      role: 'Project Ideator & AI Developer',
      description: 'Designed Project Vision and Built AI Models for automated chatbots, pitch script generation and resume parsing',
      avatar: 'https://ik.imagekit.io/abhiPriyaDarshini/image(3).png?updatedAt=1750614749804'
    },
    {
      name: 'Manaswi Singh',
      role: 'AI Developer',
      description: 'Built a pipeline to generate talking avatar videos including voice synthesis, face detection, background cleanup and avatar animation.',
      avatar: 'https://ik.imagekit.io/abhiPriyaDarshini/image.png?updatedAt=1750614749233'
    },
    {
      name: 'Abhi Priya Darshini Kurasa',
      role: 'Frontend-Backend Integration, Authentication & DB Specialist',
      description: 'Focused on connecting frontend with backend, managing authentication, database interactions, and recruiter-user recommendations.',
      avatar: 'https://ik.imagekit.io/abhiPriyaDarshini/profilePic.jpg?updatedAt=1750613384506'
    },
    {
      name: 'Shreya Dubey',
      role: 'Frontend Development and Multilingual AI Integration',
      description: 'frontend development and seamless integration of multilingual AI systems',
      avatar: 'https://ik.imagekit.io/abhiPriyaDarshini/image(1).png?updatedAt=1750614749975'
    },
    {
      name: 'Ruchi Fatehchandani',
      role: 'Backend Development',
      description: 'Oversees backend architecture and is in charge of developing AI models for analyzing pitch videos and generating insights from user profiles',
      avatar: 'https://ik.imagekit.io/abhiPriyaDarshini/image(2).png?updatedAt=1750614745207'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI algorithms match candidates with perfect opportunities based on skills, experience, and culture fit.'
    },
    {
      icon: Target,
      title: 'Interactive Pitch Videos',
      description: 'Candidates can create compelling 1-minute pitch videos to showcase their personality and skills beyond traditional resumes.'
    },
    {
      icon: Zap,
      title: 'Real-time Communication',
      description: 'Seamless communication tools enable instant connections between recruiters and candidates.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              About AVIRI
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Authentic Virtual Identity Recruitment Interface - Revolutionizing the way talent connects with opportunity through cutting-edge AI technology and innovative recruitment solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We believe that every professional deserves the opportunity to showcase their unique talents, and every organization deserves to find the perfect fit for their team. Through innovative technology and human-centered design, we're building the future of recruitment.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team MARVS</h2>
              <p className="text-lg text-gray-600">
                Passionate innovators dedicated to transforming the recruitment landscape
              </p>
            </motion.div>

            {/* Single Row Team Layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="h-full border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                      <h4 className="text-sm font-medium text-blue-600 mb-3">{member.role}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600">
                Have questions or want to learn more? We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">contact@aviri.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">+91 XXXXXXXXXX</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">LinkedIn Hackathon, India</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM IST</p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          required
                          value={contactForm.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter subject"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
