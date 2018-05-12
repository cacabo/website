// Import frameworks
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Import json
const education = require('./src/json/education');
const experiences = require('./src/json/experiences');
const extracurriculars = require('./src/json/extracurriculars');
const posts = require('./src/json/posts');

// Homepage
router.get('/', (req, res) => res.render('home', {
  title: 'Cameron Cabo',
  education,
  experiences,
  extracurriculars,
}));

// Freelancing
router.get('/freelancing', (req, res) => res.render('freelancing'));

// Listing all posts
router.get('/posts', (req, res) => res.render('posts', {
  title: 'Cameron Cabo | Posts',
  posts,
}));

// Rendering a specific post
router.get('/posts/:slug', (req, res) => {
  // Isolate the slug from the URL
  const slug = req.params.slug;

  // Find posts with the same slug, if there are any
  const filteredPosts = posts.filter(post => post.slug === slug);
  if (filteredPosts && filteredPosts.length) {
    const post = filteredPosts[0];
    const {
      title,
      subtitle,
      image,
      updatedAt,
      createdAt,
    } = post;
    res.render('post', {
      title,
      subtitle,
      image,
      createdAt,
      updatedAt,
      partial: `posts/${slug}`,
    });
  } else {
    // Else, the slug was not matched, render the not found route
    res.render('not-found', {
      title: 'Cameron Cabo | Not Found',
    });
  }
});

// Handle sending an email through the contact form
router.post('/contact', (req, res) => {
  // Ensure environment variables are in place
  let error = '';
  if (!process.env.EMAIL) error = 'EMAIL not found';
  else if (!process.env.SENDGRID_API_KEY) error = 'SENDGRID_API_KEY not found';
  if (error) {
    res.send({success: false, error});
    return;
  }

  // Parse variables from the body
  const {
    firstName,
    lastName,
    email,
    subject,
    body,
  } = req.body;

  // Error checking on parameters
  if (!firstName) error = 'First name must be populated';
  else if (!lastName) error = 'Last name must be populated';
  else if (!email) error = 'Email must be populated';
  else if (!body) error = 'Body must be populated';
  else if (!subject) error = 'Subject must be populated';
  else if (firstName.length > 100) error = 'First name limited to 100 characters';
  else if (lastName.length > 100) error = 'Last name limited to 100 characters';
  else if (email.length > 150) error = 'Email limited to 150 characters';
  else if (subject.length > 200) error = 'Subject limited to 200 characters';
  else if (body.length > 10000) error = 'Body limited to 10,000 characters';

  // Relay information back to the website
  if (error) {
    res.send({success: false, error});
    return;
  }

  // Construct the message
  const msg = {
    to: process.env.EMAIL,
    from: email,
    subject,
    text: body,
    html: body,
  };

  // Send the message
  sgMail.send(msg)
    .then(() => res.send({success: true}))
    .catch(sendgridError => {
      res.send({success: false, error: sendgridError.message});
    });
});

// TODO other routes

// Handle 404 error
router.get('*', (req, res) => res.render('not-found', {
  title: 'Cameron Cabo | Not Found',
}));

// Export the router
module.exports = router;
