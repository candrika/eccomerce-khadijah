import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba10 } from "../../components/reusableComponents/Text";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const initialState = {
  name: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Item Wajib diisi"),
});

const AddItem = () => {
  const { fetchItem } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  const onSubmit = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menambah data item?",
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
          "https://laravel-api-10.cerise.id/api/item_units/create",
          {
            name: values.name,
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
          text: "Berhasil menambahkan data item",
          confirmButtonColor: "#3085d6",
          icon: "warning",
          confirmButtonText: "OK",
        });
        navigate("/admin/produk/unitItem");
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Login Error!",
          text: error,
          icon: "warning",
          confirmButtonColor: "#d33",
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

export default AddItem;
