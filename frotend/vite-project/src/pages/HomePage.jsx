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
    <div>
      <header className="page-header">
        <h1>My Skills</h1>
        <Link to="/create" className="text-link">
          <button className="btn btn-primary">+ Add New Skill</button>
        </Link>
      </header>

      <hr />

      {skills.length === 0 ? (
        <p className="empty-state">No skills added yet. Click the button above to start.</p>
      ) : (
        <div className="grid">
          {skills.map((skill) => (
            <div key={skill._id} className="card">
              <h3>{skill.title}</h3>
              <p>Proficiency: <strong>{skill.proficiency}</strong></p>
              <p>Status: <strong>{skill.status}</strong></p>
              <Link className="text-link" to={`/skill/${skill._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
