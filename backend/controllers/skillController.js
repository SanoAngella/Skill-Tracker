import Skill from '../models/skillModel.js';

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
   const { title, proficiency, status } = req.body;

   if (!title || !proficiency || !status) {
      return res.status(400).json({ success: false, message: "Please provide valid fields" });
   }

   try {
      const newSkill = new Skill({ title, proficiency, status });
      await newSkill.save();
      res.status(201).json({ success: true, data: newSkill });
   } catch (error) {
      console.error("Error creating skill:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
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