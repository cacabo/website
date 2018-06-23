# Personal Website

Personal website developed in Node with Handlebars, Express, and SCSS. The site leverages local JSON files for storing data on my education, posts, experience, and work. The app is hosted on Heroku.

------

### Architecture
```
│
├─ public               # Files accessible from the frontend
│  ├─ img               # Images
│  │  └─ ...
│  ├─ js                # Frontend scripts
│  │  └─ ...
│  ├─ index.css         # Compiled CSS file
│  └─ ...               # Favicon files
│
├─ src                  # Assets, data, and content
│  ├─ assets
│  │  └─ scss           # Styles written in SCSS
│  │     └─ ...
│  ├─ json              # Data for posts, projects, etc.
│  │  └─ ...
│  └─ views             # Handlebars files
│     ├─ layouts        # Data for posts, projects, etc.
│     │  └─ layout.hbs  # Wrapper HTML for all pages
│     ├─ partials       # Data for posts, projects, etc.
│     │  ├─ posts       # HTML partial for each post
│     │  │  └─ ...
│     │  └─ ...         # Other partials
│     └─ ...            # Page components
│
├─ .eslintrc            # Documentation
├─ .gitignore           # Files not included in git repo
├─ index.js             # Configure express server
├─ package.json         # Layout dependencies
├─ routes.js            # App API's and routing
├─ ...                  # Yarn config files
└─ README.md            # Documentation
```

### Posts system design

Each post is represented by a JSON file of the form:
```JSON
{
  "createdAt": "123...",
  "updatedAt": "123...",
  "title": "Title of the post",
  "slug": "title-of-the-post",
  "image": "...",
  "subtitle": "Subtitle of the post"
},
```
There is a corresponding Handlebars file in the `/src/views/partials/posts` directory indexed by the post's `slug`, in this case `title-of-the-post`. This works to determine the URL for the post along with the HTML content rendered.

------

### Planned features
- [ ] Write about projects on their own pages
- [ ] Write additional posts

### Completed features
- [x] Add images to homepage content
- [x] Add meta tags
- [x] Projects
- [x] Freelancing info
- [x] Posts
- [x] Art/Design
- [x] Mobile responsive nav
- [x] Add linter
- [x] Contact form frontend
- [x] Contact form functionality
- [x] Add timestamps to posts
- [x] Lower screenshot quality for quicker loading time
- [x] Remove gray padding on mobile?
- [x] Remove modal on smaller screens
- [x] Favicon
- [x] Next and previous links for posts
- [x] Preview posts and projects on homepage
- [x] Update how links look in posts (underline only?)
- [x] Smooth transitions between pages
- [x] Build out README with file architecture, features, etc.
- [x] Page background styling
- [x] Generic background image for link sharing
- [x] Replace font awesome icons with local images
- [x] Google Analytics
