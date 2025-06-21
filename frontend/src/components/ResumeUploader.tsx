import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

interface ParsedResume {
  data?: {
    attributes?: {
      result?: {
        candidate_name?: string;
        candidate_email?: string;
        candidate_phone?: string;
        skills?: string[];
        education_qualifications?: any[];
        positions?: any[];
        // Include all other fields from the API response
      }
    }
  }
}

const ResumeUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file); // Make sure this matches the field name expected by the server

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      // Store the complete parsed data
      setParsedData(res.data.parsed);
    } catch (err) {
      console.error('Error uploading resume:', err);
      setError(err.response?.data?.error || 'Error uploading or parsing resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Resume Parser</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Upload your resume (PDF, DOCX, DOC)
              </p>
              <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
                <span>Select File</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {fileName && (
            <div className="flex items-center space-x-2 text-sm">
              <FileText className="h-4 w-4 text-blue-500" />
              <span>{fileName}</span>
              {file && (
                <Button 
                  onClick={handleUpload} 
                  disabled={loading}
                  className="ml-auto"
                >
                  {loading ? 'Parsing...' : 'Parse Resume'}
                </Button>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-center space-x-2 text-sm text-red-500 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {parsedData && (
            <div className="mt-6 border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Parsed Resume Data
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Personal Information</h4>
                  <p><strong>Name:</strong> {parsedData.data?.attributes?.result?.candidate_name || 'N/A'}</p>
                  <p><strong>Email:</strong> {parsedData.data?.attributes?.result?.candidate_email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {parsedData.data?.attributes?.result?.candidate_phone || 'N/A'}</p>
                </div>
                
                {parsedData.data?.attributes?.result?.skills && parsedData.data.attributes.result.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.data.attributes.result.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {parsedData.data?.attributes?.result?.education_qualifications && parsedData.data.attributes.result.education_qualifications.length > 0 && (
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {parsedData.data.attributes.result.education_qualifications.map((edu, index) => (
                        <li key={index}>
                          {edu.degree_type || ''} {edu.specialization_subjects ? `in ${edu.specialization_subjects}` : ''} {edu.school_name ? `at ${edu.school_name}` : ''}
                          {edu.end_date ? ` (${edu.end_date.split('-')[0]})` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {parsedData.data?.attributes?.result?.positions && parsedData.data.attributes.result.positions.length > 0 && (
                  <div>
                    <h4 className="font-medium">Experience</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {parsedData.data.attributes.result.positions.map((exp, index) => (
                        <li key={index}>
                          {exp.position_name || ''} {exp.company_name ? `at ${exp.company_name}` : ''}
                          {exp.start_date && exp.end_date ? ` (${exp.start_date.split('-')[0]} - ${exp.end_date.split('-')[0] || 'Present'})` : ''}
                          <p className="ml-6 text-sm text-gray-600">{exp.job_details || ''}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUploader;