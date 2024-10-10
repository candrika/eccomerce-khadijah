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
  name: "",
  jenis: "",
  tanggal_start: "",
  tanggal_end: "",
  jenis_potongan: "",
  product_id: "",
  jumlah: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
  jenis: Yup.string().required("Jenis Wajib diisi"),
  tanggal_start: Yup.string().required("Tanggal Mulai Wajib diisi"),
  tanggal_end: Yup.string().required("Tanggal Berakhir Wajib diisi"),
  jenis_potongan: Yup.string().required("Jenis Potongan Wajib diisi"),
  product_id: Yup.string().required("Produk Wajib diisi"),
  jumlah: Yup.string().required("Jumlah Wajib diisi"),
});

const EditDiskon = () => {
  const { disc, fetchDiscount, product, fetchProduct } =
    useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  // function handleChangeDate(event) {
  //   const { tanggal_start, value } = event.target;

  //   if (tanggal_start === "date") {
  //     const parsedDate = new Date(value);
  //     const formattedDate = format(parsedDate, "YYYY/MM/DD");

  //     setInput((prevState) => ({
  //       ...prevState,
  //       [tanggal_start]: formattedDate,
  //     }));
  //   } else {
  //     setInput((prevState) => ({
  //       ...prevState,
  //       [tanggal_start]: value,
  //     }));
  //   }
  // }

  const handleUpdate = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin mengubah diskon?",
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
          `https://laravel-api-10.cerise.id/api/discounts/update/${id}`,
          {
            name: values.name,
            jenis: values.jenis,
            tanggal_start: values.tanggal_start,
            tanggal_end: values.tanggal_end,
            jenis_potongan: values.jenis_potongan,
            product_id: values.product_id,
            jumlah: values.jumlah,
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
          text: "Berhasil Mengupdate Data Diskon",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/admin/produk/category");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
        console.log(error);
      }
    }
  };

  const fetchDiscountById = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/discounts/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("x", response.data.status.tanggal_end);
      setInput({
        name: response.data.status.name,
        jenis: response.data.status.jenis,
        tanggal_start: response.data.status.tanggal_start,
        tanggal_end: response.data.status.tanggal_end,
        jenis_potongan: response.data.status.jenis_potongan,
        product_id: response.data.status.product.name,
        jumlah: response.data.status.jumlah,
      });
    } catch (error) {
      console.log(error.response);
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
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchDiscountById();
  }, []);
  return (
    <div className="w-[95%] relative bg-white">
      <div className=" grid grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Nama Diskon" />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
            placeholder="Input diskon"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.name === true && errors.name}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Jenis Diskon" />

          <select
            name="jenis"
            onChange={handleChange}
            value={values.jenis}
            onBlur={handleBlur}
            className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
          >
            <option value="" disabled>
              Pilih Jenis Diskon
            </option>
            <option value="rupiah">Rupiah</option>
            <option value="percent">Persen</option>
          </select>

          <p className="col-span-3 text-red-500">
            {touched.jenis === true && errors.jenis}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Tanggal Start" />
          <input
            type="date"
            onChange={handleChange}
            name="tanggal_start"
            value={values.tanggal_start}
            onBlur={handleBlur}
            placeholder="Input Tanggal Mulai "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.tanggal_start === true && errors.tanggal_start}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Tanggal Berakhir" />
          <input
            type="date"
            onChange={handleChange}
            name="tanggal_end"
            value={values.tanggal_end}
            onBlur={handleBlur}
            placeholder="Input Tanggal Berakhir "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.tanggal_end === true && errors.tanggal_end}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Jenis Potongan" />
          <select
            name="jenis_potongan"
            onChange={handleChange}
            value={values.jenis_potongan}
            onBlur={handleBlur}
            className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
          >
            <option value="" disabled>
              Pilih Jenis Potongan
            </option>
            <option value="ongkir">Ongkir</option>
            <option value="harga">Harga</option>
          </select>

          <p className="col-span-3 text-red-500">
            {touched.jenis_potongan === true && errors.jenis_potongan}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Produk" />
          <select
            name="product_id"
            onChange={handleChange}
            value={values.product_id}
            onBlur={handleBlur}
            className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
          >
            <option value="" disabled>
              Pilih Produk
            </option>
            {product.map((product, index) => (
              <option value={product.id}>{product.name}</option>
            ))}
          </select>

          <p className="col-span-3 text-red-500">
            {touched.product_id === true && errors.product_id}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Jumlah" />
          <input
            type="text"
            onChange={handleChange}
            name="jumlah"
            value={values.jumlah}
            onBlur={handleBlur}
            placeholder="Input Jumlah "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.jumlah === true && errors.jumlah}
          </p>
        </div>
      </div>

      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditDiskon;
