import React from "react";
import { useNavigate} from "react-router-dom";

const CreatePage = () => {
<<<<<<< HEAD
  const [skillName, setSkillName] = useState('');
  const [level, setLevel]= useState('Beginner')
  const navigate = useNavigate();

}
=======
  const navigate = useNavigate();
  const handleCreate = () =>{
    // simulate skill creation
    setTimeout(() => {
      navigate("/");

    })
  }
  return (
    <div>
      <h1>Create new Skill</h1>
      <button onClick={handleCreate}>Create Skill</button>


    </div>

  )
}

export default CreatePage
>>>>>>> 82f2696 (react changes)
