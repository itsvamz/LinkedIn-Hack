
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, TrendingUp, Heart, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const About = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-6">
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
          <Card className="border-violet-100 shadow-lg">
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
                  <Card className="border-violet-100 hover:shadow-lg transition-all text-center">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-violet-600 mx-auto mb-3" />
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
                  <Card className="border-violet-100 hover:shadow-lg transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-10 h-10 text-violet-600 mx-auto mb-4" />
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
          className="mb-16"
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
                <Card className="border-violet-100 hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-violet-500 text-white text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-violet-600 font-medium mb-3">
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

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="border-violet-100 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  TalentFlow was born from the frustration of seeing incredible talent go unnoticed due to 
                  traditional recruiting limitations. Founded in 2023, we recognized that resumes and cover 
                  letters couldn't capture the full potential of today's professionals.
                </p>
                <p className="mb-6">
                  Our founders, coming from backgrounds in technology, recruiting, and product development, 
                  envisioned a platform where personality, communication skills, and authentic passion could 
                  shine through. We believed that the future of recruitment lay in giving candidates the 
                  tools to tell their own stories.
                </p>
                <p className="mb-6">
                  Today, TalentFlow has evolved into a comprehensive platform that serves both job seekers 
                  and recruiters. We've helped thousands of professionals land their dream jobs while 
                  enabling companies to discover talent that would have been overlooked by traditional 
                  hiring methods.
                </p>
                <p>
                  As we continue to grow, our commitment remains the same: empowering every professional 
                  to showcase their unique value and helping companies build diverse, talented teams that 
                  drive innovation and success.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
