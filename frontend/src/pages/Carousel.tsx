
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Eye, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Featured profiles data
  const featuredProfiles = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior UX Designer',
      company: 'Tech Innovations Inc.',
      avatar: '/placeholder.svg',
      video: '/pitch-video-1.mp4',
      description: 'Passionate about creating user-centered designs that drive business results. I specialize in design systems, user research, and cross-functional collaboration.',
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Design Systems'],
      rating: 4.9,
      views: 2450,
      likes: 189,
      featured: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      avatar: '/placeholder.svg',
      video: '/pitch-video-2.mp4',
      description: 'Building scalable web applications with modern technologies. Experienced in React, Node.js, and cloud architecture with a focus on performance optimization.',
      skills: ['React', 'Node.js', 'AWS', 'Python'],
      rating: 4.8,
      views: 1980,
      likes: 145,
      featured: true
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      company: 'Global Solutions Ltd.',
      avatar: '/placeholder.svg',
      video: '/pitch-video-3.mp4',
      description: 'Strategic product leader with 6+ years of experience launching successful digital products. Expert in data-driven decision making and cross-team coordination.',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'Leadership'],
      rating: 4.9,
      views: 2340,
      likes: 167,
      featured: true
    },
    {
      id: '4',
      name: 'David Park',
      title: 'Data Scientist',
      company: 'AI Innovations',
      avatar: '/placeholder.svg',
      video: '/pitch-video-4.mp4',
      description: 'Transforming complex data into actionable insights. Specialized in machine learning, predictive analytics, and building data-driven solutions.',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      rating: 4.7,
      views: 1750,
      likes: 128,
      featured: true
    },
    {
      id: '5',
      name: 'Lisa Wang',
      title: 'Marketing Director',
      company: 'Brand Builders',
      avatar: '/placeholder.svg',
      video: '/pitch-video-5.mp4',
      description: 'Creative marketing strategist with expertise in digital campaigns, brand development, and growth marketing. Proven track record of driving 200%+ growth.',
      skills: ['Digital Marketing', 'Brand Strategy', 'SEO', 'Analytics'],
      rating: 4.8,
      views: 2100,
      likes: 156,
      featured: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProfiles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProfiles.length) % featuredProfiles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const currentProfile = featuredProfiles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Talent Carousel
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover exceptional professionals through their personal pitch presentations
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-8">
          <Card className="border-violet-100 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 md:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 flex items-center"
                  >
                    {/* Video Placeholder */}
                    <div className="w-full md:w-1/2 h-full bg-black bg-opacity-50 flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-opacity-30 transition-all cursor-pointer">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <p className="text-white text-sm">Watch Pitch Video</p>
                      </div>
                      {currentProfile.featured && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500 text-yellow-900">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 text-white">
                      <div className="flex items-center mb-6">
                        <Avatar className="w-16 h-16 mr-4 border-4 border-white">
                          <AvatarImage src={currentProfile.avatar} alt={currentProfile.name} />
                          <AvatarFallback className="bg-violet-500 text-white text-lg">
                            {currentProfile.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold">{currentProfile.name}</h2>
                          <p className="text-violet-200 text-lg">{currentProfile.title}</p>
                          <p className="text-violet-300 text-sm">{currentProfile.company}</p>
                        </div>
                      </div>

                      <p className="text-violet-100 mb-6 leading-relaxed">
                        {currentProfile.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {currentProfile.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-300" />
                          <span className="text-sm">{currentProfile.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span className="text-sm">{currentProfile.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          <span className="text-sm">{currentProfile.likes}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button className="bg-white text-violet-600 hover:bg-violet-50">
                          View Full Profile
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white hover:bg-opacity-30 w-12 h-12"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white hover:bg-opacity-30 w-12 h-12"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              {isAutoPlay ? 'Pause' : 'Play'} Auto
            </Button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {featuredProfiles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-violet-600 w-8'
                      : 'bg-violet-300 hover:bg-violet-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {featuredProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-violet-500 shadow-lg'
                    : 'hover:shadow-md border-violet-100'
                }`}
                onClick={() => goToSlide(index)}
              >
                <CardContent className="p-4">
                  <Avatar className="w-12 h-12 mx-auto mb-2">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-violet-500 text-white">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="text-sm font-medium text-center text-gray-900 mb-1">
                    {profile.name}
                  </h4>
                  <p className="text-xs text-violet-600 text-center">
                    {profile.title}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
