import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSkills } from "../api/skillsApi";

const HomePage = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills()
      .then((data) => setSkills(data))
      .catch((err) => console.log("Error fetching skills:", err.message));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>My Skills</h1>
        <Link to="/create">
          <button style={{ padding: "10px", cursor: "pointer" }}>+ Add New Skill</button>
        </Link>
      </header>

      <hr />

      {skills.length === 0 ? (
        <p>No skills added yet. Click the button above to start!</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
          {skills.map((skill) => (
            <div key={skill._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
              <h3>{skill.title}</h3>
              <p>Proficiency: <strong>{skill.proficiency}</strong></p>
              <p>Status: <strong>{skill.status}</strong></p>
              <Link to={`/skill/${skill._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
