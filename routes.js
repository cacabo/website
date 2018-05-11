// Import frameworks
const express = require('express');
const router = express.Router();

// Import json
const education = require('./src/json/education');
const experiences = require('./src/json/experiences');
const extracurriculars = require('./src/json/extracurriculars');

// Base URL
router.get('/', (req, res) => res.render('index', {
  title: 'Cameron Cabo',
  education,
  experiences,
  extracurriculars,
}));

// TODO other routes

// Handle 404 error
router.get('*', (req, res) => res.render('not-found', {
  title: 'Cameron Cabo',
}));

// Export the router
module.exports = router;
