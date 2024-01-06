import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { RiAdminFill } from "react-icons/ri";
import { FaRegPlusSquare, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "../../assets/styles/hideVerticalScrollbar.css";
import Navbar from "./components/Navbar";
import ModalAddSuperAdmin from "./components/ModalAddSuperAdmin";
import ModalEditSuperAdmin from "./components/ModalEditSuperAdmin";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_SuperAdminList() {
  const Navigate = useNavigate();
  const [superAdmins, setSuperAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSuperAdminId, setEditSuperAdminId] = useState(null);
  const [modalKey, setModalKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let superadmin = Cookies.get("spr");
    if (!superadmin) {
      Navigate("/super-login");
      return;
    }

    superadmin = JSON.parse(Cookies.get("spr"));

    const checkSuperAdminId = async () => {
      try {
        const response = await axios.post(
          `${server_url}/superadmin/check-superadmin/${superadmin.id}`
        );

        console.log(response.data.message);
        fetchSuperAdmins();
      } catch (error) {
        Cookies.remove("spr");
        Navigate("/super-login");
      }
    };

    checkSuperAdminId();
  }, [Navigate]);

  const fetchSuperAdmins = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${server_url}/superadmin/superadmins`);
      setSuperAdmins(response.data);
    } catch (error) {
      console.error("Error fetching super admins:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSuperAdmin = async (superAdminId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this super admin?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `${server_url}/superadmin/delete-superadmin/${superAdminId}`
      );

      fetchSuperAdmins();
    } catch (error) {
      console.error("Error deleting super admin:", error);
    }
  };

  const openAddModal = () => {
    console.log("Modal ADD open");
    setModalKey((prevKey) => prevKey + 1);
    setIsAddModalOpen(true);
  };

  const openEditModal = (superAdminId) => {
    console.log("Modal EDIT open");
    setEditSuperAdminId(superAdminId);
    setModalKey((prevKey) => prevKey + 1);
    setIsEditModalOpen(true);
  };

  const closeAddModal = () => {
    console.log("Modal ADD close");
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    console.log("Modal EDIT close");
    setIsEditModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuperAdmins = superAdmins.filter((superAdmin) =>
    `${superAdmin.firstname} ${superAdmin.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-purple-600">
        <h1 className="text-white text-4xl pt-4 pb-2">Admin List</h1>
        <div className="overflow-y-auto overflow-x-hidden max-h-[80vh]">
          {!isLoading && (
            <div className="flex justify-between w-full mb-2 pr-2 pl-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white p-2 rounded mr-2"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-400 p-2 rounded"
                onClick={openAddModal}
              >
                <h2>ADD ADMIN</h2>
              </button>
            </div>
          )}
        </div>
        <div className="overflow-y-auto overflow-x-hidden max-h-[80vh]">
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
              {filteredSuperAdmins.map((superAdmin) => (
                <div
                  key={superAdmin.superAdminId}
                  className={`bg-purple-500 hover:bg-purple-400 flex justify-center flex-col items-center p-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  <RiAdminFill className="text-8xl mb-2" />
                  <table className="flex justify-center flex-col items-center ">
                    <th>
                      {superAdmin.firstname} {superAdmin.lastname}
                    </th>
                    <tr />
                    <td>{superAdmin.email}</td>
                    <tr />
                    <td>{superAdmin.gender}</td>
                    <tr />
                    <td>{superAdmin.schoolName}</td>
                    <tr />
                    <td className="grid grid-cols-2 gap-4 p-2 border-t-2">
                      <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded">
                        <FaRegEdit
                          className="text-2xl"
                          onClick={() => openEditModal(superAdmin.superAdminId)}
                        />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 p-2 rounded"
                        onClick={() =>
                          handleDeleteSuperAdmin(superAdmin.superAdminId)
                        }
                      >
                        <FaTrashAlt className="text-2xl" />
                      </button>
                    </td>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ModalAddSuperAdmin
        key={modalKey}
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        fetchSuperAdmins={fetchSuperAdmins}
      />
      <ModalEditSuperAdmin
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        fetchSuperAdmins={fetchSuperAdmins}
        superAdminId={editSuperAdminId}
      />
    </>
  );
}

export default SA_SuperAdminList;
