import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../../assets/images/logo.png";

function Navbar() {
  const Navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to sign-out?");

    if (!isConfirmed) {
      return;
    }
    Cookies.remove("tchr");
    Navigate("/teach-login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const isTeachLogin =
    location.pathname === "/student-login" ||
    location.pathname === "/student-signup";

  return (
    <nav className="bg-blue-500 p-4 text-white sticky top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <Link to="/" className="text-2xl font-bold">
            <h1>MathSaya</h1>
          </Link>
        </div>
      </div>
    </nav>
  );

  // Custom NavLink component to handle highlighting
  function NavLink({ to, children, onClick }) {
    const isActive = location.pathname === to;
    const className = isActive
      ? "text-yellow-300 underline" // Change this style for active link
      : "hover:text-gray-300";

    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
}

export default Navbar;
