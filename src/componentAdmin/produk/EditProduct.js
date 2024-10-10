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
// Import CKEditor from the correct package
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialState = {
  name: "",
  SKU: "",
  status: "1",
  stock: "",
  berat: "",
  price_sale: "",
  price_reseller: "",
  price_grosir: "",
  min_grosir: "",
  max_grosir: "",
  warehouse_id: "",
  category_id: "",
  item_unit_id: "",
  product_detail: "",
  discount_ongkir: "",
  discount_harga: "",
  jenis_discount_harga: "",
  jenis_discount_ongkir: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("Nama Wajib diisi"),
  product_detail: Yup.string().required("Produk Detail Wajib diisi"),
  SKU: Yup.string().required("SKU Wajib diisi"),
  status: Yup.string().required("Status Wajib diisi"),
  stock: Yup.string().required("Stock Wajib diisi"),
  // min_grosir: Yup.string().required("Min Grosir Wajib diisi"),
  // max_grosir: Yup.string().required("Max Grosir Wajib diisi"),
  berat: Yup.string().required("Berat Wajib diisi"),
  price_sale: Yup.string().required("Price Sale Wajib diisi"),
  // price_reseller: Yup.string().required("Price Reseller Wajib diisi"),
  // price_grosir: Yup.string().required("Price Grosir Wajib diisi"),
  // discount_ongkir: Yup.string().required("Diskon Ongkir Wajib diisi"),
  // discount_harga: Yup.string().required("Diskon Harga Wajib diisi"),
  category_id: Yup.string().required("Kategori Wajib diisi"),
  warehouse_id: Yup.string().required("Gudang Wajib diisi"),
  item_unit_id: Yup.string().required("Item Unit Wajib diisi"),
});

const EditProduct = () => {
  const {
    fetchCategory,
    fetchProduct,
    product,
    fetchGudang,
    fetchItem,
    category,
    item,
    gudang,
  } = useContext(GlobalContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  const handleUpdate = async () => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin mengubah produk?",
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
          `https://laravel-api-10.cerise.id/api/products/update/${id}`,
          {
            name: values.name,
            product_detail: values.product_detail,
            SKU: values.SKU,
            status: values.status,
            stock: values.stock,
            min_grosir: values.min_grosir,
            max_grosir: values.max_grosir,
            berat: values.berat,
            price_sale: values.price_sale,
            price_reseller: values.price_reseller,
            price_grosir: values.price_grosir,
            discount_ongkir: values.discount_ongkir,
            discount_harga: values.discount_harga,
            jenis_discount_ongkir: values.jenis_discount_ongkir,
            jenis_discount_harga: values.jenis_discount_harga,
            category_id: values.category_id,
            warehouse_id: values.warehouse_id,
            item_unit_id: values.item_unit_id,
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
          text: "Berhasil Mengupdate Produk",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        navigate("/admin/produk/dataProduk");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "warning",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        console.log(error.response.data);
      }
    }
  };

  const fetchArticleCategory = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/products/show/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data.success);
      setInput({
        name: response.data.success.name,
        SKU: response.data.success.SKU,
        status: response.data.success.status,
        stock: response.data.success.stock,
        berat: response.data.success.berat,
        price_sale: response.data.success.price_sale,
        price_reseller: response.data.success.price_reseller,
        price_grosir: response.data.success.price_grosir,
        min_grosir: response.data.success.min_grosir,
        max_grosir: response.data.success.max_grosir,
        warehouse_id: response.data.success.warehouse_id,
        category_id: response.data.success.category_id,
        item_unit_id: response.data.success.item_unit_id,
        product_detail: response.data.success.product_detail,
        discount_ongkir: response.data.success.discount_ongkir,
        discount_harga: response.data.success.discount_harga,
        jenis_discount_harga: response.data.success.jenis_discount_harga,
        jenis_discount_ongkir: response.data.success.jenis_discount_ongkir,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchGudang();
    fetchItem();
    fetchArticleCategory();
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
    onSubmit: handleUpdate,
    validationSchema: schemaValidation,
    enableReinitialize: true,
  });

  return (
    <div className="w-[95%] relative bg-white">
      <div className=" grid grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Nama Produk" />
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
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="SKU" />
          <input
            type="text"
            onChange={handleChange}
            name="SKU"
            value={values.SKU}
            onBlur={handleBlur}
            placeholder="Input SKU"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
            disabled
          />

          <p className="col-span-3 text-red-500">
            {touched.SKU === true && errors.SKU}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Stok" />
          <input
            type="text"
            onChange={handleChange}
            name="stock"
            value={values.stock}
            onBlur={handleBlur}
            placeholder="Input Stok "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.stock === true && errors.stock}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Berat" />
          <input
            type="number"
            onChange={handleChange}
            name="berat"
            value={values.berat}
            onBlur={handleBlur}
            placeholder="Input Maksimal Grosir "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.berat === true && errors.berat}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Price Sale" />
          <input
            type="number"
            onChange={handleChange}
            name="price_sale"
            value={values.price_sale}
            onBlur={handleBlur}
            placeholder="Input price sale "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.price_sale === true && errors.price_sale}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Price Reseller" />
          <input
            type="number"
            onChange={handleChange}
            name="price_reseller"
            value={values.price_reseller}
            onBlur={handleBlur}
            placeholder="Input price reseller "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.price_reseller === true && errors.price_reseller}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Price Grosir" />
          <input
            type="number"
            onChange={handleChange}
            name="price_grosir"
            value={values.price_grosir}
            onBlur={handleBlur}
            placeholder="Input price grosir "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.price_grosir === true && errors.price_grosir}
          </p>
        </div>
        <div className="text-left rounded-md h-auto">
          <Coba10 text="Detail" />
          <ReactQuill
            value={values.product_detail}
            onChange={(newValue) => setFieldValue("product_detail", newValue)}
          />
          <p className="col-span-3 text-red-500">
            {touched.product_detail === true && errors.product_detail}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Minimal Grosir" />
          <input
            type="number"
            onChange={handleChange}
            name="min_grosir"
            value={values.min_grosir}
            onBlur={handleBlur}
            placeholder="Input Tanggal Berakhir "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.min_grosir === true && errors.min_grosir}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Maksimal Grosir" />
          <input
            type="number"
            onChange={handleChange}
            name="max_grosir"
            value={values.max_grosir}
            onBlur={handleBlur}
            placeholder="Input Maksimal Grosir "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.max_grosir === true && errors.max_grosir}
          </p>
        </div>{" "}
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Jenis Diskon Ongkir" />
          <select
            name="jenis_discount_ongkir"
            onChange={handleChange}
            value={values.jenis_discount_ongkir}
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
            {touched.jenis_discount_ongkir === true &&
              errors.jenis_discount_ongkir}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Diskon Ongkir" />
          <input
            type="number"
            onChange={handleChange}
            name="discount_ongkir"
            value={values.discount_ongkir}
            onBlur={handleBlur}
            placeholder="Input discount ongkir "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.discount_ongkir === true && errors.discount_ongkir}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Jenis Diskon Harga" />
          <select
            name="jenis_discount_harga"
            onChange={handleChange}
            value={values.jenis_discount_harga}
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
            {touched.jenis_discount_harga === true &&
              errors.jenis_discount_harga}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Diskon Harga" />
          <input
            type="number"
            onChange={handleChange}
            name="discount_harga"
            value={values.discount_harga}
            onBlur={handleBlur}
            placeholder="Input discount harga "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.discount_harga === true && errors.discount_harga}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Kategori" />
          {/* <input
            type="text"
            onChange={handleChange}
            name="category_id"
            value={values.category_id}
            onBlur={handleBlur}
            placeholder="Input category id "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          /> */}
          <select
            name="category_id"
            onChange={handleChange}
            value={values.category_id}
            onBlur={handleBlur}
            className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            {category.map((category, index) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
          <p className="col-span-3 text-red-500">
            {touched.category_id === true && errors.category_id}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Gudang" />
          {/* <input
            type="text"
            onChange={handleChange}
            name="warehouse_id"
            value={values.warehouse_id}
            onBlur={handleBlur}
            placeholder="Input category id "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          /> */}

          <select
            name="warehouse_id"
            onChange={handleChange}
            value={values.warehouse_id}
            onBlur={handleBlur}
            className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
          >
            <option value="" disabled>
              Pilih Gudang
            </option>
            {gudang.map((gudang, index) => (
              <option value={gudang.id}>{gudang.name}</option>
            ))}
          </select>
          <p className="col-span-3 text-red-500">
            {touched.warehouse_id === true && errors.warehouse_id}
          </p>
        </div>
        <div className="text-left   rounded-md h-auto ">
          <Coba10 text="Item " />
          {/* <input
            type="text"
            onChange={handleChange}
            name="item_unit_id"
            value={values.item_unit_id}
            onBlur={handleBlur}
            placeholder="Input category id "
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          /> */}

          <select
            name="item_unit_id"
            onChange={handleChange}
            value={values.item_unit_id}
            onBlur={handleBlur}
            className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
          >
            <option value="" disabled>
              Pilih Item
            </option>
            {item.map((item, index) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
          <p className="col-span-3 text-red-500">
            {touched.item_unit_id === true && errors.item_unit_id}
          </p>
        </div>
      </div>

      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditProduct;
