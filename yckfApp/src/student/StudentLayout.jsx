// src/layouts/StudentLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";

const StudentLayout = ({ children, studentData, theme, toggleTheme }) => {
  if (!studentData) return <Navigate to="/login" replace />;

  return (
    <div className="student-app" data-theme={theme}>
      <Navigation
        student={studentData}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="student-main">
        {children} {/* All nested student routes render here */}
      </main>
    </div>
  );
};

export default StudentLayout;
