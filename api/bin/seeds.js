require("../config/db.config");
const Cohort = require("../models/cohort.model");

Cohort.create([
  {
    start: new Date(),
    description: "MERN stack",
    location: "Remote",
  },
])
  .then(() => {
    console.log("cohort created!");
  })
  .catch((err) => {
    console.error(err);
  });