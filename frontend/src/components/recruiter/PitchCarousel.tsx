
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Play, Heart, X, Bookmark, MessageSquare, Calendar, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { candidatesData } from '@/data/candidatesData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

interface PitchCarouselProps {
  onCandidateSelect: (candidate: any) => void;
}

const PitchCarousel: React.FC<PitchCarouselProps> = ({ onCandidateSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notes, setNotes] = useState<{[key: string]: string}>({});
  const [actions, setActions] = useState<{[key: string]: 'shortlist' | 'reject' | 'bookmark' | null}>({});

  const handleAction = (candidateId: number, action: 'shortlist' | 'reject' | 'bookmark') => {
    setActions(prev => ({ ...prev, [candidateId]: action }));
    onCandidateSelect(candidatesData[currentIndex]);
  };

  const handleNoteChange = (candidateId: number, note: string) => {
    setNotes(prev => ({ ...prev, [candidateId]: note }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Carousel */}
        <div className="lg:col-span-2">
          <Swiper
            modules={[Navigation, Pagination, EffectCards]}
            effect="cards"
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 2,
              rotate: true,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            className="h-[600px] rounded-2xl"
          >
            {candidatesData.map((candidate, index) => (
              <SwiperSlide key={candidate.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-2xl overflow-hidden">
                    <div className="relative h-full bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
                      {/* Header */}
                      <div className="p-6 pb-0">
                        <div className="flex items-center mb-4">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
                            <p className="text-violet-600 font-semibold">{candidate.role}</p>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {candidate.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-yellow-500 mb-1">
                              <Star className="w-4 h-4 mr-1" />
                              <span className="font-semibold">4.8</span>
                            </div>
                            <p className="text-sm text-gray-600">{candidate.experience}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} className="bg-violet-100 text-violet-700">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge className="bg-gray-100 text-gray-600">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Pitch Video */}
                      <div className="px-6 mb-4">
                        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/20 backdrop-blur-sm text-white rounded-full p-6 hover:bg-white/30 transition-all duration-300"
                          >
                            <Play className="w-8 h-8" />
                          </motion.button>
                          <span className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                            1:00
                          </span>
                        </div>
                      </div>

                      {/* About */}
                      <div className="px-6 mb-4">
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                          {candidate.about}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-6 pb-6 mt-auto">
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAction(candidate.id, 'reject')}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <X className="w-5 h-5 mx-auto" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAction(candidate.id, 'bookmark')}
                            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Bookmark className="w-5 h-5 mx-auto" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAction(candidate.id, 'shortlist')}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Heart className="w-5 h-5 mx-auto" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Side Panel - Notes & Actions */}
        <div className="space-y-6">
          {/* Current Candidate Info */}
          <Card className="border-violet-100 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full border-violet-200 text-violet-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-violet-100 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notes</h3>
              <Textarea
                placeholder="Add your notes about this candidate..."
                value={notes[candidatesData[currentIndex]?.id] || ''}
                onChange={(e) => handleNoteChange(candidatesData[currentIndex]?.id, e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <Button className="w-full mt-3 bg-gradient-to-r from-violet-600 to-purple-600">
                Save Notes
              </Button>
            </CardContent>
          </Card>

          {/* Action History */}
          <Card className="border-violet-100 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Actions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-emerald-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Shortlisted Sarah Johnson
                </div>
                <div className="flex items-center text-amber-600">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmarked Michael Chen
                </div>
                <div className="flex items-center text-red-600">
                  <X className="w-4 h-4 mr-2" />
                  Rejected David Park
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PitchCarousel;
