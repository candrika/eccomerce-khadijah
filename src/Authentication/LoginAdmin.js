import React, { useState } from "react";
import login from "../asset_sidebar/Admin-amico.png";
import logo from "../../src/assets/logo.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  email: "",
  password: "",
};

const schemaValidation = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginAdmin = () => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("user_id", response.data.user.id);
      localStorage.setItem("role_id", response.data.user.role_id);

      Swal.fire({
        title: "Login Successfully!",
        text: "Login successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(8 47 73)",
      });

      // if (response.data.user.role_id === 3) {
      //   navigate("/");
      // } else if (response.data.user.role_id === 1) {
      navigate("/admin");
      // }
    } catch (error) {
      Swal.fire({
        title: "Login Error!",
        text: error.response.data.message,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(8 47 73)",
      });
    }
  };

  const { handleChange, values, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialState,
      onSubmit: onSubmit,
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
          <img src={logo} className="w-[50px] relative " alt="" />
        </div>
        <div className=" md:relative md:justify-center md:items-center  md:flex  md:w-[55%]  hidden">
          <img src={login} alt="" className="w-[80%] " />
        </div>
        <div className=" md:bg-white rounded-lg w-[90%] md:drop-shadow-md md:h-[600px] md:w-[45%] md:left-0 relative left-[5%]">
          <div className="hidden md:w-[90%] md:mt-[30px] md:left-[5%] md:relative md:flex md:justify-center">
            <img src={logo} className="w-[200px] relative " alt="" />
          </div>
          {/* <p className="font-bold text-[2.6rem] text-dark">Market </p> */}

          <div className=" w-[100%] relative p-4  ">
            <div className="pb-4 ">
              <p className="text-left">Email</p>
              <input
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                name="email"
                type="text"
                placeholder="Type email"
                className="border border-[#667085] h-[40px]  w-[100%] pl-4  rounded-md "
              />
              <p className="text-left text-red-500">
                {touched.email && errors.email}
              </p>
            </div>
            <div className="pb-4">
              <p className="text-left">Password</p>
              <input
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                name="password"
                type="password"
                placeholder="Type password"
                className="border border-[#667085] h-[40px]  w-[100%] pl-4  rounded-md "
              />
              <p className="text-left text-red-500">
                {touched.password && errors.password}
              </p>
            </div>
            <div className=" w-[100%] relative ">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-dark w-[100%] rounded-md h-[40px] text-white"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
