import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import { ABOUT_US, CONTACT_US, REGISTER_STUDENT } from "./constants/appConstants";
import RegisterUser from "./components/Auth/RegisterUser";
import Login from "./components/Auth/Login"; // Make sure to import the Login component
import StudentDashboard from "./components/students/StudentDashboard";
// import TeacherDashboard from "./components/pages/TeacherDashboard";
// import AdminDashboard from "./components/pages/AdminDashboard";

const App = () => {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={token ? <Navigate to={`/${role.toLowerCase()}/dashboard`} /> : <Login />} />
        <Route path={ABOUT_US} element={<About />} />
        <Route path={CONTACT_US} element={<Contact />} />
        <Route path={REGISTER_STUDENT} element={<RegisterUser />} />

        <Route
          path="/student/dashboard"
          element={
            token && role === "Student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Uncomment and use these routes if you need them */}
        { <Route
            path="/teacher/dashboard"
            element={
              token && role === "Teacher" ? (
                <TeacherDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> }

        { <Route
            path="/admin/dashboard"
            element={
              token && role === "Admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> }

        {/* Catch-all route to redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
