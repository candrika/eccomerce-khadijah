import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba10 } from "../../components/reusableComponents/Text";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import File from "../../components/reusableComponents/File";

const initialState = {
  image: "",
  name: "",
  email: "",
  role_id: "",
  password: "",
  password_confirmation: "",
  no_wa: "",
  gender: "",
};

const schemaValidation = Yup.object({
  // image: Yup.string().required("Image Wajib diisi"),
  name: Yup.string().required("Nama Wajib diisi"),
  email: Yup.string().required("Email Wajib diisi"),
  role_id: Yup.string().required("Role Wajib diisi"),
  password: Yup.string().required("Password Wajib diisi"),
  password_confirmation: Yup.string().required(
    "Password Konfirmasi Wajib diisi"
  ),
  no_wa: Yup.string().required("No WA Wajib diisi"),
  gender: Yup.string().required("Gender Wajib diisi"),
});

const AddUser = () => {
  const { fetchProduct, fetchUser } = useContext(GlobalContext);
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

  const onSubmit = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role_id", values.role_id);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("no_wa", values.no_wa);
    formData.append("gender", values.gender);
    try {
      await axios.post(
        "https://laravel-api-10.cerise.id/api/user/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUser();
      alert("SIMPAN DATA BERHASIL");
      navigate("/admin/user");
    } catch (error) {
      console.log(error);
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
    <div className="w-[95%] relative bg-white">
      <form onSubmit={handleSubmit}>
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-4 p-4">
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Nama" />
            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={values.name}
              onBlur={handleBlur}
              placeholder="Input nama user"
              className="w-[440px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            <p className="col-span-3 text-red-500">
              {touched.name === true && errors.name}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Email Customer" />
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={values.email}
              onBlur={handleBlur}
              placeholder="Input email"
              className="w-[440px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            <p className="col-span-3 text-red-500">
              {touched.email === true && errors.email}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="No WA" />
            <input
              type="number"
              onChange={handleChange}
              name="no_wa"
              value={values.no_wa}
              onBlur={handleBlur}
              placeholder="Input wa "
              className="w-[440px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            <p className="col-span-3 text-red-500">
              {touched.no_wa === true && errors.no_wa}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Gender" />
            <select
              name="gender"
              onChange={handleChange}
              value={values.gender}
              onBlur={handleBlur}
              className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
            >
              <option value="" disabled>
                Pilih Role
              </option>
              <option value="laki-laki">Laki-Laki</option>
              <option value="laki-laki">Perempuan</option>
            </select>

            <p className="col-span-3 text-red-500">
              {touched.gender === true && errors.gender}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Image" />
            <input
              type="file"
              name="image"
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
            <p className="col-span-3 text-red-500">
              {touched.image === true && errors.image}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Role" />
            <select
              name="role_id"
              onChange={handleChange}
              value={values.role_id}
              onBlur={handleBlur}
              className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
            >
              <option value="" disabled>
                Pilih Role
              </option>
              <option value="1">Superadmin</option>
              <option value="2">Admin</option>
              <option value="3">Member</option>
            </select>

            <p className="col-span-3 text-red-500">
              {touched.role_id === true && errors.role_id}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Password" />
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              placeholder="Input password"
              className="w-[440px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            <p className="col-span-3 text-red-500">
              {touched.password === true && errors.password}
            </p>
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
              className="w-[440px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            <p className="col-span-3 text-red-500">
              {touched.password_confirmation === true &&
                errors.password_confirmation}
            </p>
          </div>
        </div>
        <div className="p-4">
          <button
            type="submit"
            className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
