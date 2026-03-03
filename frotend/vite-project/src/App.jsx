// import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import SkillDetailPage from "./pages/SkillDetailPage";
import "./App.css";

// Simple Navbar component for navigation
const Navbar = () => (
  <nav className="navbar">
    <Link className="nav-link" to="/">Home</Link>
    <Link className="nav-link" to="/create">Create Skill</Link>
  </nav>
);

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/skill/:id" element={<SkillDetailPage />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={
            <div className="empty-state">
              <h2>404 - Page Not Found</h2>
              <Link className="text-link" to="/">Go back home</Link>
            </div>
          } />
        </Routes> 
      </main>
    </div>
  );
};

export default App;
