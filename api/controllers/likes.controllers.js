const Like = require("../models/like.model");

module.exports.toggle = (req, res, next) => {
  const params = {
    project: req.params.id,
    student: "642f01f89976f8ca4da9be66", // TODO: add auth. req.user.id,
  };

  Like.findOne(params)
    .then((like) => {
      if (like) {
        return Like.deleteOne({ _id: like.id });
      } else {
        return Like.create(params);
      }
    })
    .then((like) => res.json(like))
    .catch(next);
};