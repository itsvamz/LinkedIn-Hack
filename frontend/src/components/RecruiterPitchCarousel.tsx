
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Target, Zap } from 'lucide-react';
import CandidateCard from './CandidateCard';
import CandidateModal from './CandidateModal';
import { candidatesData } from '../data/candidatesData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const RecruiterPitchCarousel = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 text-violet-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-violet-200 shadow-sm"
        >
          <Target className="w-4 h-4 mr-2" />
          AI-Powered Talent Discovery
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Discover Top Talent
        </motion.h1>
        
        <motion.p 
          className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Swipe through our curated selection of candidates and find your next great hire with interactive pitch videos
        </motion.p>

        {/* Stats */}
        <motion.div 
          className="flex justify-center items-center gap-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">500+</div>
            <div className="text-sm text-slate-500">Active Candidates</div>
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-violet-200 to-purple-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">95%</div>
            <div className="text-sm text-slate-500">Match Success</div>
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-emerald-200 to-teal-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">24h</div>
            <div className="text-sm text-slate-500">Response Time</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Carousel Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="pb-16"
        >
          {candidatesData.map((candidate, index) => (
            <SwiperSlide key={candidate.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CandidateCard
                  candidate={candidate}
                  onClick={() => handleCardClick(candidate)}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <motion.button 
          className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-violet-500 to-purple-600 shadow-xl rounded-full p-4 text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 border border-violet-200"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button 
          className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-violet-500 to-purple-600 shadow-xl rounded-full p-4 text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 border border-violet-200"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-16"
      >
        <motion.button
          className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="w-5 h-5 mr-2 inline" />
          View All Candidates
        </motion.button>
      </motion.div>

      {/* Modal */}
      <CandidateModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecruiterPitchCarousel;
