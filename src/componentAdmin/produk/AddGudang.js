import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { InputAdmin1 } from "../../components/reusableComponents/InputAdmin";
import { Coba10 } from "../../components/reusableComponents/Text";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  alamat: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Gudang Wajib diisi"),
  alamat: Yup.string().required("Alamat Wajib diisi"),
});

const AddGudang = () => {
  const { fetchItem } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  const onSubmit = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menambah data gudang?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.post(
          "https://laravel-api-10.cerise.id/api/warehouses/create",
          {
            name: values.name,
            alamat: values.alamat,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchItem();
        Swal.fire({
          title: "Success!",
          text: "Berhasil menambahkan data gudang",
          confirmButtonColor: "#3085d6",
          icon: "warning",
          confirmButtonText: "OK",
        });
        navigate("/admin/produk/gudang");
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Login Error!",
          text: error,
          confirmButtonColor: "#d33",
          icon: "warning",
          confirmButtonText: "Cool",
        });
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

  return (
    <div className="w-[95%] relative bg-white">
      <div className=" grid grid-cols-1 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Nama Gudang" />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
            placeholder="Input nama barang"
            className="w-[90%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.name === true && errors.name}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Alamat" />
          <input
            type="text"
            onChange={handleChange}
            name="alamat"
            value={values.alamat}
            onBlur={handleBlur}
            placeholder="Input alamat"
            className="w-[90%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.alamat === true && errors.alamat}
          </p>
        </div>
      </div>
      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddGudang;
