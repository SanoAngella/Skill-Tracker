import React from 'react'

import HomePage  from './Pages/HomePage'; 
import CreatePage from './Pages/CreatePage';
import SkillDetailPage from './Pages/SkillDetailPage';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/note/:id" element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  )
}

export default HomePage
