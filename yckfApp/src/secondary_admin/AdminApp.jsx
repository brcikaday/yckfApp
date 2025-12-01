"use client";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Enrollments from "./pages/Enrollments";
import Settings from "./pages/Settings";
import FinancialSettings from "./pages/FinancialSettings";
import AuditLogs from "./pages/AuditLogs";
import Toast from "./components/Toast";
import "./styles/AdminApp.css";

function SecondaryAdminApp() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <AdminLayout showToast={showToast}>
              <Routes>
                <Route path="/" element={<Dashboard showToast={showToast} />} />
                <Route
                  path="/courses"
                  element={<Courses showToast={showToast} />}
                />
                <Route
                  path="/categories"
                  element={<Categories showToast={showToast} />}
                />
                <Route
                  path="/users"
                  element={<Users showToast={showToast} />}
                />
                <Route
                  path="/enrollments"
                  element={<Enrollments showToast={showToast} />}
                />
                <Route
                  path="/settings"
                  element={<Settings showToast={showToast} />}
                />
                <Route
                  path="/financial-settings"
                  element={<FinancialSettings showToast={showToast} />}
                />
                <Route
                  path="/audit-logs"
                  element={<AuditLogs showToast={showToast} />}
                />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

export default SecondaryAdminApp;
