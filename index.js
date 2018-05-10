// Require frameworks
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const sassMiddleware = require('node-sass-middleware');

// Import json
const education = require('./src/json/education');
const experience = require('./src/json/experience');

// Configure the app to use express
const app = express();

// Leverage handlebars
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: `${__dirname}/src/views/layouts/`,
}));

app.use(sassMiddleware({
  src: __dirname + '/src/assets/scss',
  dest: __dirname + '/public',
  debug: true,
}));

app.use(express.static(path.join( __dirname, 'public')));

// Set the views path
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

// Base URL
app.get('/', (req, res) => res.render('index', {
  title: 'Cameron Cabo',
  education,
  experience,
}));

// TODO other routes

app.get('*', (req, res) => res.render('not-found', {
  title: 'Cameron Cabo',
}));

// Render the app
app.listen(3000, () => console.log('App listening on port 3000!'));
