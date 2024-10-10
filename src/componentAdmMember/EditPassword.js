import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContextAddress } from "../context/GlobalContextAddress";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Coba10 } from "../components/reusableComponents/Text";

const initialState = {
  password: "",
  password_confirmation: "",
};

const schemaValidation = Yup.object({
  // password: Yup.string().required("Password Wajib diisi"),
  // password_confirmation: Yup.string().required(
  //   "Password Konfirmasi Wajib diisi"
  // ),
});

const EditPassword = () => {
  const { userSetting, fetchUserSetting } = useContext(GlobalContextAddress);
  const [input, setInput] = useState(initialState);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const Swal = require("sweetalert2");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Track accordion state

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setSelectedFile(image);
    setPreview(URL.createObjectURL(image));
    // console.log("image", event.target.files[0]);
  };

  const onSubmit = async (e) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menyimpan perubahan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);

      // console.log(values.name);
      try {
        const response = await axios.post(
          `https://laravel-api-10.cerise.id/api/member/update/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-HTTP-Method-Override": "PUT",
            },
          }
        );
        // console.log("respon sukses", response);
        fetchUserSetting();
        // console.log("response sukses");
        await Swal.fire({
          title: "Sukses",
          text: "Edit Data Diri Berhasil",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        navigate("/");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan ",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        console.log(error);
      }
    }
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
    validationSchema: schemaValidation,
    enableReinitialize: true,
  });

  useEffect(() => {
    fetchUserSetting();
  }, []);
  return (
    <div className="w-[95%] relative bg-white">
      <form onSubmit={handleSubmit}>
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-4 p-4">
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Password" />
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              placeholder="Input password"
              className="w-[95%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />
            {/* 
            <p className="col-span-3 text-red-500">
              {touched.name === true && errors.name}
            </p> */}
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Konfirmasi Password" />
            <input
              type="password"
              onChange={handleChange}
              name="password_confirmation"
              value={values.password_confirmation}
              onBlur={handleBlur}
              placeholder="Input konfirmasi password"
              className="w-[95%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            {/* <p className="col-span-3 text-red-500">
              {touched.name === true && errors.name}
            </p> */}
          </div>
        </div>
        <div className="p-4 flex justify-start">
          <button
            type="submit"
            className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
