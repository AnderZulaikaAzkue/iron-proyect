const Student = require("../models/student.model");
const createError = require("http-errors");

module.exports.exists = (req, res, next) => {
  const studentId = req.params.studentId || req.params.id;

  Student.findById(studentId)
    .populate("projects")
    .then((student) => {
      if (student) {
        req.student = student;
        next();
      } else {
        next(createError(404, "Student not found"));
      }
    })
    .catch(next);
};