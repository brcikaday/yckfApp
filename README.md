# YCKF App

YCKF App is the frontend for the YCKF learning and community platform. It provides a public-facing website, student and admin dashboards, course and blog experiences, and role-based authentication flows for managing training and learning activities.

This repository contains the application source in the `yckfApp/` directory. The root README acts as a project overview and entry point for the app.

## What the app includes

- Public pages for the company, courses, blog, contact, and community initiatives
- Student, admin, and secondary-admin role-based portals
- Authentication screens for registration, login, and password reset
- Role-aware protected routes for dashboard access
- Responsive UI built with modern React patterns and component libraries
- Backend integration through a configurable environment variable

## Tech stack

- React 19
- Vite
- React Router DOM
- Material UI
- Bootstrap
- Axios
- Framer Motion
- React Hook Form + Zod
- ESLint

## Repository structure

```text
.
├── README.md
├── CSS_FIXES_SUMMARY.md
└── yckfApp/
    ├── public/
    ├── src/
    ├── .env.example
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── vercel.json
    ├── vite.config.js
    ├── api.js
    ├── apis.js
    └── README.md
```

## Key application routes

- `/` — home page
- `/free-training` — training signup page
- `/contact` — contact form
- `/complains` — complaint submission page
- `/company/about` — about page
- `/company/team` — team page
- `/company/interns` — interns page
- `/company/topperformers` — top performers page
- `/company/volunteers` — volunteers page
- `/blog` and `/blog/:id` — blog overview and detail pages
- `/course/:id` — course detail page
- `/login`, `/register`, `/request-reset-password`, `/reset-password` — authentication flows
- `/admin/*`, `/student/*`, `/secondary-admin/*` — protected role-based dashboards

## Getting started

1. Open the app directory:

```bash
cd yckfApp
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Update the backend URL in `.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

5. Start the development server:

```bash
npm run dev
```

## Available scripts

```bash
npm run dev
```
Runs the app in development mode.

```bash
npm run build
```
Builds the production bundle.

```bash
npm run preview
```
Serves the production build for local preview.

```bash
npm run lint
```
Runs ESLint checks on the project.

## Deployment notes

The frontend is set up for deployment on Vercel. A rewrite rule is included in `vercel.json` to support client-side routing when deploying the SPA.

## Project notes

- The app is built as a single-page application (SPA)
- Styling is split between custom CSS and UI component libraries
- Frontend behavior is role-aware and uses protected routes for dashboard sections
- API configuration is handled through the `VITE_API_URL` environment variable

## Contributing

Contributions are welcome. When working on changes:

1. Create a feature branch
2. Keep your edits focused
3. Test the affected flows thoroughly
4. Open a pull request with a clear summary of the change

## License

This project does not currently include a license file. If you plan to distribute or publish it publicly, add a license that matches your intended usage.
