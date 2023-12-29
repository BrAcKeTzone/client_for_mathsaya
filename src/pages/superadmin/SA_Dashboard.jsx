import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { RiMailFill, RiAdminFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa6";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_Dashboard() {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalEmails, setTotalEmails] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalSuperAdmins, setTotalSuperAdmins] = useState(0);

  useEffect(() => {
    const superadmin = Cookies.get("spr");
    if (!superadmin) {
      Navigate("/super-login");
    } else {
      setIsLoading(false);
    }

    const fetchData = async () => {
      try {
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
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [Navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
        {isLoading ? (
        <span className="loader"></span>
      ) : (
      <div className="grid grid-cols-3 gap-4">
        <div className=" flex justify-center flex-col items-center bg-blue-300 p-4 rounded shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          <RiMailFill className="text-8xl mb-2" />
          <p className="text-xl font-bold">{totalEmails}</p>
          <p>Total Emails</p>
        </div>
        <div className=" flex justify-center flex-col items-center bg-green-300 p-4 rounded shadow-md hover:bg-green-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          <FaUserGraduate className="text-8xl mb-2" />
          <p className="text-xl font-bold">{totalTeachers}</p>
          <p>Total Teachers</p>
        </div>
        <div className=" flex justify-center flex-col items-center bg-purple-300 p-4 rounded shadow-md hover:bg-purple-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          <RiAdminFill className="text-8xl mb-2" />
          <p className="text-xl font-bold">{totalSuperAdmins}</p>
          <p>Total Super Admins</p>
        </div>
      </div>
    )}
    </div>
  );
}

export default SA_Dashboard;
