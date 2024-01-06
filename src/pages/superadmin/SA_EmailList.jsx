import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../../assets/styles/hideVerticalScrollbar.css";
import Navbar from "./components/Navbar";

const server_url = import.meta.env.VITE_SERVER_LINK;

function SA_EmailList() {
  const Navigate = useNavigate();
  const [emailEntries, setEmailEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayType, setDisplayType] = useState("unread"); // Default to displaying unread entries

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
        fetchEmailEntries();
      } catch (error) {
        Cookies.remove("spr");
        Navigate("/super-login");
      }
    };

    const fetchEmailEntries = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${server_url}/cust-support/${displayType}`
        );
        setEmailEntries(response.data);
      } catch (error) {
        console.error(`Error fetching ${displayType} email entries:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSuperAdminId();
  }, [Navigate, displayType]);

  const handleDisplayTypeChange = (newDisplayType) => {
    setDisplayType(newDisplayType);
    console.log(newDisplayType);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-blue-500">
        <h1 className="text-white text-4xl pt-4 pb-2">Email List</h1>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <button
            onClick={() => handleDisplayTypeChange("unread")}
            className={`${
              displayType === "unread" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-400 p-2 rounded`}
          >
            Unread
          </button>
          <button
            onClick={() => handleDisplayTypeChange("read")}
            className={`${
              displayType === "read" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-400 p-2 rounded`}
          >
            Read
          </button>
          <button
            onClick={() => handleDisplayTypeChange("list")}
            className={`${
              displayType === "list" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-400 p-2 rounded`}
          >
            All
          </button>
        </div>
        <div className="overflow-y-auto overflow-x-hidden max-h-[80vh]">
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
              {emailEntries.map((entry) => (
                <div
                  key={entry.emailId}
                  className={`${
                    entry.status === "unread"
                      ? "bg-blue-300 hover:bg-blue-200"
                      : "bg-blue-200 hover:bg-blue-100"
                  } flex justify-center flex-col items-center p-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  <FaRegEnvelope className="text-8xl mb-2" />
                  <table className="flex justify-center flex-col items-center">
                    <th>{entry.teacherEmail}</th>
                    <tr />
                    <td>{entry.subject}</td>
                    <tr />
                    <td>{entry.status}</td>
                    <tr />
                    <td className="grid grid-cols-2 gap-4 p-2 border-t-2">
                      <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded">
                        {entry.status === "unread" ? (
                          <FaRegEyeSlash className="text-2xl" />
                        ) : (
                          <FaRegEye className="text-2xl" />
                        )}
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

export default SA_EmailList;
