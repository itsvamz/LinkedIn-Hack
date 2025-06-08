
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import JobManagement from './JobManagement';

const JobsSection = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Management</h2>
          <p className="text-gray-600">Manage your job postings and recruitment process</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            <Wand2 className="w-4 h-4 mr-2" />
            Autofill with AI
          </Button>
        </div>
      </motion.div>

      {/* Job Management Only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <JobManagement />
      </motion.div>
    </div>
  );
};

export default JobsSection;
