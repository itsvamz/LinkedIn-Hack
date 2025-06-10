
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    
    try {
      await login(formData);
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      
      const redirectPath = formData.role === 'recruiter' ? '/recruiter-dashboard' : '/user-dashboard';
      navigate(redirectPath);
    } catch (error: Error | unknown) {
      toast({
        title: "Login failed",
        description: (error as Error & { response?: { data?: { msg?: string } } }).response?.data?.msg || "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AVIRI</span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          <Card className="border-gray-200 shadow-xl bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center justify-center text-blue-800">
                <LogIn className="w-5 h-5 mr-2 text-blue-600" />
                Sign In
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs 
                defaultValue="user" 
                className="w-full"
                onValueChange={(value) => handleRoleChange(value as 'user' | 'recruiter')}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                  <TabsTrigger value="user" className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <User className="w-4 h-4 mr-2" />
                    Job Seeker
                  </TabsTrigger>
                  <TabsTrigger value="recruiter" className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <Building2 className="w-4 h-4 mr-2" />
                    Recruiter
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="user-email" className="text-sm font-semibold text-gray-700">Email address</Label>
                      <Input
                        id="user-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="mt-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="user-password" className="text-sm font-semibold text-gray-700">Password</Label>
                      <Input
                        id="user-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                        className="mt-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign in as Job Seeker'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="recruiter">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="recruiter-email" className="text-sm font-semibold text-gray-700">Email address</Label>
                      <Input
                        id="recruiter-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="mt-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="recruiter-password" className="text-sm font-semibold text-gray-700">Password</Label>
                      <Input
                        id="recruiter-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                        className="mt-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign in as Recruiter'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
