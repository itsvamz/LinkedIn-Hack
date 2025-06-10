
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AccessibilityPanel from "./components/AccessibilityPanel";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import ViewCandidates from "./pages/ViewCandidates";
import Leaderboard from "./pages/Leaderboard";
import Carousel from "./pages/Carousel";
import About from "./pages/About";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import BookmarkedCandidates from "./pages/BookmarkedCandidates";
import JobManagement from "./pages/JobManagement";
import JobApplication from "./pages/JobApplication";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Jobs from "./pages/Jobs";
import Recruiters from "./pages/Recruiters";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col w-full">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/user-dashboard" element={
                  <ProtectedRoute requiredRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/recruiter-dashboard" element={
                  <ProtectedRoute requiredRole="recruiter">
                    <RecruiterDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/bookmarked-candidates" element={
                  <ProtectedRoute requiredRole="recruiter">
                    <BookmarkedCandidates />
                  </ProtectedRoute>
                } />
                <Route path="/job-management" element={
                  <ProtectedRoute requiredRole="recruiter">
                    <JobManagement />
                  </ProtectedRoute>
                } />
                <Route path="/job-application" element={
                  <ProtectedRoute requiredRole="user">
                    <JobApplication />
                  </ProtectedRoute>
                } />
                <Route path="/users" element={<Users />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/recruiters" element={<Recruiters />} />
                <Route path="/candidates" element={
                  <ProtectedRoute requiredRole="recruiter">
                    <ViewCandidates />
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/carousel" element={<Carousel />} />
                <Route path="/about" element={<About />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
