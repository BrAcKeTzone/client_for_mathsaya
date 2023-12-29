import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SA_Login from "./pages/superadmin/SA_Login";
import SA_Dash from "./pages/superadmin/SA_Dashboard";
import SA_EmailList from "./pages/superadmin/SA_EmailList";
import SA_SuperAdminList from "./pages/superadmin/SA_SuperAdminList";
import SA_TeacherList from "./pages/superadmin/SA_TeacherList";
import T_Signup from "./pages/teacher/T_Signup";
import T_Login from "./pages/teacher/T_Login";
import T_Dashboard from "./pages/teacher/T_Dashboard";
import T_Topics from "./pages/teacher/T_Topics";
import T_Classrooms from "./pages/teacher/T_Classrooms";
import T_ContactAdmin from "./pages/teacher/T_ContactAdmin";
import S_Login from "./pages/student/S_Login";
import S_MathSaya from "./pages/student/S_MathSaya";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/super-login" element={<SA_Login />} />
        <Route path="/super-dash" element={<SA_Dash />} />
        <Route path="/super-emails" element={<SA_EmailList />} />
        <Route path="/super-supers" element={<SA_SuperAdminList />} />
        <Route path="/super-teachs" element={<SA_TeacherList />} />
        <Route path="/teach-signup" element={<T_Signup />} />
        <Route path="/teach-login" element={<T_Login />} />
        <Route path="/teach-dash" element={<T_Dashboard />} />
        <Route path="/teach-topics" element={<T_Topics />} />
        <Route path="/teach-class" element={<T_Classrooms />} />
        <Route path="/teach-contact" element={<T_ContactAdmin />} />
        <Route path="/stud-login" element={<S_Login />} />
        <Route path="/stud-mathsaya" element={<S_MathSaya />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
