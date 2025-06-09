import React, { useState, useEffect } from 'react';  // <-- add useEffect import
import { motion } from 'framer-motion';
import { Search, Filter, MessageSquare, Eye, Heart, BookmarkCheck, User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

// Example API fetch function (you need to implement or replace this)
const getBookmarkedCandidates = async () => {
  const response = await fetch('/api/bookmarked-candidates'); // your API endpoint here
  if (!response.ok) {
    throw new Error('Failed to fetch candidates');
  }
  return response.json();
};

const BookmarkedCandidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [bookmarkedCandidates, setBookmarkedCandidates] = useState([]); // <-- moved here from mock data

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchBookmarkedCandidates = async () => {
      try {
        const candidates = await getBookmarkedCandidates();
        setBookmarkedCandidates(candidates);
      } catch (error) {
        console.error('Error fetching bookmarked candidates:', error);
      }
    };
    
    fetchBookmarkedCandidates();
  }, []);

  // Filter candidates based on search term
  const filteredCandidates = bookmarkedCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bookmarked Candidates
          </h1>
          <p className="text-gray-600">
            Manage and review your shortlisted candidates with notes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search bookmarked candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-blue-600">{candidate.role}</p>
                      </div>
                    </div>
                    <BookmarkCheck className="w-5 h-5 text-blue-600" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {candidate.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {candidate.likes}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Your Notes:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{candidate.notes}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <User className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-1" />
                      Pitch
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>

                  {/* Edit Notes */}
                  <div>
                    <Textarea 
                      placeholder="Add or edit notes about this candidate..."
                      className="text-sm"
                      rows={2}
                      defaultValue={candidate.notes}
                    />
                    <Button size="sm" className="mt-2 w-full" variant="outline">
                      Update Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookmarked candidates found</h3>
            <p className="text-gray-600">Start bookmarking candidates from the Users page</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedCandidates;
