YCKF App
YCKF App is the frontend application for the YCKF learning and community platform. It provides a public-facing website, student and admin dashboards, and role-based authentication for managing training, company information, and internal workflows.

Overview
This project is built with React and Vite and includes:

Public pages for the company, courses, blog, and contact flow
Student and admin role-based portals
Authentication screens for registration, login, and password reset
Responsive UI with custom styling and component libraries
API integration through a configurable backend URL
Tech Stack
React 19
Vite
React Router DOM
Material UI and Bootstrap
Axios for API requests
Framer Motion for transitions
React Hook Form + Zod for form validation
ESLint for linting
Project Structure
yckfApp/
├── public/
├── src/
│   ├── admin/
│   ├── auth/
│   ├── components/
│   ├── css/
│   ├── pages/
│   ├── secondary_admin/
│   ├── student/
│   ├── App.jsx
│   ├── main.jsx
│   ├── ThemeContext.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json
├── vite.config.js
└── README.md
Key Features
Public website
The app includes pages such as:

Home
About
Team
Interns
Volunteers
Top performers
Free training
Contact
Complaints
Blog and blog details
Course detail pages
Authentication and access control
The app supports role-specific user flows:

/login
/register
/request-reset-password
/reset-password
/admin/*
/student/*
/secondary-admin/*
Protected dashboard routes are enforced with role-aware authentication checks.

API integration
The frontend connects to a backend API using the VITE_API_URL environment variable.

Environment Setup
Copy the sample environment file:
cp .env.example .env
Update the backend URL in .env:
VITE_API_URL=http://127.0.0.1:5000
Installation
npm install
Available Scripts
npm run dev
Runs the app in development mode.

npm run build
Builds the production bundle for deployment.

npm run preview
Serves the production build locally for preview.

npm run lint
Runs ESLint across the codebase.

Development Notes
The app is configured as a single-page application (SPA).
vercel.json includes a rewrite rule to support client-side routing on Vercel.
Styling is split between custom CSS and UI component libraries for a responsive experience.
Deployment
This frontend is set up for deployment on Vercel and uses a client-side route rewrite to ensure pages resolve correctly on refresh.

License
This project does not currently include a license file. If you plan to publish or distribute it publicly, add a license that matches your usage requirements.

Contributing
Contributions are welcome. If you are improving the app, please:

Create a feature branch
Keep changes focused
Test the app with the relevant flows
Open a pull request with a clear summary
