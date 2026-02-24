import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [skillName, setSkillName] = useState('');
  const [level, setLevel] = useState('Beginner');
  const navigate = useNavigate();

  const handleCreate = () => {
    
    setTimeout(() => {
      navigate("/");
    }, 500);
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