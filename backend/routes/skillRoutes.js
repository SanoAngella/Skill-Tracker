import express from 'express';
import { 
    getAllSkills, 
    createSkills, 
    updateSkills, 
    deleteSkills, 
    getSkillById 
} from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/', createSkills);
router.put('/:id', updateSkills);
router.delete('/:id', deleteSkills);

export default router;