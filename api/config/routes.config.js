const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects.controllers');
const students = require("../controllers/students.controllers");
const projectsMid = require('../middlewares/projects.mid');
const studentsMid = require("../middlewares/students.mid");

const todo = (req, res, next) => {
  res.send ("TODO");
}

router.get('/projects', projects.list);
router.post('/projects', projects.create);
router.get('/projects/:id', projectsMid.exists, projects.detail);
router.delete('/projects/:id', projectsMid.exists, projects.delete);
router.patch('/projects/:id', projectsMid.exists, projects.update);

router.get("/students", students.list);
router.post("/students", students.create);
router.get("/students/:id", studentsMid.exists, students.detail);
router.patch("/students/:id", studentsMid.exists, students.update);
router.delete("/students/:id", studentsMid.exists, students.delete);

module.exports = router;