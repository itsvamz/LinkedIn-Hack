import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Play, Heart, X, Bookmark, MessageSquare, Calendar, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

interface PitchCarouselProps {
  onCandidateSelect: (candidate: any) => void;
  isRecruiterDashboard?: boolean;
}

const PitchCarousel: React.FC<PitchCarouselProps> = ({ onCandidateSelect, isRecruiterDashboard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notes, setNotes] = useState<{[key: string]: string}>({});
  const [actions, setActions] = useState<{[key: string]: 'shortlist' | 'reject' | 'bookmark' | null}>({});
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [likes, setLikes] = useState<{[key: string]: number}>({});
  const [bookmarks, setBookmarks] = useState<{[key: string]: boolean}>({});
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        setUserRole(role || "");

        // If we're on the recruiter dashboard, only fetch bookmarked candidates
        if (isRecruiterDashboard && role === "recruiter") {
          const bookmarksRes = await axios.get("http://localhost:5000/api/recruiter/bookmarked", {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const transformedData = bookmarksRes.data.map((user: any) => ({
            id: user._id,
            name: user.fullName,
            role: user.role || 'Professional',
            experience: user.experience?.length ? `${user.experience.length}+ years` : '1+ years',
            avatar: user.avatar || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
            skills: user.skills || ['React', 'JavaScript'],
            email: user.email,
            phone: user.phone || 'Not provided',
            location: user.location || 'Remote',
            profileLikes: user.profileLikes || 0
          }));
          
          setCandidates(transformedData);
          setVisibleCards(new Set(transformedData.map((c: any) => c.id)));
          
          // Initialize likes
          const initialLikes: {[key: string]: number} = {};
          transformedData.forEach((user: any) => {
            initialLikes[user.id] = user.profileLikes || 0;
          });
          setLikes(initialLikes);
          
          // Set all candidates as bookmarked
          const bookmarkedMap: {[key: string]: boolean} = {};
          transformedData.forEach((candidate: any) => {
            bookmarkedMap[candidate.id] = true;
          });
          setBookmarks(bookmarkedMap);
        } else {
          // Original code for fetching all users
          const res = await axios.get("http://localhost:5000/api/user/all", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          const transformedData = res.data.map((user: any) => ({
            id: user._id,
            name: user.fullName,
            role: user.role || 'Professional',
            experience: user.experience?.length ? `${user.experience.length}+ years` : '1+ years',
            avatar: user.avatar || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
            skills: user.skills || ['React', 'JavaScript'],
            email: user.email,
            phone: user.phone || 'Not provided',
            location: user.location || 'Remote',
            profileLikes: user.profileLikes || 0
          }));
          
          setCandidates(transformedData);
          setVisibleCards(new Set(transformedData.map((c: any) => c.id)));
          
          // Initialize likes
          const initialLikes: {[key: string]: number} = {};
          transformedData.forEach((user: any) => {
            initialLikes[user.id] = user.profileLikes || 0;
          });
          setLikes(initialLikes);

          if (role === "recruiter") {
            const bookmarksRes = await axios.get("http://localhost:5000/api/recruiter/bookmarked", {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            const bookmarkedMap: {[key: string]: boolean} = {};
            bookmarksRes.data.forEach((candidate: any) => {
              bookmarkedMap[candidate._id] = true;
            });
            setBookmarks(bookmarkedMap);
          }
        }

        setLoading(false);
        
        if (transformedData && transformedData.length > 0) {
          onCandidateSelect(transformedData[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [onCandidateSelect, isRecruiterDashboard]);

  const handleAction = (candidateId: string, action: 'shortlist' | 'reject' | 'bookmark') => {
    setActions(prev => ({ ...prev, [candidateId]: action }));
    onCandidateSelect(candidates[currentIndex]);
    
    if (action === 'reject') {
      setVisibleCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(candidateId);
        return newSet;
      });
    }
  };

  const handleLike = async (candidateId: string) => {
    try {
      setLikes(prev => ({
        ...prev,
        [candidateId]: (prev[candidateId] || 0) + 1
      }));
  
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/user/analytics/${candidateId}`, {
        type: 'profileLike'  // Changed from action: 'like' to match backend expectation
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error liking profile:", error);
      setLikes(prev => ({
        ...prev,
        [candidateId]: Math.max((prev[candidateId] || 0) - 1, 0)
      }));
    }
  };

  const handleBookmark = async (candidateId: string) => {
    try {
      setBookmarks(prev => ({
        ...prev,
        [candidateId]: !prev[candidateId]
      }));

      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/recruiter/bookmark", {
        candidateId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error bookmarking candidate:", error);
      setBookmarks(prev => ({
        ...prev,
        [candidateId]: !prev[candidateId]
      }));
    }
  };

  const handleNoteChange = (candidateId: string, note: string) => {
    setNotes(prev => ({ ...prev, [candidateId]: note }));
  };

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex;
    setCurrentIndex(activeIndex);
    const visibleCandidates = candidates.filter(c => visibleCards.has(c.id));
    if (visibleCandidates[activeIndex]) {
      onCandidateSelect(visibleCandidates[activeIndex]);
    }
  };

  const visibleCandidates = candidates.filter(candidate => visibleCards.has(candidate.id));

  // Rest of the component remains the same...
  // (Keep all the existing JSX and helper functions)

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
            onSlideChange={handleSlideChange}
            className="h-[600px] rounded-2xl"
          >
            {visibleCandidates.map((candidate, index) => (
              <SwiperSlide key={candidate.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-2xl overflow-hidden relative">
                    {/* X Button */}
                    <button
                      onClick={() => handleAction(candidate.id, 'reject')}
                      className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="relative h-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
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
                            <p className="text-blue-600 font-semibold">{candidate.role}</p>
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

                        {/* Availability Status */}
                        <div className="mb-4">
                          <Badge className="bg-green-100 text-green-700 border-0">
                            <Clock className="w-3 h-3 mr-1" />
                            {"Available Now"}
                          </Badge>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} className="bg-blue-100 text-blue-700">
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
          <Card className="border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notes</h3>
              <Textarea
                placeholder="Add your notes about this candidate..."
                value={notes[visibleCandidates[currentIndex]?.id] || ''}
                onChange={(e) => handleNoteChange(visibleCandidates[currentIndex]?.id, e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <Button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-blue-700">
                Save Notes
              </Button>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
     
  );
};

export default PitchCarousel;
