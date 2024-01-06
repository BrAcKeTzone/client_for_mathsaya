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

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <Link to="/" className="text-xl font-bold">
            MathSaya
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {/* <NavLink to="/super-dash">Dashboard</NavLink>
          <NavLink to="/super-emails">Emails</NavLink>
          <NavLink to="/super-teachs">Teachers</NavLink>
          <NavLink to="/super-supers">Admins</NavLink> */}
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 focus:outline-none"
          >
            Logout
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
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            {/* <NavLink to="/super-dash" onClick={toggleMobileMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/super-emails" onClick={toggleMobileMenu}>
              Emails
            </NavLink>
            <NavLink to="/super-teachs" onClick={toggleMobileMenu}>
              Teachers
            </NavLink>
            <NavLink to="/super-supers" onClick={toggleMobileMenu}>
              Admins
            </NavLink> */}
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 focus:outline-none"
            >
              Logout
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
