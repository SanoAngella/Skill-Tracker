import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const SkillDetailPage = () => {
  const { id } = useParams();
  
  const [skill, setSkill] = useState(null);

  // 2. Add a trigger to fetch the skill from the backend when the page opens
  useEffect(() => {
    fetch(`http://localhost:5002/api/skills/${id}`)
      .then((res) => res.json())
      .then((data) => setSkill(data))
      .catch((err) => console.log("Error fetching skill:", err));
  }, [id]); 

  return (
    <div style={{ padding: "20px" }}>
      <h1>Skill Details</h1>

      {/* 3. Logic to show a loading message until the data arrives */}
      {!skill ? (
        <p>Loading skill information...</p>
      ) : (
        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <h2>Name: {skill.name}</h2>
          <p>Proficiency Level: <strong>{skill.level}</strong></p>
          <p>Database ID: {id}</p>
        </div>
      )}

      <br />
      <Link to="/">
        <button style={{ cursor: "pointer", padding: "8px 16px" }}>Back to Home</button>
      </Link>
    </div>
  );
};

export default SkillDetailPage;