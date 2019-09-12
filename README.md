# Personal Website

Application developed in Node with Handlebars, Express, and SCSS. The site leverages local JSON files for storing data on my education, posts, experience, and work. This is also a place for various spin-off projects. The app is hosted on Heroku.

![Screenshot](https://raw.githubusercontent.com/ccabo1/website/master/public/img/posts/new-site.jpg)

---

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

### Developing

To run locally, first make sure dependencies are installed by running `yarn` with a stable version of Node `8.x`. Next, run:

```bash
yarn dev
```

To deploy to Heroku, first ensure that you have the proper Heroku credentials and that the Heroku CLI is properly installed. Next, run:

```bash
yarn deploy
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
  "subtitle": "Subtitle of the post",
  "topics": [ "..." ]
}
```

There is a corresponding Handlebars file in the `/src/views/partials/posts` directory indexed by the post's `slug`, in this case `title-of-the-post`. This works to determine the URL for the post along with the HTML content rendered.

---

### Planned features

- [ ] Write about projects on their own pages
- [ ] Better optimize production build
- [ ] Include share links on posts
- [ ] Add more content
- [ ] Quotes & articles page
