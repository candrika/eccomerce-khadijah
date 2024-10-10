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
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Kategori Wajib diisi"),
});
const AddCategory = () => {
  const { fetchProduct } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/categories/create",
        {
          name: values.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchProduct();
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambahkan data category",
        icon: "warning",
        confirmButtonText: "OK",
      });
      navigate("/admin/produk/category");
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
    <div className="w-[95%] relative bg-white">
      <div className=" grid grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Kategori Customer" />
          {/* <InputAdmin1
            text="Kategori Customer"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
          /> */}
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
            placeholder="Input nama barang"
            className="w-[440px] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.name === true && errors.name}
          </p>
        </div>
      </div>
      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddCategory;
