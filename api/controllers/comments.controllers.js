const Comment = require("../models/comment.model");

module.exports.create = (req, res, next) => {
  Comment.create({
    text: req.body.text,
    project: req.params.id,
    author: "642f01f89976f8ca4da9be66", // TODO: add auth. req.user.id,
  })
    .then((comment) => res.json(comment))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Object.assign(req.comment, req.body);

  req.comment
    .save()
    .then((comment) => res.json(comment))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Comment.deleteOne({ _id: req.comment.id })
    .then(() => res.status(204).send())
    .catch(next);
};