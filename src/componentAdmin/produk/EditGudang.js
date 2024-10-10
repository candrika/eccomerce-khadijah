import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditGudang = () => {
  const { fetchGudang } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");
  const { id } = useParams();

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://laravel-api-10.cerise.id/api/warehouses/update/${id}`,
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
      fetchGudang();
      Swal.fire({
        title: "Success!",
        text: "Berhasil Mengupdate Gudang",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/admin/produk/gudang");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.info,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchGudangCategory = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/warehouses/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data.success.alamat);
      setInput({
        name: response.data.success.name,
        alamat: response.data.success.alamat,
      });
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
    onSubmit: handleUpdate,
    validationSchema: schemaValidation,
    enableReinitialize: true,
  });

  useEffect(() => {
    // fetch article detail
    fetchGudangCategory();
  }, []);
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

export default EditGudang;
