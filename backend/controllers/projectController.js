const Project = require("../models/Project");

// GET ALL
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// CREATE
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      githubUrl,
      liveUrl,
      techStack,
      featured,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description required",
      });
    }

    const project = await Project.create({
      title,
      description,
      image,
      githubUrl,
      liveUrl,
      techStack,
      featured,
    });

    res.status(201).json({
      success: true,
      message: "Project created",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  deleteProject,
  getProjectById: async () => {},
  updateProject: async () => {},
};