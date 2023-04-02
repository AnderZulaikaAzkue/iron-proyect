const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects.controllers');
const projectsMid = require('../middlewares/projects.mid');

router.get('/projects', projects.list);
router.post('/projects', projects.create);
router.get('/projects/:id', projectsMid.exists, projects.detail);
router.delete('/projects/:id', projectsMid.exists, projects.delete);
router.patch('/projects/:id', projectsMid.exists, projects.update);

module.exports = router;