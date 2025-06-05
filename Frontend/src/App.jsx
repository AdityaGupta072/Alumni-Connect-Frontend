import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import FacultyDashboard from './components/FacultyDashboard';
import AlumniDashboard from './components/AlumniDashboard';
import StudentDashboard from './components/StudentDashboard';
import AnnouncementPage from './components/AnnouncementPage'; 
import AnnouncementForm from './components/AnnouncementForm'; // Import the form component

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Role based dashboard */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        {/* Announcement Page */}
        <Route path="/announcement-page" element={<AnnouncementPage />} />
        {/* Create Announcement Form */}
        <Route path="/create-announcement" element={<AnnouncementForm />} />
      </Routes>
    </Router>
  );
}

export default App;
