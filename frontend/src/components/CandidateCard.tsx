
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Bookmark, Heart, X, Star, MapPin, Clock } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  role: string;
  experience: string;
  avatar: string;
  skills: string[];
  about: string;
  email: string;
  phone: string;
  location: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [notes, setNotes] = useState('');

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)",
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 border border-slate-100 hover:border-violet-200 relative overflow-hidden"
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-purple-50/50 to-pink-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Avatar and Basic Info */}
        <div className="flex items-center mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white shadow-md"
            />
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-800 mb-1">{candidate.name}</h3>
            <p className="text-violet-600 font-medium">{candidate.role}</p>
            <div className="flex items-center text-sm text-slate-500 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <span>{candidate.experience}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                isLiked 
                  ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600' 
                  : 'bg-slate-100 text-slate-400 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600' 
                  : 'bg-slate-100 text-slate-400 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-500'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Pitch Video Section */}
        <motion.div 
          className="relative bg-gradient-to-br from-slate-100 via-violet-50 to-purple-100 rounded-xl h-32 mb-4 flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button 
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full p-4 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Play className="w-6 h-6" />
          </motion.button>
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            1:00
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 3).map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 text-violet-700 text-xs px-3 py-1.5 rounded-full border border-violet-200 font-medium"
              >
                {skill}
              </motion.span>
            ))}
            {candidate.skills.length > 3 && (
              <motion.span 
                className="text-slate-500 text-xs px-2 py-1"
                whileHover={{ scale: 1.05 }}
              >
                +{candidate.skills.length - 3} more
              </motion.span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <motion.button 
            className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            Shortlist
          </motion.button>
          <motion.button 
            className="flex-1 bg-gradient-to-r from-slate-400 via-gray-500 to-slate-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            Reject
          </motion.button>
        </div>

        {/* Notes Input */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 60, 
            opacity: 1 
          }}
          transition={{ duration: 0.3 }}
        >
          <textarea
            placeholder="Add notes about this candidate..."
            className="w-full border border-violet-200 rounded-lg p-3 text-sm resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
            rows={isHovered ? 3 : 2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
