import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [skills, setSkills] = useState([]); // This starts as an empty list

  // This runs automatically when the page loads
  useEffect(() => {
    fetch("http://localhost:5002/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.log("Error fetching skills:", err));
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

      {/* This checks if you have skills. If not, it shows a message */}
      {skills.length === 0 ? (
        <p>No skills added yet. Click the button above to start!</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
          {skills.map((skill) => (
            <div key={skill._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
              <h3>{skill.name}</h3>
              <p>Level: <strong>{skill.level}</strong></p>
              <Link to={`/skill/${skill._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;