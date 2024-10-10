import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContextAddress } from "../context/GlobalContextAddress";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Coba10 } from "../components/reusableComponents/Text";

const initialState = {
  image: "",
  name: "",
  email: "",
  role_id: "",
  // password: "",
  // password_confirmation: "",
  no_wa: "",
  gender: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
  email: Yup.string().required("Email Wajib diisi"),
  // role_id: Yup.string().required("Role Wajib diisi"),
  // password: Yup.string().required("Password Wajib diisi"),
  // password_confirmation: Yup.string().required(
  //   "Password Konfirmasi Wajib diisi"
  // ),
  // no_wa: Yup.string().required("No WA Wajib diisi"),
  // gender: Yup.string().required("Gender Wajib diisi"),
});

const MemberSetting = () => {
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

  const fetchUserById = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/member`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("x", response.data.user.image);
      setInput({
        name: response.data.user.name,
        email: response.data.user.email,
        no_wa: response.data.user.no_wa,
        gender: response.data.user.gender,
      });
      const url = response.data.user.img;
      // const filename = url.substring(url.lastIndexOf("/") + 1);
      // console.log("filename", url);
      setSelectedFile(url);
      setPreview(response.data.user.image);
    } catch (error) {
      console.log(`${error} error`);
    }
    // console.log(`selectedFile ${preview}`);
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
      formData.append("image", selectedFile);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("role_id", 3);
      // formData.append("password", values.password);
      // formData.append("password_confirmation", values.password_confirmation);
      formData.append("no_wa", values.no_wa);
      formData.append("gender", values.gender);
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

        navigate("/member/member-view");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan .",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
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

  useEffect(() => {
    fetchUserSetting();
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
              className="w-[95%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
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
              className="w-[95%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
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
              className="w-[95%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            />

            <p className="col-span-3 text-red-500">
              {touched.no_wa === true && errors.no_wa}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Jenis Kelamin" />
            <select
              name="gender"
              onChange={handleChange}
              value={values.gender}
              onBlur={handleBlur}
              className="w-[95%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
            >
              <option value="" disabled>
                Pilih Jenis Kelamin
              </option>
              <option value="laki-laki">Laki-Laki</option>
              <option value="perempuan">Perempuan</option>
            </select>

            <p className="col-span-3 text-red-500">
              {touched.gender === true && errors.gender}
            </p>
          </div>
          <div className="text-left rounded-md h-auto ">
            <Coba10 text="Image" />
            <input type="file" name="image" onChange={handleFileChange} />
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="Preview Image"
                  className="w-[95%] mt-4"
                />
              </div>
            ) : (
              <div></div>
            )}
            <p className="col-span-3 text-red-500">
              {touched.image === true && errors.image}
            </p>
          </div>
          {/* Accordion Button */}
          {/* <div className="text-left rounded-md h-auto ">
            <button
              type="button"
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="bg-blue-500 text-dark  rounded-lg "
            >
              {isAccordionOpen ? "Close Password" : "Change Password"}
            </button>
            {isAccordionOpen && (
              <div>
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
                    className="w-[95%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
                  />
                  <p className="col-span-3 text-red-500">
                    {touched.password_confirmation === true &&
                      errors.password_confirmation}
                  </p>
                </div>
              </div>
            )}
          </div> */}
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

export default MemberSetting;
