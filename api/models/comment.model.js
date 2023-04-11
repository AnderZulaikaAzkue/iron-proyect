const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: "Comment text is required",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: "Comment project is required",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: "Comment author is required",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;