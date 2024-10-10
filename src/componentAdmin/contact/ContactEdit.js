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
  namaToko: "",
  alamat: "",
  maps: "",
  nomorTelp: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  whatsapp: "",
  telegram: "",
  tokopedia: "",
  shopee: "",
  bukalapak: "",
  lazada: "",
};

const schemaValidation = Yup.object({
  namaToko: Yup.string().required("Nama Toko Wajib diisi"),
  alamat: Yup.string().required("Alamat Wajib diisi"),
  maps: Yup.string().required("Maps Wajib diisi"),
  nomorTelp: Yup.string().required("Nomor Telepon Wajib diisi"),
  facebook: Yup.string().required("Facebook Wajib diisi"),
  instagram: Yup.string().required("Instagram Wajib diisi"),
  tiktok: Yup.string().required("Tiktok Wajib diisi"),
  whatsapp: Yup.string().required("Whatsapp Wajib diisi"),
  telegram: Yup.string().required("Telegram Wajib diisi"),
  shopee: Yup.string().required("Shopee Wajib diisi"),
  bukalapak: Yup.string().required("Bukalapak Wajib diisi"),
  lazada: Yup.string().required("Lazada Wajib diisi"),
});

const ContactEdit = () => {
  const { fetchContact, setContact } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

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
      try {
        await axios.post(
          `https://laravel-api-10.cerise.id/api/setting-generals/contact-update`,
          {
            namaToko: values.namaToko,
            alamat: values.alamat,
            maps: values.maps,
            nomorTelp: values.nomorTelp,
            facebook: values.facebook,
            instagram: values.instagram,
            tiktok: values.tiktok,
            whatsapp: values.whatsapp,
            telegram: values.telegram,
            tokopedia: values.tokopedia,
            shopee: values.shopee,
            bukalapak: values.bukalapak,
            lazada: values.lazada,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "X-HTTP-Method-Override": "PUT",
            },
          }
        );
        fetchContact();
        await Swal.fire({
          title: "Sukses",
          text: "Edit Data Berhasil",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        navigate("/admin/contact");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan ",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const fetchContact2 = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/setting-generals/contact`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("x", response.data.data);
      setInput({
        namaToko: response.data.data.namaToko,
        alamat: response.data.data.alamat,
        maps: response.data.data.maps,
        nomorTelp: response.data.data.nomorTelp,
        facebook: response.data.data.facebook,
        instagram: response.data.data.instagram,
        tiktok: response.data.data.tiktok,
        whatsapp: response.data.data.whatsapp,
        telegram: response.data.data.telegram,
        tokopedia: response.data.data.tokopedia,
        shopee: response.data.data.shopee,
        bukalapak: response.data.data.bukalapak,
        lazada: response.data.data.lazada,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan ",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
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

  useEffect(() => {
    fetchContact();
    fetchContact2();
  }, []);

  return (
    <div className="w-[90%] relative left-[5%] md:left-0 md:w-[95%] relative bg-white">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Nama Toko" />
          <input
            type="text"
            onChange={handleChange}
            name="namaToko"
            value={values.namaToko}
            onBlur={handleBlur}
            placeholder="Input Nama Toko"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.namaToko === true && errors.namaToko}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Alamat" />
          <input
            type="text"
            onChange={handleChange}
            name="alamat"
            value={values.alamat}
            onBlur={handleBlur}
            placeholder="Input Alamat"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.alamat === true && errors.alamat}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Maps" />
          <input
            type="text"
            onChange={handleChange}
            name="maps"
            value={values.maps}
            onBlur={handleBlur}
            placeholder="Input Maps"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.maps === true && errors.maps}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="No Telp" />
          <input
            type="text"
            onChange={handleChange}
            name="nomorTelp"
            value={values.nomorTelp}
            onBlur={handleBlur}
            placeholder="Input Nomor Telepon"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.nomorTelp === true && errors.nomorTelp}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Facebook" />
          <input
            type="text"
            onChange={handleChange}
            name="facebook"
            value={values.facebook}
            onBlur={handleBlur}
            placeholder="Input Facebook"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.facebook === true && errors.facebook}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Instagram" />
          <input
            type="text"
            onChange={handleChange}
            name="instagram"
            value={values.instagram}
            onBlur={handleBlur}
            placeholder="Input Instagram"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.instagram === true && errors.instagram}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Tiktok" />
          <input
            type="text"
            onChange={handleChange}
            name="tiktok"
            value={values.tiktok}
            onBlur={handleBlur}
            placeholder="Input Tiktok"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.tiktok === true && errors.tiktok}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Whatsapp" />
          <input
            type="text"
            onChange={handleChange}
            name="whatsapp"
            value={values.whatsapp}
            onBlur={handleBlur}
            placeholder="Input Whatsapp"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.whatsapp === true && errors.whatsapp}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Telegram" />
          <input
            type="text"
            onChange={handleChange}
            name="telegram"
            value={values.telegram}
            onBlur={handleBlur}
            placeholder="Input telegram"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.telegram === true && errors.telegram}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Tokopedia" />
          <input
            type="text"
            onChange={handleChange}
            name="tokopedia"
            value={values.tokopedia}
            onBlur={handleBlur}
            placeholder="Input Tokopedia"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.tokopedia === true && errors.tokopedia}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Shopee" />
          <input
            type="text"
            onChange={handleChange}
            name="shopee"
            value={values.shopee}
            onBlur={handleBlur}
            placeholder="Input Shopee"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.shopee === true && errors.shopee}
          </p>
        </div>
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Bukalapak" />
          <input
            type="text"
            onChange={handleChange}
            name="bukalapak"
            value={values.bukalapak}
            onBlur={handleBlur}
            placeholder="Input bukalapak"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.bukalapak === true && errors.bukalapak}
          </p>
        </div>

        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Lazada" />
          <input
            type="text"
            onChange={handleChange}
            name="lazada"
            value={values.lazada}
            onBlur={handleBlur}
            placeholder="Input lazada"
            className="w-[100%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
          />

          <p className="col-span-3 text-red-500">
            {touched.lazada === true && errors.lazada}
          </p>
        </div>
      </div>

      <div className="p-4">
        <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ContactEdit;
