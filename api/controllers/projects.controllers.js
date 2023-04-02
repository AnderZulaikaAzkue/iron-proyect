const Project = require('../models/project.model');

module.exports.list = (req, res, next) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  console.log(req.body);
  Project.create(req.body)
    .then((project) => res.status(201).json(project))
    .catch(next)
}