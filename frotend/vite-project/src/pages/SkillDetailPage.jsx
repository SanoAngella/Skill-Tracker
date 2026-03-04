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
    return <div>Loading skill information...</div>;
  }

  return (
    <div>
      <h1>Skill Details</h1>

      <div className="card form-card">
        <h2>Title: {skill.title}</h2>
        <p>Proficiency: <strong>{skill.proficiency}</strong></p>
        <p>Status: <strong>{skill.status}</strong></p>
        <div className="actions">
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete Skill
          </button>
          <Link className="text-link" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;
