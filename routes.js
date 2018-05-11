// Import frameworks
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// Handle sending an email through the contact form
router.post('/contact', (req, res) => {
  // Ensure environment variables are in place
  if (!process.env.EMAIL) res.send({success: false, error: 'EMAIL not found'});
  if (!process.env.SENDGRID_API_KEY) res.send({success: false, error: 'SENDGRID_API_KEY not found'});
  const msg = {
    to: process.env.EMAIL,
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg)
    .then(() => {
      // Celebrate
    })
    .catch(error => {
      // TODO
    });
});

// TODO other routes

// Handle 404 error
router.get('*', (req, res) => res.render('not-found', {
  title: 'Cameron Cabo',
}));

// Export the router
module.exports = router;
