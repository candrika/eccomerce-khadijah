import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

import { Coba10 } from "../../components/reusableComponents/Text";
import { InputAdmin1 } from "../../components/reusableComponents/InputAdmin";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  logo: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
});
const AddCourier = () => {
  const { fetchCourier } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const Swal = require("sweetalert2");

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setSelectedFile(image);
    setPreview(URL.createObjectURL(image));
    // console.log(event.target.files[0]);
  };

  useEffect(() => {
    fetchCourier();
  }, []);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("logo", selectedFile);
    formData.append("name", values.name);
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/setting-generals/couriers/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCourier();
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambahkan data channel",
        icon: "warning",
        confirmButtonText: "OK",
      });
      navigate("/admin/settingGeneral/courier/courier");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Login Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cool",
      });
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
  return (
    <div className="w-[90%] left-[5%] md:left-0 md:w-[95%] relative bg-white">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Nama Channel" />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
            placeholder="Input Nama Channel"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.name === true && errors.name}
          </p>
        </div>

        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Logo" />
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            // accept="image/*"
            // onChange={(e) => setInput("image", e.currentTarget.files[0])}
          />
          {/* <File onChange={(e) => setInput(e.target.files[0])} /> */}

          {preview ? (
            <div>
              <img
                src={preview}
                alt="Preview Image"
                className="w-[200px] mt-4"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddCourier;
