const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: "Like project is required",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: "Like student is required",
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

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;