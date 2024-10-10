import React, { useContext, useState, useEffect } from "react";
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
  jenis_potongan: "",
  jumlah_potongan: "",
  minimal_pembelian: "",
  jumlah_kupon: "",
  jenis_kupon: "",
  tanggal_start: "",
  tanggal_end: "",
  product_id: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
  jenis_potongan: Yup.string().required("Jenis Potongan Wajib diisi"),
  jumlah_potongan: Yup.string().required("Jumlah Potongan Wajib diisi"),
  minimal_pembelian: Yup.string().required("Minimal Pembelian Wajib diisi"),
  jumlah_kupon: Yup.string().required("Jumlah Kupon Wajib diisi"),
  jenis_kupon: Yup.string().required("Jenis Kupon Wajib diisi"),
  tanggal_start: Yup.string().required("Tanggal Mulai Wajib diisi"),
  tanggal_end: Yup.string().required("Tanggal Berakhir Wajib diisi"),
  product_id: Yup.string().required("Produk  Wajib diisi"),
});

const EditKupon = () => {
  const { fetchProduct, product, kupon, setKupon, fetchKupon } =
    useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleUpdate = async () => {
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
      try {
        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/setting-generals/coupons/update/${id}`,
          {
            name: values.name,
            jenis_potongan: values.jenis_potongan,
            jumlah_potongan: values.jumlah_potongan,
            minimal_pembelian: values.minimal_pembelian,
            jumlah_kupon: values.jumlah_kupon,
            jenis_kupon: values.jenis_kupon,
            tanggal_start: values.tanggal_start,
            tanggal_end: values.tanggal_end,
            product_id: values.product_id,
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchKupon();
        Swal.fire({
          title: "Success!",
          text: "Berhasil Mengupdate Kupon",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        navigate("/admin/kupon/kupon");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.info,
          icon: "warning",
          confirmButtonText: "OK",
        });
        console.log(error);
      }
    }
  };

  const fetchArticleCategory = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/setting-generals/coupons/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data.data);
      setInput({
        name: response.data.data.name,
        jenis_potongan: response.data.data.jenis_potongan,
        jumlah_potongan: response.data.data.jumlah_potongan,
        minimal_pembelian: response.data.data.minimal_pembelian,
        jumlah_kupon: response.data.data.jumlah_kupon,
        jenis_kupon: response.data.data.jenis_kupon,
        tanggal_start: response.data.data.tanggal_start,
        tanggal_end: response.data.data.tanggal_end,
        product_id: response.data.data.product_id,
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
    <div className="w-[90%] left-[5%] md:left-0 md:w-[95%] relative bg-white">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Nama Kupon" />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
            placeholder="Input Nama Diskon"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.name === true && errors.name}
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
            <option value="rupiah">Rupiah</option>
            <option value="percent">Persen</option>
          </select>

          <p className="col-span-3 text-red-500">
            {touched.jenis_potongan === true && errors.jenis_potongan}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Jumlah Potongan" />
          <input
            type="number"
            onChange={handleChange}
            name="jumlah_potongan"
            value={values.jumlah_potongan}
            onBlur={handleBlur}
            placeholder="Input jumlah_potongan"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.jumlah_potongan === true && errors.jumlah_potongan}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Minimal Pembelian" />
          <input
            type="number"
            onChange={handleChange}
            name="minimal_pembelian"
            value={values.minimal_pembelian}
            onBlur={handleBlur}
            placeholder="Input Minimal Pembelian "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.minimal_pembelian === true && errors.minimal_pembelian}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Jumlah Kupon" />
          <input
            type="number"
            onChange={handleChange}
            name="jumlah_kupon"
            value={values.jumlah_kupon}
            onBlur={handleBlur}
            placeholder="Input Jumlah Kupon "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.jumlah_kupon === true && errors.jumlah_kupon}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Jenis Kupon" />
          <select
            name="jenis_kupon"
            onChange={handleChange}
            value={values.jenis_kupon}
            onBlur={handleBlur}
            className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
          >
            <option value="" disabled>
              Pilih Jenis Potongan
            </option>
            <option value="harga">Harga</option>
            <option value="ongkir">Ongkir</option>
          </select>

          <p className="col-span-3 text-red-500">
            {touched.jenis_kupon === true && errors.jenis_kupon}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Tanggal Awal " />
          <input
            type="date"
            onChange={handleChange}
            name="tanggal_start"
            value={values.tanggal_start}
            onBlur={handleBlur}
            placeholder="Input Tanggal Start "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.tanggal_start === true && errors.tanggal_start}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Tanggal Akhir" />
          <input
            type="date"
            onChange={handleChange}
            name="tanggal_end"
            value={values.tanggal_end}
            onBlur={handleBlur}
            placeholder="Input Tanggal Akhir "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.tanggal_end === true && errors.tanggal_end}
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
      </div>

      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditKupon;
