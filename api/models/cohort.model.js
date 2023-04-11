const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema(
  {
    start: {
      type: Date,
      required: "Cohort start date is required",
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: "Cohort location is required",
      enum: ["Madrid", "Remote"],
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

cohortSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "cohort",
  justOne: false,
});

const Cohort = mongoose.model("Cohort", cohortSchema);
module.exports = Cohort;