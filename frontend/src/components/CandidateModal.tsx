
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Play, Star, Calendar, Award, ExternalLink } from 'lucide-react';

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

interface CandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, isOpen, onClose }) => {
  if (!candidate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white p-8 rounded-t-2xl">
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="flex items-center">
                <motion.img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-white/20 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                />
                <div>
                  <motion.h2 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {candidate.name}
                  </motion.h2>
                  <motion.p 
                    className="text-violet-100 text-lg font-medium mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {candidate.role}
                  </motion.p>
                  <motion.div 
                    className="flex items-center text-violet-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">{candidate.experience}</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Pitch Video */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-violet-600" />
                  Pitch Video
                </h3>
                <motion.div 
                  className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-xl h-64 flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button 
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full p-6 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-10 h-10" />
                  </motion.button>
                  <span className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                    1:00
                  </span>
                </motion.div>
              </motion.div>

              {/* About */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-violet-600" />
                  About
                </h3>
                <p className="text-slate-700 leading-relaxed text-base">{candidate.about}</p>
              </motion.div>

              {/* Skills */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-violet-600" />
                  Skills & Expertise
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {candidate.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 text-violet-700 px-4 py-2 rounded-lg text-sm font-medium border border-violet-200 text-center hover:shadow-md transition-all duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-slate-800">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div 
                    className="flex items-center p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-100"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Mail className="w-5 h-5 mr-3 text-violet-600" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium text-slate-800">{candidate.email}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Phone className="w-5 h-5 mr-3 text-emerald-600" />
                    <div>
                      <p className="text-sm text-slate-600">Phone</p>
                      <p className="font-medium text-slate-800">{candidate.phone}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-100"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <MapPin className="w-5 h-5 mr-3 text-orange-600" />
                    <div>
                      <p className="text-sm text-slate-600">Location</p>
                      <p className="font-medium text-slate-800">{candidate.location}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button 
                  className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Shortlist Candidate
                </motion.button>
                <motion.button 
                  className="flex-1 bg-gradient-to-r from-slate-400 via-gray-500 to-slate-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reject Candidate
                </motion.button>
                <motion.button 
                  className="px-4 py-4 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-600 rounded-xl hover:from-violet-200 hover:to-purple-200 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CandidateModal;
