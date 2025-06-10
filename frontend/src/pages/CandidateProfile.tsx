import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail, Phone, Briefcase, GraduationCap, Award } from 'lucide-react';
import { getUserById, bookmarkCandidate } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const CandidateProfile = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const data = await getUserById(id);
        setCandidate(data);
      } catch (error) {
        console.error('Error fetching candidate:', error);
        toast({
          title: 'Error',
          description: 'Failed to load candidate profile. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCandidate();
    }
  }, [id]);

  const handleBookmark = async () => {
    try {
      await bookmarkCandidate(id);
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

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8 border-violet-100 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={candidate.avatar || '/placeholder.svg'} alt={candidate.fullName} />
                <AvatarFallback className="bg-violet-500 text-white text-2xl">
                  {candidate.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{candidate.fullName}</h1>
                <p className="text-xl text-violet-600 font-semibold mb-4">{candidate.title || 'Professional'}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  {candidate.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      {candidate.location}
                    </div>
                  )}
                  {candidate.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2" />
                      {candidate.email}
                    </div>
                  )}
                  {candidate.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-2" />
                      {candidate.phone}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {candidate.skills && candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-violet-100 text-violet-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  onClick={handleBookmark}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                >
                  Bookmark Candidate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Experience */}
        {candidate.experience && candidate.experience.length > 0 && (
          <Card className="mb-8 border-violet-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-violet-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.duration}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        {/* Education */}
        {candidate.education && candidate.education.length > 0 && (
          <Card className="mb-8 border-violet-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {candidate.education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-emerald-600 font-medium">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.year}</p>
                    {edu.gpa && <p className="text-gray-700">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        
        {/* Projects */}
        {candidate.projects && candidate.projects.length > 0 && (
          <Card className="mb-8 border-violet-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Key Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidate.projects.map((project, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;