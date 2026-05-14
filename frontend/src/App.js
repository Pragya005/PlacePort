import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Student
import StudentDashboard from './pages/student/Dashboard';
import ProfileSetup from './pages/student/ProfileSetup';
import BrowseJobs from './pages/student/BrowseJobs';
import AppliedJobs from './pages/student/AppliedJobs';

// Faculty
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyStudents from './pages/faculty/Students';
import FacultyJobs from './pages/faculty/Jobs';
import FacultyCompanies from './pages/faculty/Companies';
import RegisterCompany from './pages/faculty/RegisterCompany';

// Company
import CompanyDashboard from './pages/company/Dashboard';
import PostJob from './pages/company/PostJob';
import MyJobs from './pages/company/MyJobs';

function RootRedirect() {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role === 'student') return <Navigate to="/student/dashboard" />;
  if (role === 'faculty') return <Navigate to="/faculty/dashboard" />;
  if (role === 'company') return <Navigate to="/company/dashboard" />;
  return <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student routes */}
          <Route path="/student/profile-setup" element={
            <ProtectedRoute allowedRole="student"><ProfileSetup /></ProtectedRoute>
          } />
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/student/jobs" element={
            <ProtectedRoute allowedRole="student"><BrowseJobs /></ProtectedRoute>
          } />
          <Route path="/student/applied" element={
            <ProtectedRoute allowedRole="student"><AppliedJobs /></ProtectedRoute>
          } />

          {/* Faculty routes */}
          <Route path="/faculty/dashboard" element={
            <ProtectedRoute allowedRole="faculty"><FacultyDashboard /></ProtectedRoute>
          } />
          <Route path="/faculty/students" element={
            <ProtectedRoute allowedRole="faculty"><FacultyStudents /></ProtectedRoute>
          } />
          <Route path="/faculty/jobs" element={
            <ProtectedRoute allowedRole="faculty"><FacultyJobs /></ProtectedRoute>
          } />
          <Route path="/faculty/companies" element={
            <ProtectedRoute allowedRole="faculty"><FacultyCompanies /></ProtectedRoute>
          } />
          <Route path="/faculty/register-company" element={
            <ProtectedRoute allowedRole="faculty"><RegisterCompany /></ProtectedRoute>
          } />

          {/* Company routes */}
          <Route path="/company/dashboard" element={
            <ProtectedRoute allowedRole="company"><CompanyDashboard /></ProtectedRoute>
          } />
          <Route path="/company/post-job" element={
            <ProtectedRoute allowedRole="company"><PostJob /></ProtectedRoute>
          } />
          <Route path="/company/jobs" element={
            <ProtectedRoute allowedRole="company"><MyJobs /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}