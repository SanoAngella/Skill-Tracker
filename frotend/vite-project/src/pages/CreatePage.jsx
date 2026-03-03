import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSkill } from "../api/skillsApi";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState(1);
  const [status, setStatus] = useState("To-Learn");
  const navigate = useNavigate();

  
const handleCreate = async (e) => {
    if (e) e.preventDefault();

    try {
      await createSkill({ title, proficiency: Number(proficiency), status });
      alert("Skill created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Create skill error:", error);
      alert(error.message || "Could not connect to the server. Is your backend running?");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h1>Create New Skill</h1>
      
      <div style={{ marginBottom: "15px" }}>
        <label>Skill Title:</label><br />
        <input 
          type="text" 
          placeholder="e.g. JavaScript" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Proficiency (1-10):</label><br />
        <input
          type="number"
          min="1"
          max="10"
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Status:</label><br />
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          <option value="To-Learn">To-Learn</option>
          <option value="Learning">Learning</option>
          <option value="Mastered">Mastered</option>
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
