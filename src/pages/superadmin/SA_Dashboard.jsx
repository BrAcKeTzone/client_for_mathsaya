import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { RiMailFill, RiAdminFill } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import Navbar from "./components/Navbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_Dashboard() {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [sAdminFName, setSAdminFName] = useState("");
  const [sAdminLName, setSAdminLName] = useState("");
  const [totalEmails, setTotalEmails] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalSuperAdmins, setTotalSuperAdmins] = useState(0);

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
        fetchData();
      } catch (error) {
        Cookies.remove("spr");
        Navigate("/super-login");
      }
    };

    const fetchSuperAdminData = async () => {
      try {
        console.log(superadmin.id);
        const response = await axios.get(
          `${server_url}/superadmin/view/${superadmin.id}`
        );
        setSAdminFName(response.data.firstname);
        setSAdminLName(response.data.lastname);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responseEmails = await axios.get(
          `${server_url}/cust-support/total`
        );
        setTotalEmails(responseEmails.data.totalEmails);

        const responseTeachers = await axios.get(
          `${server_url}/superadmin/total-teachers`
        );
        setTotalTeachers(responseTeachers.data.totalTeachers);

        const responseSuperAdmins = await axios.get(
          `${server_url}/superadmin/total-superadmins`
        );
        setTotalSuperAdmins(responseSuperAdmins.data.totalSuperAdmins);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSuperAdminId();
    fetchSuperAdminData();
  }, [Navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-green-500">
        <h1 className="text-white text-6xl pt-4 pb-2">Dashboard</h1>
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-3 md:max-h-max overflow-y-auto">
            <div className="bg-green-300 p-6 rounded shadow-md hover:bg-green-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/super-dash">
                <FaUserSecret className="text-8xl mb-2" />
                <p className="text-xl font-bold">{sAdminLName},</p>
                <p>{sAdminFName}</p>
              </Link>
            </div>
            <div className="bg-blue-300 p-6 rounded shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/super-teachs">
                <FaUserGraduate className="text-8xl mb-2" />
                <p className="text-xl font-bold">{totalTeachers}</p>
                <p>Total Teachers</p>
              </Link>
            </div>
            <div className="bg-purple-300 p-6 rounded shadow-md hover:bg-purple-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/super-supers">
                <RiAdminFill className="text-8xl mb-2" />
                <p className="text-xl font-bold">{totalSuperAdmins}</p>
                <p>Total Admins</p>
              </Link>
            </div>
            <div className="bg-red-300 p-6 rounded shadow-md hover:bg-red-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/super-emails">
                <RiMailFill className="text-8xl mb-2" />
                <p className="text-xl font-bold">{totalEmails}</p>
                <p>Unread Emails</p>
              </Link>
            </div>
            <div className="bg-yellow-300 p-6 rounded shadow-md hover:bg-yellow-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/super-emails">
                <RiMailFill className="text-8xl mb-2" />
                <p className="text-xl font-bold">{totalEmails}</p>
                <p>Read Emails</p>
              </Link>
            </div>
            <div className="bg-orange-300 p-6 rounded shadow-md hover:bg-orange-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/super-emails">
                <RiMailFill className="text-8xl mb-2" />
                <p className="text-xl font-bold">{totalEmails}</p>
                <p>Total Emails</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SA_Dashboard;
