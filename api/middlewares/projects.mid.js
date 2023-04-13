const Project = require('../models/project.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  const projectId = req.params.projectId || req.params.id;
  Project.findById(projectId)
    .populate("comments")
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        next(createError(404, 'Project not found'))
      }
    })
    .catch(next)
}

module.exports.checkAuthor = (req, res, next) => {
  if (
    !req.project.authors
      .map((x) => x.toString())
      .includes(req.user.id.toString())
  ) {
    next(createError(403, "Forbidden"));
  } else {
    next;
  }
};