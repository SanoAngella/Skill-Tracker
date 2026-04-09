import Skill from '../models/skillModel.js';

const normalizeCreateInput = (body = {}) => {
   const title = (body.title ?? body.name ?? "").trim();
   const proficiencyRaw = body.proficiency ?? body.level;
   const proficiency = Number(proficiencyRaw);
   const status = body.status ?? "To-Learn";

   return { title, proficiency, status };
};

const validateCreateInput = ({ title, proficiency, status }) => {
   if (!title) {
      return "Title is required";
   }

   if (!Number.isFinite(proficiency)) {
      return "Proficiency must be a number";
   }

   if (proficiency < 0 || proficiency > 10) {
      return "Proficiency must be between 0 and 10";
   }

   const allowedStatuses = ["To-Learn", "Learning", "Mastered"];
   if (!allowedStatuses.includes(status)) {
      return "Status must be one of: To-Learn, Learning, Mastered";
   }

   return null;
};

// Get all skills 
export const getAllSkills = async (req, res) => {
   try {
      const  skills = await Skill.find({}).sort({ createdAt: -1 }); 
      res.status(200).json({ success: true, data: skills });
   } catch (error) {
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
   }
};

// Get a single skill by ID
export const getSkillById = async (req, res) => {
    const { id } = req.params;
    try {
        const skill = await Skill.findById(id);
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Create a new skill
export const createSkills = async (req, res) => {
   const { title, proficiency, status } = normalizeCreateInput(req.body);
   const validationError = validateCreateInput({ title, proficiency, status });

   if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
   }

   try {
      const newSkill = new Skill({ title, proficiency, status });
      await newSkill.save();
      res.status(201).json({ success: true, data: newSkill });
   } catch (error) {
      console.error("Error creating skill:", error.message);
      if (error.code === 11000) {
         return res.status(409).json({ success: false, message: "Skill title already exists" });
      }
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
   }
};

// Update a skill
export const updateSkills = async (req, res) => {
   const { id } = req.params;
   const skill = req.body;

   try {
      const updatedSkill = await Skill.findByIdAndUpdate(id, skill, { new: true });

      if (!updatedSkill) {
         return res.status(404).json({ success: false, message: "Skill not found" });
      }
      res.status(200).json({ success: true, data: updatedSkill });
   } catch (error) {
      console.error("Error in updating skill:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
   }
};

// Delete a skill
export const deleteSkills = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedSkill = await Skill.findByIdAndDelete(id);
      if (!deletedSkill) {
         return res.status(404).json({ success: false, message: "Skill not found" });
      }
      res.status(200).json({ success: true, message: "Skill deleted successfully" });
   } catch (error) {
      console.error("Error in deleting skill:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
   }
};
