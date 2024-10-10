import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba10 } from "../../components/reusableComponents/Text";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import File from "../../components/reusableComponents/File";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";

const initialState = {
  logo: "",
};

const SettingLogo = () => {
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
    console.log(event.target.files[0]);
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("logo", selectedFile);
    try {
      await axios.post(
        "https://laravel-api-10.cerise.id/api/setting-generals/update-logo/1",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      fetchUser();
      alert("SIMPAN DATA BERHASIL");
      navigate("/admin/setting-general");
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
    enableReinitialize: true,
  });
  return (
    <div className="w-[95%] relative bg-white">
      <form onSubmit={handleSubmit}>
        <div className=" grid lg:grid-cols-2 grid-cols-1  gap-4 p-4">
          <div className="text-left rounded-md h-auto ">
            <div className="mt-4 mb-8">
              <Coba10 text="Setting Logo" />
            </div>
            <input type="file" name="logo" onChange={handleFileChange} />
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
          <div className="flex justify-start  w-[90%] relative ">
            <BtnAdmin1 text="Save" type="submit" />
          </div>
          {/* <button
            type="submit"
            className=" mr-4 border border-sky-600 bg-sky-600 text-white h-[40px] w-[80px] rounded-md hover:bg-white hover:text-black"
          >
            Simpan
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default SettingLogo;
