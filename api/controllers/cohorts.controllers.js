const Cohort = require("../models/cohort.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Cohort.find() // TODO: filters
    .populate("students")
    .then((cohorts) => res.json(cohorts))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Cohort.findById(req.params.id)
    .populate("students")
    .then((cohort) => {
      if (!cohort) {
        return next(createError(404, "Cohort not found"));
      }
      res.json(cohort);
    })
    .catch(next);
};