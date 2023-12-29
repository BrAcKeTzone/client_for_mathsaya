import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUserGroup } from "react-icons/fa6";
import { preventRightClick } from "../../components/preventRightClick";
import "../../assets/styles/loader.css";
import "../../assets/styles/BubbleGumSans.css";

const server_url = import.meta.env.VITE_SERVER_LINK;

function S_Login() {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required."),
    lastname: Yup.string().required("Last Name is required."),
    username: Yup.string().required("Username is required."),
  });

  useEffect(() => {
    const superadmin = Cookies.get("superadmin");
    if (superadmin) {
      Navigate("/super-emails");
    } else {
      setIsLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${server_url}/sprofile/login`,
          values
        );
        if (response.data.studentProfile.profileId) {
          Cookies.set(
            "profileId",
            JSON.stringify({ id: response.data.studentProfile.profileId })
          );
          Navigate("/stud-mathsaya");
        } else {
          setLoginError("Your account doesn't exist!");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setLoginError("Your account doesn't exist!");
        } else {
          alert("First Name, Last Name or Username is incorrect!");
          console.error("Error:", error);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  return (
    <>
      <div
        className="h-screen bg-blue-500 flex justify-center items-center"
        onContextMenu={preventRightClick}
      >
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <>
            <div className="rounded bg-blue-600 shadow-lg shadow-black p-8 md:w-2/3 lg:w-1/3">
              <div className="rounded bg-blue-300 p-8">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-center text-3xl font-bold ">
                    LET'S GET LEARNING
                  </h2>
                  <FaUserGroup className="text-white text-10xl" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="my-4">
                    {loginError && (
                      <div className="text-red-600">{loginError}</div>
                    )}
                    <input
                      type="text"
                      {...formik.getFieldProps("firstname")}
                      className="w-full p-2 border rounded"
                      placeholder="First Name"
                    />
                    {formik.touched.firstname && formik.errors.firstname && (
                      <div className="text-red-600">
                        {formik.errors.firstname}
                      </div>
                    )}
                  </div>
                  <div className="my-4">
                    {loginError && (
                      <div className="text-red-600">{loginError}</div>
                    )}
                    <input
                      type="text"
                      {...formik.getFieldProps("lastname")}
                      className="w-full p-2 border rounded"
                      placeholder="Last Name"
                    />
                    {formik.touched.lastname && formik.errors.lastname && (
                      <div className="text-red-600">
                        {formik.errors.lastname}
                      </div>
                    )}
                  </div>
                  <div className="my-4">
                    {loginError && (
                      <div className="text-red-600">{loginError}</div>
                    )}
                    <input
                      type="text"
                      {...formik.getFieldProps("username")}
                      className="w-full p-2 border rounded"
                      placeholder="Username"
                    />
                    {formik.touched.username && formik.errors.username && (
                      <div className="text-red-600">
                        {formik.errors.username}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 p-2 rounded w-full hover:bg-pink hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loader"></span>
                    ) : (
                      "Sign-in"
                    )}{" "}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default S_Login;
