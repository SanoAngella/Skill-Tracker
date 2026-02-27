import { useState, useEffect } from 'react';
import { useParams, Link useNavigate } from "react-router-dom";

const SkillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/skills/${id}`)
      .then((res) => res.json())
      .then((data) => setSkill(data))
      .catch((err) => console.error('Error fetching skill:', err));
  }, [id]);

  if(!skill) {
    return <div>Loading...</div>
  }
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/skills/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert("Skill deleted successfully!");
        navigate("/");
      } else {
        alert(`Failed to delete skill: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert("An error occurred while deleting the skill.");
    }
  }
  return (
    <div style={{ padding: "20px"}}>
      <h1>Skill Details</h1> 

      {!skill ? (
        <p>Loading skill information...</p>
      ) : ( 
        <div style={{ border: "1px solid #dddee0", borderRadius: "8px", padding: "20px", maxWidth: "400px" }}>
          <h2>Name: {skill.name}</h2>
          <p>Proficiency Level: <strong>{skill.level}</strong></p>
      )}

    </div>
  )
}