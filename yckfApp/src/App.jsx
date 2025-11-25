import "./css/home.css";
import "./css/theme.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminApp from "./admin/AdminApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import FreeTraining from "./pages/free_training";
import Contact from "./pages/contact";
import Complains from "./pages/complains";
import Register from "./auth/register";
import Login from "./auth/login";
import StudentApp from "./student/StudentApp";
import ResetPassword from "./auth/resetpassword";
import Interns from "./pages/interns";
import Team from "./pages/team";
import About from "./pages/about";
import TopPerformers from "./pages/topperformers";
import Volunteers from "./pages/volunteers";
import Blog from "./pages/blog";
import BlogPost from "./pages/blogpost";
import CourseDetails from "./pages/coursedetails";
// import Events from "./pages/events";
// import Careers from "./pages/careers";
import RequestResetPassword from "./auth/requestresetpassword";
import SecondaryAdminApp from "./secondary_admin/AdminApp";
import { getAuth } from "./auth/helper";
import { ThemeProvider, useTheme } from "./ThemeContext";

const PrivateRoute = ({ children }) => {
  const currentPath = window.location.pathname;
  const { theme } = useTheme();

  let role = "student"; // default role

  if (currentPath.startsWith("/admin")) {
    role = "admin";
  } else if (currentPath.startsWith("/secondary-admin")) {
    // stored role keys use underscore (secondary_admin)
    role = "secondary_admin";
  }

  const auth = getAuth(role);

  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  const location = window.location.pathname;
  const isAuthPage = location === "/login" || location === "/register";

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-root" data-theme={theme}>
              <Home />
            </div>
          }
        />
        <Route
          path="/free-training"
          element={
            <div className="app-root" data-theme={theme}>
              <FreeTraining />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="app-root" data-theme={theme}>
              <Contact />
            </div>
          }
        />
        <Route
          path="/complains"
          element={
            <div className="app-root" data-theme={theme}>
              <Complains />
            </div>
          }
        />
        <Route
          path="/company/interns"
          element={
            <div className="app-root" data-theme={theme}>
              <Interns />
            </div>
          }
        />
        <Route
          path="/company/team"
          element={
            <div className="app-root" data-theme={theme}>
              <Team />
            </div>
          }
        />
        <Route
          path="/company/about"
          element={
            <div className="app-root" data-theme={theme}>
              <About />
            </div>
          }
        />
        <Route
          path="/company/topperformers"
          element={
            <div className="app-root" data-theme={theme}>
              <TopPerformers />
            </div>
          }
        />
        <Route
          path="/company/volunteers"
          element={
            <div className="app-root" data-theme={theme}>
              <Volunteers />
            </div>
          }
        />
        <Route
          path="/blog"
          element={
            <div className="app-root" data-theme={theme}>
              <Blog />
            </div>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <div className="app-root" data-theme={theme}>
              <BlogPost />
            </div>
          }
        />
        <Route
          path="/course/:id"
          element={
            <div className="app-root" data-theme={theme}>
              <CourseDetails />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="auth-page-wrapper">
              <Register />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="auth-page-wrapper">
              <Login />
            </div>
          }
        />
        <Route
          path="/reset-password"
          element={
            <div className="auth-page-wrapper">
              <ResetPassword />
            </div>
          }
        />
        <Route
          path="/request-reset-password"
          element={
            <div className="auth-page-wrapper">
              <RequestResetPassword />
            </div>
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminApp />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <PrivateRoute>
              <StudentApp />
            </PrivateRoute>
          }
        />
        <Route
          path="/secondary-admin/*"
          element={
            <PrivateRoute>
              <SecondaryAdminApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
