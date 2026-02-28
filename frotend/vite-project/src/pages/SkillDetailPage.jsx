import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteSkill, getSkillById } from "../api/skillsApi";

const SkillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    getSkillById(id)
      .then((data) => setSkill(data))
      .catch((err) => console.error("Error fetching skill:", err.message));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteSkill(id);
      alert("Skill deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert(error.message || "An error occurred while deleting the skill.");
    }
  };

  if (!skill) {
    return <div style={{ padding: "20px" }}>Loading skill information...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Skill Details</h1>

      <div style={{ border: "1px solid #dddee0", borderRadius: "8px", padding: "20px", maxWidth: "450px" }}>
        <h2>Title: {skill.title}</h2>
        <p>Proficiency: <strong>{skill.proficiency}</strong></p>
        <p>Status: <strong>{skill.status}</strong></p>
        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button
            onClick={handleDelete}
            style={{ padding: "10px 14px", cursor: "pointer", backgroundColor: "#c62828", color: "white", border: "none", borderRadius: "4px" }}
          >
            Delete Skill
          </button>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;
