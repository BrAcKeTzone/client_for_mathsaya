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
    Cookies.remove("spr");
    Navigate("/super-login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const isSuperLogin =
    location.pathname === "/teach-login" ||
    "/teach-signup" ||
    location.pathname === "/teach-verifyOTP";

  return (
    <nav className="bg-blue-500 p-4 text-white sticky top-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <Link to="/" className="text-2xl font-bold">
            <h1>MathSaya</h1>
          </Link>
        </div>
        {!isSuperLogin && (
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/teach-dash">Dashboard</NavLink>
            <NavLink to="/teach-topics">Topics</NavLink>
            <NavLink to="/teach-class">Classes</NavLink>
            <NavLink to="/teach-contact">Admin Support</NavLink>
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 focus:outline-none"
            >
              Sign out
            </button>
          </div>
        )}
        {!isSuperLogin && (
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
        )}
      </div>
      {!isSuperLogin && isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            <NavLink to="/teach-dash" onClick={toggleMobileMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/teach-topics" onClick={toggleMobileMenu}>
              Topics
            </NavLink>
            <NavLink to="/teach-class" onClick={toggleMobileMenu}>
              Classes
            </NavLink>
            <NavLink to="/teach-contact" onClick={toggleMobileMenu}>
              Admin Support
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
