const mongoose = require('mongoose');
const { isValidUrl } = require('../utils/validations');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: 'Project title is required',
    minlength: [3, 'Project title needs at least 3 chars']
  },
  description: {
    type: String,
    required: 'Project description is required',
    minlength: [10, 'Project description needs at least 10 chars']
  },
  authors: [{
    type: String,
    minlength: [2, 'Project author needs at least 2 chars']
  }],
  tags: [String],
  githubUrl: {
    type: String,
    required: 'Project GitHub url is required',
    validate: {
      validator: isValidUrl,
      message: 'Not a valid GitHub url'
    }
  },
  imageUrl: {
    type: String,
    required: 'Project image url is required',
    validate: {
      validator: isValidUrl,
      message: 'Not a valid url'
    }
  },
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
