import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { RiAdminFill } from "react-icons/ri";
import { FaRegPlusSquare, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "../../assets/styles/hideVerticalScrollbar.css";
import Navbar from "./components/Navbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_SuperAdminList() {
  const Navigate = useNavigate();
  const [superAdmins, setSuperAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-purple-600">
        <h1 className="text-white text-4xl pt-4 pb-2">Super Admin List</h1>
        <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded mb-2">
          <h2>NEW ADMIN</h2>
        </button>
        <div className="overflow-y-auto overflow-x-hidden max-h-[80vh]">
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-2">
              {superAdmins.map((superAdmin) => (
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
                        <FaRegEdit className="text-2xl" />
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
    </>
  );
}

export default SA_SuperAdminList;
