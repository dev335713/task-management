const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate('members tasks');
  res.json(projects);
};
