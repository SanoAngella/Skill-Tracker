import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import SkillDetailPage from "./pages/SkillDetailPage"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/skill/:id" element={<SkillDetailPage />} />
      </Routes> 
    </div>
  )
}

export default App
