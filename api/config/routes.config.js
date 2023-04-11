const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects.controllers');
const students = require("../controllers/students.controllers");
const comments = require("../controllers/comments.controllers");
const likes = require("../controllers/likes.controllers");
const projectsMid = require('../middlewares/projects.mid');
const studentsMid = require("../middlewares/students.mid");
const commentsMid = require("../middlewares/comments.mid");

const todo = (req, res, next) => {
  res.send ("TODO");
}

router.post("/projects/:id/like", projectsMid.exists, likes.toggle);

router.post("/projects/:id/comment", projectsMid.exists, comments.create);
router.patch(
  "/projects/:id/comment/:commentId",
  projectsMid.exists,
  commentsMid.exists,
  comments.update
);
router.delete(
  "/projects/:id/comment/:commentId",
  projectsMid.exists,
  commentsMid.exists,
  comments.delete
);

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