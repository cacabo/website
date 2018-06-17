// Import frameworks
const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const moment = require('moment');

// Import json
const education = require('./src/json/education');
const experiences = require('./src/json/experiences');
const extracurriculars = require('./src/json/extracurriculars');
const posts = require('./src/json/posts');
const projects = require('./src/json/projects');
const art = require('./src/json/art');
const design = require('./src/json/design');

// Set the API key for sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Homepage
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Cameron Cabo',
    education,
    experiences,
    extracurriculars,
    isRootActive: true,
  });
});

// Freelancing
router.get('/freelancing', (req, res) => res.render('freelancing', {
  title: 'Cameron Cabo | Freelancing',
  isFreelancingActive: true,
}));

// Projects
router.get('/projects', (req, res) => res.render('projects', {
  title: 'Cameron Cabo | Projects',
  projects,
  isProjectsActive: true,
}));

// Art and design
router.get('/art-design', (req, res) => res.render('artDesign', {
  title: 'Cameron Cabo | Art/Design',
  art,
  design,
  isArtDesignActive: true,
}));

// Contact page
router.get('/contact', (req, res) => res.render('contact', {
  title: 'Cameron Cabo | Contact',
  isContactActive: true,
}));

// Listing all posts
router.get('/posts', (req, res) => res.render('posts', {
  title: 'Cameron Cabo | Posts',
  posts,
  isPostsActive: true,
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
    } = post;
    let {
      updatedAt,
      createdAt,
    } = post;

    // Build up the string for the partial to render the post
    const partial = `posts/${slug}`;

    // Format updated at and created at
    if (updatedAt) updatedAt = new moment(updatedAt).fromNow();
    if (createdAt) createdAt = new moment(createdAt).fromNow();

    // Do not show updated at if it is the same as created at
    if (updatedAt === createdAt) updatedAt = null;

    // Render the post found above
    res.render('post', {
      title,
      subtitle,
      description: subtitle,
      image,
      createdAt,
      updatedAt,
      partial,
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

// Handle 404 error
// NOTE this is reached if no other route above was matched
router.get('*', (req, res) => res.render('not-found', {
  title: 'Cameron Cabo | Not Found',
}));

// Export the router
module.exports = router;
