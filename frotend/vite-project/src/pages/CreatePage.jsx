import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [skillName, setSkillName] = useState('');
  const [status, setStatus] = useState('Beginner');
  const navigate = useNavigate();

  const handleCreate = () => {
    // We will add the database save logic here next
    navigate("/");
  };

  return (
    <div>
      <h1>Create new Skill</h1>
      <input 
        type="text" 
        placeholder="Skill Name" 
        value={skillName} 
        onChange={(e) => setSkillName(e.target.value)} 
      />
      <button onClick={handleCreate}>Create Skill</button>
    </div>
  );
};

export default CreatePage;