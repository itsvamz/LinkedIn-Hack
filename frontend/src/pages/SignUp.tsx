import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'recruiter'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: 'user' | 'recruiter') => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to appropriate dashboard
      const redirectPath = formData.role === 'recruiter' ? '/recruiter-dashboard' : '/user-dashboard';
      navigate(redirectPath);
    } // In the catch block of handleSubmit
    catch (error: Error | unknown) {
      toast({
        title: "Registration failed",
        description: (error as Error & { response?: { data?: { msg?: string } } }).response?.data?.msg || "Could not create account. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-violet-600 hover:text-violet-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="border-violet-100 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription>
              Join TalentFlow and start showcasing your talent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="user" 
              className="w-full"
              onValueChange={(value) => handleRoleChange(value as 'user' | 'recruiter')}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger value="recruiter" className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  Recruiter
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="user-fullName">Full Name</Label>
                    <Input
                      id="user-fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="user-email">Email address</Label>
                    <Input
                      id="user-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="user-confirmPassword">Confirm Password</Label>
                    <Input
                      id="user-confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign up as Job Seeker'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="recruiter">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="recruiter-fullName">Full Name</Label>
                    <Input
                      id="recruiter-fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recruiter-email">Email address</Label>
                    <Input
                      id="recruiter-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="recruiter-password">Password</Label>
                    <Input
                      id="recruiter-password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recruiter-confirmPassword">Confirm Password</Label>
                    <Input
                      id="recruiter-confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                      className="focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign up as Recruiter'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;