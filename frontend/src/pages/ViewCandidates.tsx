import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageSquare, BookmarkPlus, MapPin, Briefcase, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getAllCandidates, bookmarkCandidate } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const ViewCandidates = () => {
  const [savedNotes, setSavedNotes] = useState<{[key: string]: string}>({});
  const [tempNotes, setTempNotes] = useState<{[key: string]: string}>({});
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await getAllCandidates();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        toast({
          title: 'Error',
          description: 'Failed to load candidates. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleSaveNote = (candidateId: string) => {
    const note = tempNotes[candidateId] || '';
    setSavedNotes(prev => ({ ...prev, [candidateId]: note }));
    console.log(`Note saved for candidate ${candidateId}:`, note);
  };

  const handleNoteChange = (candidateId: string, note: string) => {
    setTempNotes(prev => ({ ...prev, [candidateId]: note }));
  };

  const handleViewPitch = (candidateId: string) => {
    console.log('Viewing pitch for candidate:', candidateId);
    // Navigate to pitch page
  };

  // Add function to handle viewing profile
  const handleViewProfile = (candidateId: string) => {
    navigate(`/candidate-profile/${candidateId}`);
  };

  // Add function to handle bookmarking
  const handleBookmark = async (candidateId: string) => {
    try {
      await bookmarkCandidate(candidateId);
      toast({
        title: 'Success',
        description: 'Candidate bookmarked successfully',
      });
    } catch (error) {
      console.error('Error bookmarking candidate:', error);
      toast({
        title: 'Error',
        description: 'Failed to bookmark candidate. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Discover Top Talent
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our curated list of talented professionals and find your next hire
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Loading candidates...</p>
          ) : candidates.length === 0 ? (
            <p>No candidates found.</p>
          ) : (
            candidates.map((candidate, index) => (
              <motion.div
                key={candidate._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-violet-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    {/* Profile Header */}
                    <div className="flex items-center mb-4">
                      <Avatar className="w-16 h-16 mr-4">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback className="bg-violet-500 text-white text-lg">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                        <p className="text-violet-600 font-medium">{candidate.title}</p>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {candidate.location}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {candidate.bio}
                    </p>

                    {/* Experience & Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {candidate.experience}
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm font-medium">{candidate.rating}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-violet-100 text-violet-700">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            +{candidate.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {candidate.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {candidate.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {Math.floor(candidate.views * 0.1)}
                      </div>
                    </div>

                    {/* Notes Section */}
                    <div className="mb-4">
                      <textarea
                        placeholder="Add a note about this candidate..."
                        value={tempNotes[candidate.id] || savedNotes[candidate.id] || ''}
                        onChange={(e) => handleNoteChange(candidate.id, e.target.value)}
                        className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
                        rows={2}
                      />
                      {tempNotes[candidate.id] && tempNotes[candidate.id] !== savedNotes[candidate.id] && (
                        <Button
                          onClick={() => handleSaveNote(candidate.id)}
                          size="sm"
                          className="mt-2 bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save Note
                        </Button>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleViewPitch(candidate.id)}
                        className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                      >
                        View Pitch
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-violet-200 text-violet-600 hover:bg-violet-50"
                        onClick={() => handleBookmark(candidate._id)}
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-violet-200 text-violet-600 hover:bg-violet-50 px-8 py-2"
          >
            Load More Candidates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCandidates;
