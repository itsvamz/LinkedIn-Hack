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
            profileLikes: user.profileLikes || 0,
            about: user.about || user.bio || 'No description provided.'
          }));
          
          setCandidates(transformedData);
          setVisibleCards(new Set(transformedData.map((c: any) => c.id)));
          
          // Initialize likes
          const initialLikes: {[key: string]: number} = {};
          transformedData.forEach((user: any) => {
            initialLikes[user.id] = user.profileLikes || 0;
          });
          setLikes(initialLikes);
          
          // Set all candidates as bookmarked since they're from bookmarked list
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
            profileLikes: user.profileLikes || 0,
            about: user.about || user.bio || 'No description provided.'
          }));
          
          setCandidates(transformedData);
          setVisibleCards(new Set(transformedData.map((c: any) => c.id)));
          
          // Initialize likes
          const initialLikes: {[key: string]: number} = {};
          transformedData.forEach((user: any) => {
            initialLikes[user.id] = user.profileLikes || 0;
          });
          setLikes(initialLikes);

          // Fetch bookmarks if user is recruiter
          if (role === "recruiter") {
            try {
              const bookmarksRes = await axios.get("http://localhost:5000/api/recruiter/bookmarked", {
                headers: { Authorization: `Bearer ${token}` }
              });
              
              const bookmarkedMap: {[key: string]: boolean} = {};
              bookmarksRes.data.forEach((candidate: any) => {
                bookmarkedMap[candidate._id] = true;
              });
              setBookmarks(bookmarkedMap);
            } catch (error) {
              console.error("Error fetching bookmarks:", error);
            }
          }
        }

        setLoading(false);
        
        // Select first candidate if available
        const finalCandidates = isRecruiterDashboard && role === "recruiter" 
          ? transformedData 
          : transformedData;
          
        if (finalCandidates && finalCandidates.length > 0) {
          onCandidateSelect(finalCandidates[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    
    fetchUsers();

    // Listen for bookmark updates from other components
    const handleBookmarkUpdate = (event: CustomEvent) => {
      const { candidateId, isBookmarked } = event.detail;
      setBookmarks(prev => ({
        ...prev,
        [candidateId]: isBookmarked
      }));
    };

    window.addEventListener('bookmarkUpdated', handleBookmarkUpdate as EventListener);
    
    return () => {
      window.removeEventListener('bookmarkUpdated', handleBookmarkUpdate as EventListener);
    };
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
        type: 'profileLike',
        action: 'like'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error liking profile:", error);
      // Revert optimistic update
      setLikes(prev => ({
        ...prev,
        [candidateId]: Math.max((prev[candidateId] || 0) - 1, 0)
      }));
    }
  };

  const handleBookmark = async (candidateId: string) => {
    if (userRole !== "recruiter") {
      console.log("Only recruiters can bookmark candidates");
      return;
    }

    try {
      const isCurrentlyBookmarked = bookmarks[candidateId] || false;
      
      // Optimistic update
      setBookmarks(prev => ({
        ...prev,
        [candidateId]: !isCurrentlyBookmarked
      }));

      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/recruiter/bookmark", {
        candidateId,
        action: isCurrentlyBookmarked ? "remove" : "add"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        console.log(`Candidate ${candidateId} ${isCurrentlyBookmarked ? 'unbookmarked' : 'bookmarked'}`);
        
        // Update localStorage for consistency
        const savedBookmarks = localStorage.getItem("bookmarkedUsers");
        const bookmarkedSet = savedBookmarks ? new Set(JSON.parse(savedBookmarks)) : new Set();
        
        if (isCurrentlyBookmarked) {
          bookmarkedSet.delete(candidateId);
        } else {
          bookmarkedSet.add(candidateId);
        }
        
        localStorage.setItem("bookmarkedUsers", JSON.stringify([...bookmarkedSet]));

        // Dispatch event to notify other components
        window.dispatchEvent(new CustomEvent('bookmarkUpdated', {
          detail: { candidateId, isBookmarked: !isCurrentlyBookmarked }
        }));

        // If we're on the recruiter dashboard and unbookmarking, remove from visible cards
        if (isRecruiterDashboard && isCurrentlyBookmarked) {
          setVisibleCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(candidateId);
            return newSet;
          });
        }
      }
    } catch (error) {
      console.error("Error bookmarking candidate:", error);
      // Revert optimistic update
      setBookmarks(prev => ({
        ...prev,
        [candidateId]: !prev[candidateId]
      }));
      alert("Failed to update bookmark. Please try again.");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading candidates...</div>
      </div>
    );
  }

  if (visibleCandidates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold">
          {isRecruiterDashboard ? "No bookmarked candidates" : "No candidates found"}
        </h3>
        <p>
          {isRecruiterDashboard 
            ? "Bookmark candidates from the talent page to see them here." 
            : "Check back later for new talent."}
        </p>
      </div>
    );
  }

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
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      {/* Bookmark Button - Only for recruiters */}
                      {userRole === "recruiter" && (
                        <button
                          onClick={() => handleBookmark(candidate.id)}
                          className={`rounded-full w-8 h-8 flex items-center justify-center transition-colors ${
                            bookmarks[candidate.id] 
                              ? "bg-amber-500 hover:bg-amber-600 text-white" 
                              : "bg-white hover:bg-amber-50 text-amber-500 border border-amber-300"
                          }`}
                          title={bookmarks[candidate.id] ? "Remove bookmark" : "Bookmark candidate"}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarks[candidate.id] ? "fill-current" : ""}`} />
                        </button>
                      )}
                      
                      {/* X Button */}
                      <button
                        onClick={() => handleAction(candidate.id, 'reject')}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                        title="Reject candidate"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

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
                            Available Now
                          </Badge>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.skills.slice(0, 4).map((skill: string) => (
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

                      {/* Action Buttons at Bottom */}
                      <div className="absolute bottom-4 left-6 right-6 flex gap-2">
                        <Button
                          onClick={() => handleLike(candidate.id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 bg-white/80 backdrop-blur-sm hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                          {likes[candidate.id] || 0}
                        </Button>
                        <Button
                          onClick={() => handleAction(candidate.id, 'shortlist')}
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          Shortlist
                        </Button>
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