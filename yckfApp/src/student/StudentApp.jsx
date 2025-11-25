"use client";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

import StudentLayout from "./StudentLayout";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import CourseDetails from "./pages/CourseDetails";
import DonationPage from "./pages/DonationPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import ProfilePage from "./pages/ProfilePage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import "./styles/StudentApp.css";

function StudentApp() {
  const { theme, toggleTheme } = useTheme();

  // Initialize minimal student data if we have a token
  const [studentData, setStudentData] = useState(() => {
    const token =
      localStorage.getItem("student_token") || localStorage.getItem("token");
    // Return minimal placeholder if we have a token
    return token ? { id: null, name: "Student", email: "" } : null;
  });

  // Update theme attribute on the student app container
  useEffect(() => {
    const studentApp = document.querySelector(".student-app");
    if (studentApp) {
      studentApp.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // TODO: Fetch real student data from backend here
  // useEffect(() => {
  //   const fetchStudentProfile = async () => {
  //     try {
  //       const response = await api.get('/student/profile');
  //       setStudentData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching student profile:', error);
  //     }
  //   };
  //   if (token) fetchStudentProfile();
  // }, []);

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <StudentLayout
              studentData={studentData}
              theme={theme}
              toggleTheme={toggleTheme}
            >
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route
                  path="dashboard"
                  element={<Dashboard student={studentData} />}
                />
                <Route path="courses" element={<CoursePage />} />
                <Route
                  path="course/:id"
                  element={<CourseDetails student={studentData} />}
                />
                <Route path="donations" element={<DonationPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="paymentSuccess" element={<PaymentSuccessPage />} />
                <Route path="blog/:id" element={<BlogPost />} />
                <Route
                  path="profile"
                  element={
                    <ProfilePage
                      student={studentData}
                      setStudentData={setStudentData}
                    />
                  }
                />
              </Routes>
            </StudentLayout>
          }
        />
      </Routes>
    </>
  );
}

export default StudentApp;
