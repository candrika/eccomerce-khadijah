import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  name: Yup.string().required("Kategori Wajib diisi"),
});
const EditCategory = () => {
  const { fetchProduct } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  const handleUpdate = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin mengubah kategori?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/categories/update/${id}`,
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
          text: "Berhasil Mengupdate Category",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        navigate("/admin/produk/category");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.info,
          icon: "warning",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        console.log(error.response.data.info);
      }
    }
  };

  const fetchArticleCategory = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/categories/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response.data.data", response.data.success);
      setInput({
        name: response.data.success.name,
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
    fetchArticleCategory();
  }, []);
  return (
    <div className="w-[95%] relative bg-white">
      <div className=" grid grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Kategori Customer" />
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

export default EditCategory;
