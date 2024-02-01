import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { GiArmorDowngrade } from "react-icons/gi";
import ModalEditSuperAdmin from "./components/modals/ModalEditSuperAdmin";

const server_url = import.meta.env.VITE_SERVER_LINK;

const AdminList = () => {
  let usr = Cookies.get("SESSION_ID");

  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [adminEntries, setAdminEntries] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState(0);
  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAdminId, setEditAdminId] = useState(null);
  // const [modalKey, setModalKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!usr) {
      alert("Session Expired. Re-login.");
      Navigate("/");
    } else {
      setIsLoading(false);
      fetchAdminEntries();
    }
  }, [usr, Navigate]);

  usr = JSON.parse(Cookies.get("SESSION_ID"));

  const fetchAdminEntries = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${server_url}/user/admins/${usr.id}`);
      setAdminEntries(response.data.admin);
      setTotalAdmins(response.data.adminCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdmin = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`${server_url}/user/admin/delete/${userId}`);
      fetchAdminEntries();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // const openAddModal = () => {
  //   setIsAddModalOpen(true);
  // };

  // const closeAddModal = () => {
  //   setIsAddModalOpen(false);
  // };

  const openEditModal = (userId) => {
    setEditAdminId(userId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditAdminId(null);
    setIsEditModalOpen(false);
  };

  const demoteAdmin = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to demote this admin?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.put(`${server_url}/user/admin/edit/${userId}`, {
        roleType: "Teacher",
      });
      fetchAdminEntries();
      console.log("Admin demoted to Teacher successfully.");
    } catch (error) {
      console.error("Error demoting admin:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAdminEntries = adminEntries.filter((admin) =>
    `${admin.firstname} ${admin.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-blue-500">
        <h1 className="text-white text-4xl pt-4 pb-2">ADMIN MANAGEMENT</h1>
        <div className="mx-4 w-full max-w-screen-lg">
          {!isLoading && (
            <div className="flex justify-between w-full mb-2 pr-2 pl-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white p-2 rounded border border-gray-300"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              {/* <button
                className="bg-white hover:bg-gray-200 p-2 rounded"
                onClick={openAddModal}
              >
                <h2>ADD ADMIN</h2>
              </button> */}
            </div>
          )}
        </div>

        <div className="overflow-y-auto overflow-x-auto h-full mx-4 w-full max-w-screen-lg rounded-xl">
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <>
              <div className="flex items-center bg-white p-2 mb-1 rounded">
                <span className="text-gray-700 italic">Total Admin Count:</span>
                <span className="font-bold ml-2">{totalAdmins}</span>
              </div>
              <div className="bg-gray-300 p-1 mb-1 rounded">
                <span className="text-gray-700 italic text-xs">
                  Current user can't remove own account.
                </span>
              </div>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Gender</th>
                    <th className="py-2 px-4 border-b">School Name</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredAdminEntries.length > 0 &&
                    filteredAdminEntries.map((admin) => (
                      <tr key={admin.UserId} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{admin.lastname}</td>
                        <td className="py-2 px-4 border-b">
                          {admin.firstname}
                        </td>
                        <td className="py-2 px-4 border-b">{admin.email}</td>
                        <td className="py-2 px-4 border-b">{admin.gender}</td>
                        <td className="py-2 px-4 border-b">
                          {admin.schoolName}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex justify-between">
                            {admin.UserId !== usr.id && (
                              <button
                                className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded"
                                onClick={() => demoteAdmin(admin.UserId)}
                              >
                                <GiArmorDowngrade className="text-2xl" />
                              </button>
                            )}
                            <button
                              className="bg-blue-500 hover:bg-blue-400 p-2 rounded"
                              onClick={() => {
                                console.log(admin.UserId);
                                openEditModal(admin.UserId);
                              }}
                            >
                              <FaRegEdit className="text-2xl" />
                            </button>
                            {admin.UserId !== usr.id && (
                              <button
                                className="bg-red-500 hover:bg-red-400 p-2 rounded"
                                onClick={() => handleDeleteAdmin(admin.UserId)}
                              >
                                <FaTrashAlt className="text-2xl" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <ModalEditSuperAdmin
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        server_url={server_url}
        fetchAdminEntries={fetchAdminEntries}
        adminId={editAdminId}
      />
    </>
  );
};

export default AdminList;
