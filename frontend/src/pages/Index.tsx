
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecruiterPitchCarousel from '../components/RecruiterPitchCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Header with Login Button */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            TalentFlow
          </div>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 via-purple-100 to-pink-100 text-violet-800 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
            🚀 Powered by AI-driven candidate matching
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            TalentFlow
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The modern recruiting platform that connects exceptional talent with forward-thinking companies. 
            Discover, evaluate, and hire the best candidates with our innovative pitch carousel.
          </p>
        </motion.div>

        <RecruiterPitchCarousel />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-4xl border border-violet-100"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Why Choose TalentFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-violet-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Smart Matching</h3>
              <p className="text-slate-600 text-sm">AI-powered candidate matching based on skills, experience, and culture fit</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Fast Screening</h3>
              <p className="text-slate-600 text-sm">1-minute pitch videos help you evaluate candidates quickly and effectively</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Data-Driven</h3>
              <p className="text-slate-600 text-sm">Comprehensive candidate profiles with skills, experience, and performance metrics</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="py-16 bg-gradient-to-r from-violet-600 to-purple-600"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with TalentFlow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/home">
                <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 text-lg px-8 py-3">
                  Explore Platform
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600 text-lg px-8 py-3">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
