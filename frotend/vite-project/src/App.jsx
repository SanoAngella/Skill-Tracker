// import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import SkillDetailPage from "./pages/SkillDetailPage";

// Simple Navbar component for navigation
const Navbar = () => (
  <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '15px' }}>
    <Link to="/">Home</Link>
    <Link to="/create">Create Skill</Link>
  </nav>
);

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      
      {/* Main Content Area */}
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/skill/:id" element={<SkillDetailPage />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h2>404 - Page Not Found</h2>
              <Link to="/">Go back home</Link>
            </div>
          } />
        </Routes> 
      </main>
    </div>
  );
};

export default App;