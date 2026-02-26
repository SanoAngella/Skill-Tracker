import { useParams, Link } from "react-router-dom";

const SkillDetailPage = () => {
  // This "grabs" the id from the URL (e.g., /skill/123)
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Skill Details</h1>
      <p>Currently viewing Skill ID: <strong>{id}</strong></p>
      
      <hr />
      <p style={{ color: "gray" }}>
        (Next, we will use this ID to fetch the full skill data from the database.)
      </p>

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default SkillDetailPage;