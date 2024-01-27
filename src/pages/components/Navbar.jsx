import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/images/logo.png";

function Navbar({ userRole }) {
  const Navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to sign-out?");

    if (!isConfirmed) {
      return;
    }
    Cookies.remove("SESSION_ID");
    Navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-500 p-4 text-white sticky top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <Link to="/" className="text-2xl font-bold">
            <h1>MathSaya</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/dash">Dashboard</NavLink>
          {userRole !== "Teacher" && <NavLink to="/admins">Admins</NavLink>}
          {userRole !== "Teacher" && <NavLink to="/teachers">Teachers</NavLink>}
          <NavLink to="/topics">Topics</NavLink>
          <NavLink to="/classes">Classes</NavLink>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 focus:outline-none"
          >
            Sign out
          </button>
        </div>

        <div className="md:hidden">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            <NavLink to="/dash" onClick={toggleMobileMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/admins" onClick={toggleMobileMenu}>
              Admins
            </NavLink>
            <NavLink to="/teachers" onClick={toggleMobileMenu}>
              Teachers
            </NavLink>

            <NavLink to="/topics" onClick={toggleMobileMenu}>
              Topics
            </NavLink>
            <NavLink to="/classes" onClick={toggleMobileMenu}>
              Classes
            </NavLink>
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 focus:outline-none"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
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
