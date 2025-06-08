
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import PitchCarousel from './PitchCarousel';
import AvatarChatMode from './AvatarChatMode';
import CandidatePreview from './CandidatePreview';
import EngagementTools from './EngagementTools';
import FilterPanel from './FilterPanel';

const CandidatesSection = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('carousel');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidate Discovery</h2>
          <p className="text-gray-600">Discover and engage with top talent efficiently</p>
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </motion.div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <FilterPanel />
        </motion.div>
      )}

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="carousel">Pitch Carousel</TabsTrigger>
            <TabsTrigger value="chat">Avatar Chat</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="carousel" className="mt-6">
            <PitchCarousel onCandidateSelect={setSelectedCandidate} />
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <AvatarChatMode candidate={selectedCandidate} />
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <CandidatePreview candidate={selectedCandidate} />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <EngagementTools />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default CandidatesSection;
