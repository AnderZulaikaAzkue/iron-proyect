const Student = require("../models/student.model");

module.exports.list = (req, res, next) => {
  Student.find() // TODO: filters
    .populate("projects")
    .then((students) => res.json(students))
    .catch(next);
};

module.exports.create = (req, res, next) => {
  Student.create(req.body)
    .then((student) => res.status(201).json(student))
    .catch(next);
};

module.exports.detail = (req, res, next) => res.json(req.student);

module.exports.delete = (req, res, next) => {
  Student.deleteOne({ _id: req.student.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Object.assign(req.student, req.body);
  req.student
    .save()
    .then((student) => res.json(student))
    .catch(next);
};