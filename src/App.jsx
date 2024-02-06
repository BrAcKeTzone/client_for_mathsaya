import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import NavLayout from "./pages/components/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import Dashboard from "./pages/Dashboard";
import TeacherList from "./pages/TeacherList";
import AdminList from "./pages/AdminList";
import Topics from "./pages/Topics";
import Classrooms from "./pages/Classrooms";
import StudentLogin from "./pages/StudentLogin";
import Mathsaya from "./pages/Mathsaya";
import NotFound from "./pages/NotFound";

function App() {
  const server_url = import.meta.env.VITE_SERVER_LINK;
  let usr = Cookies.get("SESSION_ID");

  const [userRole, setUserRole] = useState("Teacher");

  const fetchUserRole = async () => {
    try {
      usr = JSON.parse(Cookies.get("SESSION_ID"));
      const infoResponse = await axios.get(`${server_url}/auth/${usr.id}`);
      setUserRole(infoResponse.data.roleType);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (usr !== undefined) {
      fetchUserRole();
    }
  }, [usr]);

  const isTeacher = userRole === "Teacher";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/verify" element={<Signup />} />
        <Route path="/reset" element={<ForgotPass />} />
        <Route
          path="/dash"
          element={
            <NavLayout userRole={userRole} server_url={server_url} usr={usr}>
              <Dashboard fetchUserRole={fetchUserRole} />
            </NavLayout>
          }
        />
        {!isTeacher && (
          <>
            <Route
              path="/teachers"
              element={
                <NavLayout
                  userRole={userRole}
                  server_url={server_url}
                  usr={usr}
                >
                  <TeacherList />
                </NavLayout>
              }
            />
            <Route
              path="/admins"
              element={
                <NavLayout
                  userRole={userRole}
                  server_url={server_url}
                  usr={usr}
                >
                  <AdminList />
                </NavLayout>
              }
            />
          </>
        )}
        <Route
          path="/topics"
          element={
            <NavLayout userRole={userRole} server_url={server_url} usr={usr}>
              <Topics />
            </NavLayout>
          }
        />
        <Route
          path="/classes"
          element={
            <NavLayout userRole={userRole} server_url={server_url} usr={usr}>
              <Classrooms />
            </NavLayout>
          }
        />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/game" element={<Mathsaya />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
