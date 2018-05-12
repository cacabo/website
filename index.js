// Require frameworks
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');

// Import routes
const api = require('./routes');

// Configure the app to use express
const app = express();

// Leverage handlebars
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: `${__dirname}/src/views/layouts/`,
  partialsDir: `${__dirname}/src/views/partials`,
}));

// Compile SCSS to CSS
app.use(sassMiddleware({
  src: __dirname + '/src/assets/scss',
  dest: __dirname + '/public',
  debug: true,
}));

// Leverage JSON body parser
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Serve assets via the public directory
app.use(express.static(path.join( __dirname, 'public')));

// Set the views path
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');

// Serve all API routes
app.use('/', api);

// Render the app
app.listen(3000, () => console.log('App listening on port 3000!'));
