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
    <div className="card form-card">
      <h1>Create New Skill</h1>
      
      <div className="field">
        <label className="label">Skill Title</label>
        <input
          className="input"
          type="text" 
          placeholder="e.g. JavaScript" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="label">Proficiency (1-10)</label>
        <input
          className="input"
          type="number"
          min="1"
          max="10"
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="label">Status</label>
        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To-Learn">To-Learn</option>
          <option value="Learning">Learning</option>
          <option value="Mastered">Mastered</option>
        </select>
      </div>
      
      <button
        className="btn btn-primary"
        onClick={handleCreate}
      >
        Save Skill
      </button>
    </div>
  );
};

export default CreatePage;
