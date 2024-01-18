import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const server_url = import.meta.env.VITE_SERVER_LINK;

function T_ContactAdmin() {
  const Navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClearForm = () => {
    formik.setValues({
      subject: "",
      lastname: "",
      gender: "",
    });
  };

  let teacher = Cookies.get("tchr");
  if (!teacher) {
    Navigate("/teach-login");
    return;
  }

  teacher = JSON.parse(Cookies.get("tchr"));

  const checkTeacherId = async () => {
    try {
      const response = await axios.get(
        `${server_url}/teachers/check-teacher/${teacher.id}`
      );
      console.log(response.data.message);
    } catch (error) {
      alert(error);
      // Cookies.remove("tchr");
      // Navigate("/teach-login");
    }
  };

  useEffect(() => {
    checkTeacherId();
  }, []);
  return (
    <>
      <div className="h-screen bg-blue-500 flex justify-center items-center">
        <h1 className="text-white text-6xl pt-4 pb-2">ADMIN SUPPORT</h1>
        <div></div>
      </div>
    </>
  );
}

export default T_ContactAdmin;
