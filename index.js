// Require frameworks
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

// Configure the app to use express
const app = express();

// Leverage handlebars
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: `${__dirname}/views/layouts/`,
}));

// Set the views path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Base URL
app.get('/', (req, res) => res.render('index', {title: 'Cool, huh!'}));

// Render the app
app.listen(3000, () => console.log('App listening on port 3000!'));
