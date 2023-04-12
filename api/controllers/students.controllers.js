const Student = require("../models/student.model");
const mailer = require("../config/mailer.config");

module.exports.list = (req, res, next) => {
  Student.find() // TODO: filters
    .populate("projects")
    .then((students) => res.json(students))
    .catch(next);
};

module.exports.create = (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      mailer.sendConfirmationEmail(student);
      res.status(201).json(student);
    })
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

module.exports.confirm = (req, res, next) => {
  req.student.confirm = true;

  req.student
    .save()
    .then((student) => {
      res.redirect(`${process.env.WEB_URL}/login`);
    })
    .catch(next);
};

