module.exports.cleanBody = (req, res, next) => {
  // protect some body fields from being sent

  if (req.body) {
    delete req.body._id;
    delete req.body.author;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.confirm;
  }

  next();
};