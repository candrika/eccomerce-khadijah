import React, { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba10 } from "../../components/reusableComponents/Text";
import { InputAdmin1 } from "../../components/reusableComponents/InputAdmin";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

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

const EditUser = () => {
  const { fetchProduct, fetchUser } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const Swal = require("sweetalert2");

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setSelectedFile(image);
    setPreview(URL.createObjectURL(image));
    // console.log("image", event.target.files[0]);
  };

  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role_id", values.role_id);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("no_wa", values.no_wa);
    formData.append("gender", values.gender);
    // console.log(values.name);
    try {
      const response = await axios.post(
        `https://laravel-api-10.cerise.id/api/user/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      // console.log("respon sukses", response);
      fetchUser();
      // console.log("response sukses");
      alert("EDIT DATA BERHASIL");
      navigate("/admin/user");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserById = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("x", response.data);
      setInput({
        name: response.data.name,
        email: response.data.email,
        role_id: response.data.role_id,
        no_wa: response.data.no_wa,
        gender: response.data.gender,
      });
      const url = response.data.image;
      const filename = url.substring(url.lastIndexOf("/") + 1);
      // console.log("url", response.data.image);
      // console.log("filename", filename);
      setSelectedFile(filename);
      setPreview(response.data.image);
    } catch (error) {
      console.log(`${error} error`);
    }
    // console.log(`selectedFile ${preview}`);
  };

  useEffect(() => {
    fetchUserById();
  }, []);

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

  // console.log("coba", selectedFile);
  useEffect(() => {
    fetchProduct();
  }, []);

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
            {/* <input
              type="text"
              onChange={handleChange}
              name="gender"
              value={values.gender}
              onBlur={handleBlur}
              placeholder="Input gender"
              className="w-[440px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            /> */}

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

export default EditUser;
