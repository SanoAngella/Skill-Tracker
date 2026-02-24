import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Beginner');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    if (e) e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, level }), 
      });

      if (response.ok) {
        alert("Skill created successfully!");
        navigate("/"); 
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to save skill"}`);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the server. Is your backend running?");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h1>Create New Skill</h1>
      
      <div style={{ marginBottom: "15px" }}>
        <label>Skill Name:</label><br />
        <input 
          type="text" 
          placeholder="e.g. JavaScript" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Skill Level:</label><br />
        <select 
          value={level} 
          onChange={(e) => setLevel(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      
      <button 
        onClick={handleCreate}
        style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}
      >
        Save Skill
      </button>
    </div>
  );
};

export default CreatePage;