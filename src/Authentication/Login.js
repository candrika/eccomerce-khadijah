import React, { useState } from "react";
import login from "../assets/login.png";
import logo from "../assets/logo.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Popup from "../components/reusableComponents/Popup";

const initialState = {
  name: "",
  email: "",
  password: "",
  password: "",
  password_confirmation: "",
};
const schemaValidation = Yup.object({
  name: Yup.string().required("name Wajib diisi"),
  email: Yup.string().email("Harga Harus email").required("email Wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
  password_confirmation: Yup.string().required(
    "Password Confirmation wajib diisi"
  ),
});

const Login = () => {
  const [isToggled, setIsToggled] = useState(true);
  const [input, setInput] = useState(initialState);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit1 = async () => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/register",
        {
          name: values.name,
          email: values.email,
          role_id: 3,
          password: values.password,
          password_confirmation: values.password_confirmation,
        }
      );
      Swal.fire({
        title: "Register Successfully!",
        text: "Register successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsToggled(true);
      navigate("/login");
    } catch (error) {
      console.log("error register", error);
      Swal.fire({
        title: "Register Error!",
        text: error.response.data.password || error.response.data.email,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const onSubmit = async (event) => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      console.log("user id", response.data.user.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("user_id", response.data.user.id);
      localStorage.setItem("role_id", response.data.user.role_id);
      setRole(response.data.user.role_id);

      Swal.fire({
        title: "Login Successfully!",
        text: "Login successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0077b6",
      });
      console.log("coba role yaa", response.data.user.role_id);

      if (response.data.user.role_id == 3) {
        navigate("/");
      } else if (response.data.user.role_id == 1) {
        navigate("/admin");
      }

      // ini di perbaiki
    } catch (error) {
      Swal.fire({
        title: "Login Error!",
        text: error.response.data.message,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#0077b6",
      });
      console.log("error", error.response.data.message);
    }
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const {
    handleChange,
    values,
    handleSubmit,
    resetForm,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: input,
    onSubmit: onSubmit,
    onSubmit: onSubmit1,
    enableReinitialize: true,
    validationSchema: schemaValidation,
  });
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="  bg-[#E5E5E5]  min-h-screen relative flex items-center justify-center overflow-x-hidden">
      <div className="bg-white md:bg-transparent rounded-lg md:rounded-none  drop-shadow-md  md:drop-shadow-none w-[90%] relative md:flex   justify-center ">
        <div className="md:hidden   w-[90%] mt-[60px] left-[5%] relative flex justify-center">
          <img src={logo} className="w-[100px] relative  " alt="" />
        </div>
        <div className=" md:relative md:justify-center md:items-center  md:flex  md:w-[55%]  hidden">
          <img src={login} alt="" className="w-[80%] " />
        </div>
        <div className=" md:bg-white rounded-lg w-[90%] md:drop-shadow-md md:h-[600px] md:w-[45%] md:left-0 relative left-[5%]">
          <Link to="/">
            <div className="hidden md:w-[90%] md:mt-[30px] md:left-[5%] md:relative md:flex md:justify-center">
              <img src={logo} className="w-[100px] relative " alt="" />
            </div>{" "}
            <p className="font-bold text-[2.6rem] text-[#00B7FE]">Market </p>
          </Link>

          <div className=" w-[100%] relative p-4  ">
            <div className=" items-center  relative flex justify-between">
              <div className=" relative md:w-[60%]">
                {isToggled ? (
                  <p className="text-left">
                    Don't have an account? <span>Click here </span>
                  </p>
                ) : (
                  <p className="text-left">
                    Have an account? <span>Click here </span>
                  </p>
                )}
              </div>

              <div className=" relative md:w-[40%] flex justify-start">
                <button
                  className={`p-1 bg-[#00B7FE] w-[50px] rounded-full focus:outline-none ${
                    isToggled ? "bg-gray-500 w-[50px]" : ""
                  }`}
                  onClick={handleToggle}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      isToggled ? "transform translate-x-full" : ""
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            {isToggled ? (
              <p></p>
            ) : (
              <div className="pb-4 mt-4 ">
                <p className="text-left">Name</p>
                <input
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  name="name"
                  type="text"
                  placeholder="type name"
                  className="border border-[#667085] h-[40px]  w-[100%] pl-4  rounded-md "
                />
                <p className="text-left text-red-500">
                  {touched.name === true && errors.name}
                </p>
              </div>
            )}

            <div className="pb-4 ">
              <p className="text-left">Email</p>
              <input
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                name="email"
                type="text"
                placeholder="type email"
                className="border border-[#667085] h-[40px]  w-[100%] pl-4  rounded-md "
              />
              <p className="text-left text-red-500">
                {touched.email === true && errors.email}
              </p>
            </div>
            <div className="pb-4">
              <p className="text-left">Password</p>
              <input
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                name="password"
                type="password"
                placeholder="type password"
                className="border border-[#667085] h-[40px]  w-[100%] pl-4  rounded-md "
              />
              <p className="text-left text-red-500">
                {touched.password === true && errors.password}
              </p>
            </div>

            {isToggled ? (
              <p></p>
            ) : (
              <div className="pb-4">
                <p className="text-left">Confirm Password</p>
                <input
                  onChange={handleChange}
                  value={values.password_confirmation}
                  onBlur={handleBlur}
                  name="password_confirmation"
                  type="password"
                  placeholder="type password"
                  className="border border-[#667085] h-[40px]  w-[100%] pl-4  rounded-md "
                />
                <p className="text-left text-red-500">
                  {touched.password_confirmation === true &&
                    errors.password_confirmation}
                </p>
              </div>
            )}
            <div className=" w-[100%] relative ">
              {isToggled ? (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="bg-[#00B7FE] w-[100%] rounded-md h-[40px] text-white"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={onSubmit1}
                  className="bg-[#00B7FE] w-[100%] rounded-md h-[40px] text-white"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default Login;
