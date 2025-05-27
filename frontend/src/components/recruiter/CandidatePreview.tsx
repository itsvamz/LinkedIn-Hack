
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, Download, Calendar, MessageSquare, Star, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CandidatePreviewProps {
  candidate: any;
}

const CandidatePreview: React.FC<CandidatePreviewProps> = ({ candidate }) => {
  if (!candidate) {
    return (
      <Card className="border-violet-100 shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="text-gray-500 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Candidate Selected</h3>
            <p>Select a candidate to view their detailed profile, resume, and work history.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const workHistory = [
    {
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      duration: "2022 - Present",
      description: "Lead development of user-facing applications using React and TypeScript. Mentored junior developers and implemented best practices."
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      duration: "2020 - 2022",
      description: "Built responsive web applications and collaborated with design team to implement pixel-perfect UI components."
    },
    {
      company: "WebSolutions LLC",
      position: "Junior Developer",
      duration: "2019 - 2020",
      description: "Developed and maintained client websites using modern web technologies and frameworks."
    }
  ];

  const education = [
    {
      institution: "University of Technology",
      degree: "Bachelor of Computer Science",
      year: "2019",
      gpa: "3.8/4.0"
    }
  ];

  const projects = [
    {
      name: "E-commerce Platform",
      tech: ["React", "Node.js", "MongoDB"],
      description: "Full-stack e-commerce solution with payment integration and admin dashboard."
    },
    {
      name: "Task Management App",
      tech: ["React", "Firebase", "Material-UI"],
      description: "Real-time collaborative task management application with team features."
    },
    {
      name: "Portfolio Website",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      description: "Personal portfolio showcasing projects and skills with modern design."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Profile Summary */}
        <div className="lg:col-span-2">
          <Card className="border-violet-100 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-violet-200"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
                  <p className="text-xl text-violet-600 font-semibold mb-2">{candidate.role}</p>
                  <p className="text-gray-600 mb-4">{candidate.about}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {candidate.experience}
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 mr-1" />
                      4.8 Rating
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Skills & Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {candidate.skills.map((skill: string, index: number) => (
                    <div key={skill} className="flex items-center justify-between p-3 bg-violet-50 rounded-lg">
                      <span className="font-medium text-violet-700">{skill}</span>
                      <Progress value={85 + Math.random() * 15} className="w-16 h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="border-violet-200 text-violet-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div>
          <Card className="border-violet-100 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                <Mail className="w-5 h-5 mr-3 text-violet-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{candidate.email}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                <Phone className="w-5 h-5 mr-3 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{candidate.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg">
                <Globe className="w-5 h-5 mr-3 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Portfolio</p>
                  <p className="font-medium text-blue-600">portfolio.example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Work History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-violet-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {workHistory.map((job, index) => (
                <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                    <p className="text-violet-600 font-medium">{job.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{job.duration}</p>
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Education & Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Education */}
        <Card className="border-violet-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            {education.map((edu, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-emerald-600 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-500">Class of {edu.year} • GPA: {edu.gpa}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="border-violet-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Key Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CandidatePreview;
