import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Calendar, Star, TrendingUp, Upload, Mail, Phone, MapPin, Briefcase, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RecruiterSidebar from '@/components/recruiter/RecruiterSidebar';
import DashboardOverview from '@/components/recruiter/DashboardOverview';
import JobsSection from '@/components/recruiter/JobsSection';
import CandidatesSection from '@/components/recruiter/CandidatesSection';
import MessagingSection from '@/components/recruiter/MessagingSection';
import Settings from '@/components/Settings';

const RecruiterDashboard = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'avatar' | 'overview' | 'jobs' | 'candidates' | 'messaging' | 'analytics' | 'settings'>('overview');
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const res = await axios.get("http://localhost:5000/api/recruiter/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchUser();
  }, []);

  const resumeFileRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null>(null);
  const [saveMessage, setSaveMessage] = useState({ type: "", text: "" });
  
  const saveProfile = async () => {
    try {
      setSaveMessage({ type: "", text: "" }); // Clear previous messages
      const token = localStorage.getItem("token");
      
      const response = await axios.put(
        "http://localhost:5000/api/recruiter/profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setSaveMessage({ 
        type: "success", 
        text: "Profile updated successfully!" 
      });
      
      // Update localStorage with new name if it changed
      if (userData?.fullName) {
        localStorage.setItem("userName", userData.fullName);
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to update profile. Please try again." 
      });
    }
  };
  
  const handleResumeUpload = () => {
    resumeFileRef.current?.click();
  };

  const handleAvatarUpload = () => {
    avatarFileRef.current?.click();
  };

  const handleResumeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Show loading state
    setSaveMessage({ type: "info", text: "Uploading and parsing resume..." });
    
    const formData = new FormData();
    formData.append("file", file);
    
    // Upload and parse the resume
    axios.post("http://localhost:5000/api/parse-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      console.log("Resume parsed:", response.data);
      
      // Update recruiter data with parsed information
      setUserData(prev => ({
        ...prev,
        ...response.data.profileData,
        education: response.data.education,
        experience: response.data.experience,
        skills: response.data.skills.join(", ") // Convert array to comma-separated string
      }));
      
      setSaveMessage({ 
        type: "success", 
        text: "Resume parsed and profile updated successfully!" 
      });
    })
    .catch(error => {
      console.error("Error parsing resume:", error);
      setSaveMessage({ 
        type: "error", 
        text: `Failed to parse resume: ${error.response?.data?.error?.message || error.message}` 
      });
    });
  };

  // Replace the existing handleAvatarFileChange function with this one
  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Show loading state
    setSaveMessage({ type: "info", text: "Uploading avatar..." });
    
    const formData = new FormData();
    formData.append("avatar", file);
    
    // Upload the avatar
    axios.post("http://localhost:5000/api/recruiter/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      console.log("Avatar uploaded:", response.data);
      
      // Update user data with new avatar URL
      setUserData(prev => ({
        ...prev,
        avatar: response.data.avatarUrl
      }));
      
      setSaveMessage({ 
        type: "success", 
        text: "Avatar updated successfully!" 
      });
    })
    .catch(error => {
      console.error("Error uploading avatar:", error);
      setSaveMessage({ 
        type: "error", 
        text: "Failed to upload avatar. Please try again." 
      });
    });
  };

  const handleOverviewModeSelect = (mode: string) => {
    switch (mode) {
      case 'candidates':
        setActiveSection('candidates');
        break;
      case 'jobs':
        setActiveSection('jobs');
        break;
      case 'messaging':
        setActiveSection('messaging');
        break;
      default:
        setActiveSection('candidates');
    }
  };

  const handleSendMessage = () => {
    setMessageModalOpen(true);
  };

  const handleScheduleInterview = () => {
    setInterviewModalOpen(true);
  };

  const handleReply = () => {
    setReplyModalOpen(true);
  };

  const handleViewApplicantProfile = (applicant: { id: number; name: string }) => {
    console.log('Viewing profile for:', applicant);
    // Handle profile view logic
  };

  const handleInterviewApplicant = (applicant: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }) => {
    setSelectedCandidate(applicant);
    setInterviewModalOpen(true);
  };

  const renderOverviewSection = () => (
    <DashboardOverview onModeSelect={handleOverviewModeSelect} activeMode={activeSection} />
  );

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recruiter Profile</CardTitle>
          <CardDescription>Complete your profile to increase visibility to candidates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Welcome Message */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">
              Welcome, {userData?.fullName || "Recruiter"}
            </h3>
          </div>
          
          {/* Resume Upload */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Resume Upload</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload your resume to auto-fill profile</p>
              <Button variant="outline" size="sm" onClick={handleResumeUpload}>
                Upload Resume
              </Button>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC up to 5MB</p>
            </div>
            <input
              ref={resumeFileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeFileChange}
              className="hidden"
            />
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                 
                value={userData?.fullName || ""}
                onChange={(e) => setUserData({...userData, fullName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={userData?.phone || ""}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={userData?.email || ""}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                
                value={userData?.location || ""}
                onChange={(e) => setUserData({...userData, location: e.target.value})}
              />
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input 
                  id="linkedin" 
                  
                  value={userData?.linkedin || ""}
                  onChange={(e) => setUserData({...userData, linkedin: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input 
                  id="github" 
                  
                  value={userData?.github || ""}
                  onChange={(e) => setUserData({...userData, github: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="leetcode">LeetCode</Label>
                <Input 
                  id="leetcode" 
                  
                  value={userData?.leetcode || ""}
                  onChange={(e) => setUserData({...userData, leetcode: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input 
                  id="portfolio" 
                  
                  value={userData?.portfolio || ""}
                  onChange={(e) => setUserData({...userData, portfolio: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Textarea 
              id="skills" 
              
              value={userData?.skills || ""}
              onChange={(e) => setUserData({...userData, skills: e.target.value})}
            />
          </div>

          {/* Availability */}
          <div>
            <Label htmlFor="availability">Availability</Label>
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={userData?.availability || ""}
              onChange={(e) => setUserData({...userData, availability: e.target.value})}
            >
              <option value="">Select availability</option>
              <option value="Available immediately">Available immediately</option>
              <option value="Available in 2 weeks">Available in 2 weeks</option>
              <option value="Available in 1 month">Available in 1 month</option>
              <option value="Not actively recruiting">Not actively recruiting</option>
            </select>
          </div>

          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={saveProfile}
          >
            Save Profile
          </Button>
          
          {/* Display save message if present */}
          {saveMessage.text && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              saveMessage.type === "success" 
                ? "bg-green-50 text-green-600 border border-green-200" 
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {saveMessage.text}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAvatarSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Avatar Creation</CardTitle>
        <CardDescription>Create and manage your professional avatar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Avatar */}
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="w-16 h-16 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Current Avatar</h3>
            <p className="text-gray-600 mb-4">Upload a clear photo to generate your professional avatar</p>
          </div>

          {/* Upload New Photo */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload a new photo</p>
            <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
              Choose Photo
            </Button>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 2MB</p>
          </div>
          <input
            ref={avatarFileRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleAvatarFileChange}
            className="hidden"
          />

         

          <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate New Avatar</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderMessagingSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Manage your conversations with candidates</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Messages from Candidates</TabsTrigger>
            <TabsTrigger value="sent">Messages Sent to Candidates</TabsTrigger>
          </TabsList>
          <TabsContent value="received" className="space-y-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">John Doe - Software Engineer</h4>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-600 mb-2">Thank you for reaching out about the React position...</p>
                    <Button size="sm" variant="outline" onClick={handleReply}>Reply</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sent" className="space-y-4">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">To: Jane Smith - UX Designer</h4>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-gray-600 mb-2">Hi Jane, I noticed your impressive portfolio and would love to discuss...</p>
                    <Button size="sm" variant="outline">View Thread</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  const renderAnalyticsSection = () => (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Talent Response Rate</h4>
                <p className="text-2xl font-bold text-blue-600">76%</p>
                <p className="text-sm text-gray-600">Job click-through rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Talent Acquisition Rate</h4>
                <p className="text-2xl font-bold text-green-600">23%</p>
                <p className="text-sm text-gray-600">Successful hires</p>
              </CardContent>
            </Card>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Detailed analytics charts coming soon...
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderJobsSection = () => (
    <div className="space-y-6">
      <JobsSection />
      
      {/* Job Applicants Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Job Applicants Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Candidate {i}</h4>
                  <p className="text-sm text-gray-600">Applied for Senior Developer Position</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewApplicantProfile({ id: i, name: `Candidate ${i}` })}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleInterviewApplicant({ id: i, name: `Candidate ${i}`, email: `candidate${i}@email.com`, phone: `+1 555-000-000${i}` })}
                  >
                    Interview
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCandidatesSection = () => (
    <div className="space-y-6">
      <CandidatesSection />
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSendMessage}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-200 text-blue-600"
              onClick={handleScheduleInterview}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'avatar':
        return renderAvatarSection();
      case 'overview':
        return renderOverviewSection();
      case 'jobs':
        return renderJobsSection();
      case 'candidates':
        return renderCandidatesSection();
      case 'messaging':
        return renderMessagingSection();
      case 'analytics':
        return renderAnalyticsSection();
      case 'settings':
        return <div></div>; // Keep settings blank as requested
      default:
        return renderOverviewSection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-black dark:via-black dark:to-black">
      <div className="flex">
        <RecruiterSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 p-6 ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Message Modal */}
      <Dialog open={messageModalOpen} onOpenChange={setMessageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">To:</Label>
              <Input id="recipient" placeholder="Candidate name or email" />
            </div>
            <div>
              <Label htmlFor="subject">Subject:</Label>
              <Input id="subject" placeholder="Message subject" />
            </div>
            <div>
              <Label htmlFor="message">Message:</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={5} />
            </div>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Send Message</Button>
              <Button variant="outline" onClick={() => setMessageModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Interview Modal */}
      <Dialog open={interviewModalOpen} onOpenChange={setInterviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedCandidate && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Contact Details</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{selectedCandidate.phone}</span>
                  </div>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="interviewDate">Interview Date:</Label>
              <Input id="interviewDate" type="datetime-local" />
            </div>
            <div>
              <Label htmlFor="interviewType">Interview Type:</Label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Video Call</option>
                <option>Phone Interview</option>
                <option>In-Person</option>
              </select>
            </div>
            <div>
              <Label htmlFor="notes">Notes:</Label>
              <Textarea id="notes" placeholder="Additional notes for the interview..." rows={3} />
            </div>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700">Schedule Interview</Button>
              <Button variant="outline" onClick={() => setInterviewModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reply Modal */}
      <Dialog open={replyModalOpen} onOpenChange={setReplyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Original Message:</h4>
              <p className="text-sm text-gray-600">Thank you for reaching out about the React position. I'm very interested in discussing this opportunity further...</p>
            </div>
            <div>
              <Label htmlFor="replyMessage">Your Reply:</Label>
              <Textarea id="replyMessage" placeholder="Type your reply here..." rows={5} />
            </div>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Send Reply</Button>
              <Button variant="outline" onClick={() => setReplyModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecruiterDashboard;