import axios from 'axios';
import { getStoredToken } from './auth';

const API_URL = 'http://localhost:5000/api';

// Initialize axios with token if it exists
// Make sure this runs before any API calls
const token = getStoredToken();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// User API calls
export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/user/profile`);
  return response.data;
};

export const updateUserProfile = async (profileData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education?: {
    degree: string;
    institution: string;
    graduationYear: number;
  }[];
}) => {
  const response = await axios.put(`${API_URL}/user/profile`, profileData);
  return response.data;
};

export const uploadResume = async (resumeData: FormData) => {
  const response = await axios.post(`${API_URL}/user/resume`, resumeData);
  return response.data;
};

export const createPitch = async (pitchData: {
  title: string;
  content: string;
  duration?: number;
  tags?: string[];
  mediaUrl?: string;
}) => {
  const response = await axios.post(`${API_URL}/user/pitch`, pitchData);
  return response.data;
};

export const updatePitch = async (pitchData: {
  title?: string;
  content?: string;
  duration?: number;
  tags?: string[];
  mediaUrl?: string;
}) => {
  const response = await axios.put(`${API_URL}/user/pitch`, pitchData);
  return response.data;
};

export const createAvatar = async (avatarData: FormData) => {
  const response = await axios.post(`${API_URL}/user/avatar`, avatarData);
  return response.data;
};

export const updateAvatar = async (avatarData: FormData) => {
  const response = await axios.put(`${API_URL}/user/avatar`, avatarData);
  return response.data;
};

// Job API calls
export const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};

export const getJobById = async (jobId: string) => {
  const response = await axios.get(`${API_URL}/jobs/${jobId}`);
  return response.data;
};

export const applyForJob = async (jobId: string, applicationData: {
  coverLetter?: string;
  resume?: File;
  additionalNotes?: string;
  availability?: string;
  expectedSalary?: number;
}) => {
  const response = await axios.post(`${API_URL}/jobs/${jobId}/apply`, applicationData);
  return response.data;
};

export const getUserApplications = async () => {
  const response = await axios.get(`${API_URL}/jobs/applications`);
  return response.data;
};

// Recruiter API calls
export const getRecruiterProfile = async () => {
  const response = await axios.get(`${API_URL}/recruiter/profile`);
  return response.data;
};

export const updateRecruiterProfile = async (profileData: {
  companyName?: string;
  industry?: string;
  location?: string;
  website?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  companySize?: number;
  founded?: number;
}) => {
  const response = await axios.put(`${API_URL}/recruiter/profile`, profileData);
  return response.data;
};

export const createJob = async (jobData: {
  title: string;
  description: string;
  company?: string;
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  deadline?: Date;
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  remote?: boolean;
}) => {
  const response = await axios.post(`${API_URL}/jobs`, jobData);
  return response.data;
};

export const updateJob = async (jobId: string, jobData: {
  title?: string;
  description?: string;
  company?: string;
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  deadline?: Date;
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  remote?: boolean;
}) => {
  const response = await axios.put(`${API_URL}/jobs/${jobId}`, jobData);
  return response.data;
};

export const deleteJob = async (jobId: string) => {
  const response = await axios.delete(`${API_URL}/jobs/${jobId}`);
  return response.data;
};

export const getJobApplications = async (jobId: string) => {
  const response = await axios.get(`${API_URL}/jobs/${jobId}/applications`);
  return response.data;
};

export const shortlistCandidate = async (userId: string) => {
  const response = await axios.post(`${API_URL}/recruiter/shortlist/${userId}`);
  return response.data;
};

export const rejectCandidate = async (userId: string) => {
  const response = await axios.post(`${API_URL}/recruiter/reject/${userId}`);
  return response.data;
};

export const getShortlistedCandidates = async () => {
  const response = await axios.get(`${API_URL}/recruiter/shortlisted`);
  return response.data;
};

export const getRejectedCandidates = async () => {
  const response = await axios.get(`${API_URL}/recruiter/rejected`);
  return response.data;
};

export const getAllCandidates = async (filters = {}) => {
  const response = await axios.get(`${API_URL}/recruiter/candidates`, { params: filters });
  return response.data;
};

export const getAllRecruiters = async (filters = {}) => {
  const response = await axios.get(`${API_URL}/recruiter/all`, { params: filters });
  return response.data;
};

// Analytics API calls
export const incrementProfileView = async (userId: string) => {
  const response = await axios.post(`${API_URL}/user/analytics/view/${userId}`);
  return response.data;
};

export const incrementProfileClick = async (userId: string) => {
  const response = await axios.post(`${API_URL}/user/analytics/click/${userId}`);
  return response.data;
};

export const incrementPitchView = async (userId: string) => {
  const response = await axios.post(`${API_URL}/user/analytics/pitch/${userId}`);
  return response.data;
};

export const getUserAnalytics = async () => {
  const response = await axios.get(`${API_URL}/user/analytics`);
  return response.data;
};

// Add these functions to the existing api.ts file

// Recommendation API calls
export const getRecommendedJobs = async () => {
  const response = await axios.get(`${API_URL}/recommendations/jobs`);
  return response.data;
};

export const getRecommendedCandidates = async () => {
  const response = await axios.get(`${API_URL}/recommendations/candidates`);
  return response.data;
};

export const getRecommendedCandidatesForJob = async (jobId: string) => {
  const response = await axios.get(`${API_URL}/recommendations/job/${jobId}/candidates`);
  return response.data;
};

// Add these functions
export const bookmarkCandidate = async (candidateId: string) => {
  const response = await axios.post(`${API_URL}/recruiter/bookmark`, { candidateId });
  return response.data;
};

export const getBookmarkedCandidates = async () => {
  const response = await axios.get(`${API_URL}/recruiter/bookmarked`);
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};