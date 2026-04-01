const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, level } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const skill = await Skill.create({ name, level });

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create skill",
      error: error.message,
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill",
      error: error.message,
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

    if (!deletedSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};