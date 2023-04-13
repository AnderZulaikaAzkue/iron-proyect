const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects.controllers');
const students = require("../controllers/students.controllers");
const comments = require("../controllers/comments.controllers");
const likes = require("../controllers/likes.controllers");
const secure = require("../middlewares/secure.mid");
const projectsMid = require('../middlewares/projects.mid');
const studentsMid = require("../middlewares/students.mid");
const commentsMid = require("../middlewares/comments.mid");
const cohorts = require("../controllers/cohorts.controllers");

const todo = (req, res, next) => {
  res.send ("TODO");
}

router.post(
  "/projects/:id/like",
  secure.auth,
  projectsMid.exists,
  likes.toggle
  );

  router.post(
    "/projects/:id/comment",
    secure.auth,
    projectsMid.exists,
    comments.create
  );

  router.patch(
    "/projects/:id/comment/:commentId",
    secure.auth,
    projectsMid.exists,
    commentsMid.exists,
    commentsMid.checkAuthor,
    comments.update
  );
  router.delete(
    "/projects/:id/comment/:commentId",
    secure.auth,
    projectsMid.exists,
    commentsMid.exists,
    commentsMid.checkAuthor,
    comments.delete
  );

router.get('/projects', projects.list);
router.post("/projects", secure.auth, projects.create);
router.get('/projects/:id', projectsMid.exists, projects.detail);
router.get("/students/:id/confirm", studentsMid.exists, students.confirm);
router.delete(
  "/projects/:id",
  secure.auth,
  projectsMid.exists,
  projectsMid.checkAuthor,
  projects.delete
);
router.patch(
  "/projects/:id",
  secure.auth,
  projectsMid.exists,
  projectsMid.checkAuthor,
  projects.update
);

router.get("/students", students.list);
router.post("/students", students.create);
router.get("/students/:id/confirm", studentsMid.exists, students.confirm);
router.patch("/students/:id", secure.auth, students.update);
router.delete("/students/:id", secure.auth, students.delete);

router.post("/login", students.login);

router.get("/cohorts", cohorts.list);
router.get("/cohorts/:id", cohorts.detail);

module.exports = router;