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

// Helper function to get two recent posts
const getRecentPosts = () => {
  if (posts.length <= 2) return posts;
  return posts.slice(0, 2);
};

// Helper function to get two recent projects
const getRecentProjects = () => {
  if (projects.length <= 2) return projects;
  return projects.slice(0, 2);
};

// Helper function to get the previous post
const getPrevPost = (index) => {
  if (posts.length === 0) return null;
  else if (index === 0) return posts[posts.length - 1];
  return posts[index - 1];
};

// Helper function to get the next post
const getNextPost = (index) => {
  if (posts.length === 0) return null;
  else if (index === posts.length - 1) return posts[0];
  return posts[index + 1];
};

// Helper function to get a post with the passed in slug
// Along with the next and previous posts
const findPosts = (slug) => {
  let matchingPost;
  let matchingPostIndex;
  posts.forEach((post, index) => {
    if (post.slug === slug) {
      matchingPost = post;
      matchingPostIndex = index;
    }
  });

  // If a post was found, return that post along with the previous
  // and next posts
  if (matchingPost) {
    return {
      prev: getPrevPost(matchingPostIndex),
      post: matchingPost,
      next: getNextPost(matchingPostIndex),
    };
  }

  return null;
};

// Helper function to render a not found page
const renderNotFound = (res) => {
  res.status(404).render('not-found', {
    title: 'Cameron Cabo | Not Found',
  });
};

// Homepage
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Cameron Cabo',
    education,
    experiences,
    extracurriculars,
    posts: getRecentPosts(),
    projects: getRecentProjects(),
    isRootActive: true,
  });
});

// Freelancing
router.get('/freelancing', (req, res) => res.render('freelancing', {
  title: 'Cameron Cabo | Freelancing',
  isFreelancingActive: true,
  description: 'I develop websites and mobile apps for all kinds of small businesses and startups. Through my work I hope to grow and help others do the same. Contact me and we can get to work.',
}));

// Projects
router.get('/projects', (req, res) => res.render('projects', {
  title: 'Cameron Cabo | Projects',
  description: 'I am a firm believer in learning by doing. Building projects is my means of picking up new tech and better understanding technology, users, and markets.',
  projects,
  isProjectsActive: true,
}));

// Art and design
router.get('/art-design', (req, res) => res.render('artDesign', {
  title: 'Cameron Cabo | Art/Design',
  description: "Ever since preschool I have loved to draw and create. I approach every challenge, job, and goal with an artist's mindset in order to build impactful and well-crafted products.",
  art,
  design,
  isArtDesignActive: true,
}));

// Contact page
router.get('/contact', (req, res) => res.render('contact', {
  title: 'Cameron Cabo | Contact',
  description: 'Want to learn more about my experience or interests? Have a project of your own? Please reach out and I will get back to you as soon as possible.',
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

  // Ensure the slug is valid
  if (!slug) renderNotFound(res);

  // Find the post with the matching slug
  const postObj = findPosts(slug);
  if (postObj && postObj.post) {
    const {
      next,
      post,
      prev,
    } = postObj;
    const {
      title,
      subtitle,
      image,
    } = post;
    const {
      updatedAt,
      createdAt,
    } = post;

    // Build up the string for the partial to render the post
    const partial = `posts/${slug}`;

    // Format updated at and created at
    let updatedAtText;
    let createdAtText;
    if (updatedAt) updatedAtText = new moment(updatedAt).fromNow();
    if (createdAt) createdAtText = new moment(createdAt).fromNow();

    // Do not show updated at if it is the same as created at
    if (updatedAtText === createdAtText) updatedAtText = null;

    // Render the post found above
    res.render('post', {
      title,
      subtitle,
      description: subtitle,
      image,
      createdAt: createdAtText,
      updatedAt: updatedAtText,
      partial,
      next,
      prev,
    });
  } else {
    // Else, the slug was not matched, render the not found route
    renderNotFound(res);
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
router.get('*', (req, res) => renderNotFound(res));

// Export the router
module.exports = router;
