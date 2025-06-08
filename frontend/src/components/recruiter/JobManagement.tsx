
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2, Users, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Mock job data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      posted: '2024-01-15',
      applicants: 23,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      posted: '2024-01-10',
      applicants: 31,
      status: 'Active'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80,000 - $100,000',
      posted: '2024-01-08',
      applicants: 18,
      status: 'Draft'
    }
  ]);

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setActiveTab('edit');
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setActiveTab('applicants');
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="post">📌 Post Job</TabsTrigger>
          <TabsTrigger value="edit">📝 Edit Job</TabsTrigger>
          <TabsTrigger value="delete">❌ Manage Jobs</TabsTrigger>
          <TabsTrigger value="applicants">👀 View Applicants</TabsTrigger>
        </TabsList>

        {/* Post Job Tab */}
        <TabsContent value="post" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Post New Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Senior Frontend Developer" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="e.g. Engineering" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. San Francisco, CA" />
                  </div>
                  <div>
                    <Label htmlFor="type">Employment Type</Label>
                    <Input id="type" placeholder="e.g. Full-time" />
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input id="salary" placeholder="e.g. $120,000 - $150,000" />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Input id="experience" placeholder="e.g. 3-5 years" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the role, responsibilities, and requirements..." 
                    rows={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Post Job
                  </Button>
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Job Tab */}
        <TabsContent value="edit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit2 className="w-5 h-5" />
                Edit Job {selectedJob ? `- ${selectedJob.title}` : ''}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedJob ? (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-title">Job Title</Label>
                      <Input id="edit-title" defaultValue={selectedJob.title} />
                    </div>
                    <div>
                      <Label htmlFor="edit-department">Department</Label>
                      <Input id="edit-department" defaultValue={selectedJob.department} />
                    </div>
                    <div>
                      <Label htmlFor="edit-location">Location</Label>
                      <Input id="edit-location" defaultValue={selectedJob.location} />
                    </div>
                    <div>
                      <Label htmlFor="edit-type">Employment Type</Label>
                      <Input id="edit-type" defaultValue={selectedJob.type} />
                    </div>
                    <div>
                      <Label htmlFor="edit-salary">Salary Range</Label>
                      <Input id="edit-salary" defaultValue={selectedJob.salary} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Job Description</Label>
                    <Textarea 
                      id="edit-description" 
                      placeholder="Describe the role, responsibilities, and requirements..." 
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Update Job
                    </Button>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="text-gray-500">Select a job from the Manage Jobs tab to edit.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Jobs Tab */}
        <TabsContent value="delete" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Manage Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {job.applicants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditJob(job)}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewApplicants(job)}
                          >
                            <Users className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View Applicants Tab */}
        <TabsContent value="applicants" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Applicants {selectedJob ? `for ${selectedJob.title}` : ''}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedJob ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-blue-900">{selectedJob.title}</h3>
                      <p className="text-blue-700">{selectedJob.applicants} total applicants</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-blue-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Posted: {selectedJob.posted}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {selectedJob.salary}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock applicants list */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((applicant) => (
                      <div key={applicant} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-600">A{applicant}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Applicant {applicant}</h4>
                            <p className="text-sm text-gray-600">Software Engineer • 3 years exp</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Interview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Select a job from the Manage Jobs tab to view applicants.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobManagement;
