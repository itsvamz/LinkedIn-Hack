import React, { useState, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  
  // Form states for creating a job
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    department: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: [],
    responsibilities: [],
    skills: [],
    benefits: [],
    status: 'Active'
  });

  // Form states for editing a job
  const [editJob, setEditJob] = useState({
    title: '',
    company: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: [],
    responsibilities: [],
    skills: [],
    benefits: [],
    status: ''
  });

  // Fetch all jobs posted by the recruiter
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/jobs/recruiter', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch jobs. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch applicants for a specific job
  const fetchApplicants = async (jobId) => {
    setLoadingApplicants(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/jobs/applications/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch applicants. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoadingApplicants(false);
    }
  };

  // Create a new job
  const createJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/jobs', newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast({
        title: 'Success',
        description: 'Job posted successfully!',
      });
      // Reset form
      setNewJob({
        title: '',
        company: '',
        department: '',
        location: '',
        type: 'Full-time',
        salary: '',
        description: '',
        requirements: [],
        responsibilities: [],
        skills: [],
        benefits: [],
        status: 'Active'
      });
      // Refresh jobs list
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: 'Error',
        description: 'Failed to post job. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Update an existing job
  const updateJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/jobs/${selectedJob._id}`, editJob, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast({
        title: 'Success',
        description: 'Job updated successfully!',
      });
      // Refresh jobs list
      fetchJobs();
      setActiveTab('delete'); // Go back to manage jobs tab
    } catch (error) {
      console.error('Error updating job:', error);
      toast({
        title: 'Error',
        description: 'Failed to update job. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a job
  const deleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast({
        title: 'Success',
        description: 'Job deleted successfully!',
      });
      // Refresh jobs list
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete job. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for new job form
  const handleNewJobChange = (e) => {
    const { id, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle input change for edit job form
  const handleEditJobChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('edit-', '');
    setEditJob(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Handle select change for job type
  const handleTypeChange = (value) => {
    setNewJob(prev => ({
      ...prev,
      type: value
    }));
  };

  // Handle select change for job status
  const handleStatusChange = (value) => {
    setNewJob(prev => ({
      ...prev,
      status: value
    }));
  };

  // Handle select change for edit job type
  const handleEditTypeChange = (value) => {
    setEditJob(prev => ({
      ...prev,
      type: value
    }));
  };

  // Handle select change for edit job status
  const handleEditStatusChange = (value) => {
    setEditJob(prev => ({
      ...prev,
      status: value
    }));
  };

  // Handle comma-separated input for skills, requirements, etc.
  const handleArrayInput = (e, field) => {
    const { value } = e.target;
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setNewJob(prev => ({
      ...prev,
      [field]: array
    }));
  };

  // Handle comma-separated input for edit form
  const handleEditArrayInput = (e, field) => {
    const { value } = e.target;
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setEditJob(prev => ({
      ...prev,
      [field]: array
    }));
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setEditJob({
      title: job.title || '',
      company: job.company || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || '',
      salary: job.salary || '',
      description: job.description || '',
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      skills: job.skills || [],
      benefits: job.benefits || [],
      status: job.status || 'Active'
    });
    setActiveTab('edit');
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    fetchApplicants(job._id);
    setActiveTab('applicants');
  };

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

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
              <form className="space-y-4" onSubmit={createJob}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title*</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g. Senior Frontend Developer" 
                      value={newJob.title}
                      onChange={handleNewJobChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company*</Label>
                    <Input 
                      id="company" 
                      placeholder="e.g. TechCorp" 
                      value={newJob.company}
                      onChange={handleNewJobChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      placeholder="e.g. Engineering" 
                      value={newJob.department}
                      onChange={handleNewJobChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location*</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g. San Francisco, CA" 
                      value={newJob.location}
                      onChange={handleNewJobChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Employment Type*</Label>
                    <Select 
                      onValueChange={handleTypeChange} 
                      defaultValue={newJob.type}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input 
                      id="salary" 
                      placeholder="e.g. $120,000 - $150,000" 
                      value={newJob.salary}
                      onChange={handleNewJobChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      onValueChange={handleStatusChange} 
                      defaultValue={newJob.status}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Job Description*</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the role..." 
                    rows={4}
                    value={newJob.description}
                    onChange={handleNewJobChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="e.g. Bachelor's degree, 3+ years experience, etc." 
                    rows={2}
                    value={newJob.requirements.join(', ')}
                    onChange={(e) => handleArrayInput(e, 'requirements')}
                  />
                </div>
                <div>
                  <Label htmlFor="responsibilities">Responsibilities (comma-separated)</Label>
                  <Textarea 
                    id="responsibilities" 
                    placeholder="e.g. Develop features, Fix bugs, etc." 
                    rows={2}
                    value={newJob.responsibilities.join(', ')}
                    onChange={(e) => handleArrayInput(e, 'responsibilities')}
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Textarea 
                    id="skills" 
                    placeholder="e.g. React, Node.js, TypeScript, etc." 
                    rows={2}
                    value={newJob.skills.join(', ')}
                    onChange={(e) => handleArrayInput(e, 'skills')}
                  />
                </div>
                <div>
                  <Label htmlFor="benefits">Benefits (comma-separated)</Label>
                  <Textarea 
                    id="benefits" 
                    placeholder="e.g. Health insurance, 401k, etc." 
                    rows={2}
                    value={newJob.benefits.join(', ')}
                    onChange={(e) => handleArrayInput(e, 'benefits')}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Posting...' : 'Post Job'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setNewJob({
                        ...newJob,
                        status: 'Draft'
                      });
                      createJob(event);
                    }}
                    disabled={loading}
                  >
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
                <form className="space-y-4" onSubmit={updateJob}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-title">Job Title*</Label>
                      <Input 
                        id="edit-title" 
                        value={editJob.title} 
                        onChange={handleEditJobChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-company">Company*</Label>
                      <Input 
                        id="edit-company" 
                        value={editJob.company} 
                        onChange={handleEditJobChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-department">Department</Label>
                      <Input 
                        id="edit-department" 
                        value={editJob.department} 
                        onChange={handleEditJobChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-location">Location*</Label>
                      <Input 
                        id="edit-location" 
                        value={editJob.location} 
                        onChange={handleEditJobChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-type">Employment Type*</Label>
                      <Select 
                        onValueChange={handleEditTypeChange} 
                        defaultValue={editJob.type}
                      >
                        <SelectTrigger id="edit-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-salary">Salary Range</Label>
                      <Input 
                        id="edit-salary" 
                        value={editJob.salary} 
                        onChange={handleEditJobChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-status">Status</Label>
                      <Select 
                        onValueChange={handleEditStatusChange} 
                        defaultValue={editJob.status}
                      >
                        <SelectTrigger id="edit-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Job Description*</Label>
                    <Textarea 
                      id="edit-description" 
                      value={editJob.description} 
                      onChange={handleEditJobChange}
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-requirements">Requirements (comma-separated)</Label>
                    <Textarea 
                      id="edit-requirements" 
                      value={editJob.requirements.join(', ')} 
                      onChange={(e) => handleEditArrayInput(e, 'requirements')}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-responsibilities">Responsibilities (comma-separated)</Label>
                    <Textarea 
                      id="edit-responsibilities" 
                      value={editJob.responsibilities.join(', ')} 
                      onChange={(e) => handleEditArrayInput(e, 'responsibilities')}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-skills">Skills (comma-separated)</Label>
                    <Textarea 
                      id="edit-skills" 
                      value={editJob.skills.join(', ')} 
                      onChange={(e) => handleEditArrayInput(e, 'skills')}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-benefits">Benefits (comma-separated)</Label>
                    <Textarea 
                      id="edit-benefits" 
                      value={editJob.benefits.join(', ')} 
                      onChange={(e) => handleEditArrayInput(e, 'benefits')}
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update Job'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setActiveTab('delete')}
                    >
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
              {loading ? (
                <p className="text-center py-4">Loading jobs...</p>
              ) : jobs.length === 0 ? (
                <p className="text-center py-4">No jobs found. Create a new job to get started.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job._id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {job.applications || 0}
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
                              onClick={() => deleteJob(job._id)}
                              disabled={loading}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
                      <p className="text-blue-700">{selectedJob.applications || 0} total applicants</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-blue-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Posted: {new Date(selectedJob.postedDate).toLocaleDateString()}
                      </div>
                      {selectedJob.salary && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {selectedJob.salary}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {loadingApplicants ? (
                    <p className="text-center py-4">Loading applicants...</p>
                  ) : applicants.length === 0 ? (
                    <p className="text-center py-4">No applicants found for this job yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {applicants.map((applicant) => (
                        <div key={applicant._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-blue-600">
                                {applicant.applicant.fullName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium">{applicant.applicant.fullName}</h4>
                              <p className="text-sm text-gray-600">
                                {applicant.applicant.skills?.slice(0, 3).join(', ')}
                                {applicant.applicant.skills?.length > 3 ? '...' : ''}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className="mr-2" variant={applicant.status === 'Applied' ? 'outline' : 
                              applicant.status === 'Shortlisted' ? 'default' : 
                              applicant.status === 'Rejected' ? 'destructive' : 
                              'secondary'}>
                              {applicant.status}
                            </Badge>
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
                  )}
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