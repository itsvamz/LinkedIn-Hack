
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'candidate' | 'recruiter'>('candidate');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up form submitted:', { ...formData, userType });
    
    // Store user data in localStorage for demo purposes
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', formData.fullName);
    localStorage.setItem('userRole', userType);
    
    // Redirect based on user type
    if (userType === 'recruiter') {
      window.location.href = '/recruiter-dashboard';
    } else {
      window.location.href = '/user-dashboard';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center p-8"
        >
          <div className="mb-8">
            <Link to="/" className="flex items-center mb-6">
              <div className="text-center">
                <span className="text-3xl font-bold text-blue-600">AVIRI</span>
                <p className="text-sm text-gray-600">Authentic Virtual Identity Recruitment Interface</p>
              </div>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join the Future of Recruitment
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Connect with top talent or find your dream job through our innovative platform
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              'AI-powered matching algorithm',
              'Interactive video pitch presentations',
              'Real-time communication tools',
              'Advanced analytics and insights'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <Card className="w-full max-w-md border-gray-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
              <CardDescription className="text-gray-600">
                Choose your account type and get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">I am a:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('candidate')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        userType === 'candidate'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <User className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Candidate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('recruiter')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        userType === 'recruiter'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Recruiter</span>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative mt-1">
                      <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {userType === 'recruiter' && (
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                        Company
                      </Label>
                      <div className="relative mt-1">
                        <Building2 className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
