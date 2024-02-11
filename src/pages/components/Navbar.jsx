import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FiMail } from "react-icons/fi";
import logo from "../../assets/images/logo.png";
import InboxMenuDesktop from "./InboxMenuDesktop";
import InboxMenuMobile from "./InboxMenuMobile";
import ModalOpenEntry from "./modals/ModalOpenEntry";

function Navbar({ userRole, server_url, usr }) {
  const Navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMessageMenuOpen, setMessageMenuOpen] = useState(false);
  const [inboxFilter, setInboxFilter] = useState("unread");
  const [unreadCount, setUnreadCount] = useState(0);
  const [inboxEntries, setInboxEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

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

  const toggleMessageMenu = () => {
    setMessageMenuOpen((prev) => !prev);
    fetchInboxEntries();
  };

  const fetchInboxEntries = async () => {
    try {
      const response = await axios.get(
        `${server_url}/user/inbox/${inboxFilter}/${usr}`
      );
      setUnreadCount(response.data.unreadCount);
      if (inboxFilter === "unread") {
        setInboxEntries(response.data.inboxUnreadEntries);
      } else if (inboxFilter === "read") {
        setInboxEntries(response.data.inboxReadEntries);
      } else {
        setInboxEntries(response.data.inboxAllEntries);
      }
    } catch (error) {
      console.error(`Error fetching ${inboxFilter} inbox entries:`, error);
    }
  };

  const handleInboxFilter = async (filter) => {
    toggleMessageMenu();
    setInboxFilter(filter);
    await fetchInboxEntries();
  };

  useEffect(() => {
    if (userRole !== "Teacher") {
      fetchInboxEntries();
    }
  }, [inboxFilter, usr, server_url]);

  const onEntryClick = (entryId) => {
    setSelectedEntryId(entryId);
    setIsModalOpen(true);
  };

  const onDeleteEntry = async (emailId) => {
    try {
      toggleMessageMenu();
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this entry?"
      );
      if (!isConfirmed) {
        return;
      }
      await axios.delete(`${server_url}/user/inbox/delete/${emailId}/${usr}`);
      fetchInboxEntries();
      if (selectedEntryId && selectedEntryId.emailId === emailId) {
        setSelectedEntryId(null);
      }
    } catch (error) {
      console.error("Error deleting inbox entry:", error);
    }
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
          <div className="relative">
            {userRole !== "Teacher" && (
              <div
                onClick={toggleMessageMenu}
                className={`hover:text-gray-300 rounded focus:outline-none relative ${
                  isMessageMenuOpen ? "bg-black" : ""
                }`}
              >
                <div className="relative">
                  <FiMail className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <InboxMenuDesktop
                  isOpen={isMessageMenuOpen}
                  filter={inboxFilter}
                  onFilterChange={handleInboxFilter}
                  entries={inboxEntries}
                  onEntryClick={onEntryClick}
                  onDeleteEntry={onDeleteEntry}
                />
              </div>
            )}
          </div>
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
            <div className="relative">
              {userRole !== "Teacher" && (
                <div
                  onClick={toggleMessageMenu}
                  className="hover:text-gray-300 focus:outline-none relative"
                >
                  <div className="relative">
                    <FiMail className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                        {unreadCount}
                      </div>
                    )}
                  </div>{" "}
                  <InboxMenuMobile
                    isOpen={isMessageMenuOpen}
                    filter={inboxFilter}
                    onFilterChange={handleInboxFilter}
                    entries={inboxEntries}
                    onEntryClick={onEntryClick}
                    onDeleteEntry={onDeleteEntry}
                  />
                </div>
              )}
            </div>
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
      {isModalOpen && (
        <ModalOpenEntry
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          server_url={server_url}
          userId={usr}
          emailId={selectedEntryId}
        />
      )}
    </nav>
  );

  // Custom NavLink component to handle highlighting
  function NavLink({ to, children, onClick }) {
    const isActive = location.pathname === to;
    const className = isActive
      ? "text-yellow-300 underline"
      : "hover:text-gray-300";

    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
}

export default Navbar;
