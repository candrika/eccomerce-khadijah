import React, { useContext, useEffect, useState } from "react";
import { GlobalContextAddress } from "../../context/GlobalContextAddress";
import { Coba10, Coba11, Coba13 } from "../reusableComponents/Text";
import { BtnAdmin10 } from "../reusableComponents/ButtonAdmin";
import wa from "../../assets/whatsapp.png";
import { Link } from "react-router-dom";
import Button from "../reusableComponents/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

const initialState = {
  island_id: "",
  province_id: "",
  city_id: "",
  detail_alamat: "",
};

const schemaValidation = Yup.object({
  island_id: Yup.string().required("Pulau Wajib diisi"),
  province_id: Yup.string().required("Provinsi Wajib diisi"),
  city_id: Yup.string().required("Kota Mulai Wajib diisi"),
  detail_alamat: Yup.string().required("Detail Alamat Wajib diisi"),
});
const SettingUser = () => {
  const [input, setInput] = useState(initialState);
  const [hide, setHide] = useState(true);
  const Swal = require("sweetalert2");
  const {
    userSetting,
    fetchUserSetting,
    pulau,
    fetchPulau,
    provinsi,
    fetchProvinsi,
    city,
    fetchCity,
  } = useContext(GlobalContextAddress);

  useEffect(() => {
    fetchUserSetting();
    fetchPulau();
    fetchProvinsi();
    fetchCity();
  }, []);
  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/discounts/create",
        {
          name: values.name,
          island_id: values.island_id,
          province_id: values.province_id,
          city_id: values.city_id,
          detail_alamat: values.detail_alamat,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUserSetting();
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambahkan data gudang",
        icon: "warning",
        confirmButtonText: "OK",
      });
      window.location.reload();
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
    <div>
      {/* {kupon.map((kupon, index) => ( */}

      {userSetting.map((userSetting, index) => (
        <div>
          <Coba13 text={userSetting.data.message} />
          <div className="mt-4 flex justify-center">
            <BtnAdmin10 text="Update Data" onClick={() => setHide(!hide)} />
          </div>
        </div>
      ))}
      {hide ? (
        <div className=" relative p-4">
          <div className="bg-white  rounded-lg shadow-lg relative md:flex w-[90%] left-[5%]">
            <div className=" relative bg-white w-[100%]  ">
              <div className=" w-[90%] relative left-[5%] text-left">
                <p className="font-bold text-lg text-[#00B7FE]">Data Alamat</p>
              </div>
              <div className=" w-[90%] relative left-[5%] text-left">
                <div className=" py-3">
                  <Coba10 text="Pulau:" />
                  <select
                    name="island_id"
                    // onChange={handleChange}
                    // value={values.jenis_potongan}
                    // onBlur={handleBlur}
                    className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
                  >
                    <option value="" disabled>
                      Pilih Jenis Pulau
                    </option>
                    {pulau.map((pulau, index) => (
                      <option value={pulau.id}>{pulau.nameIsland}</option>
                    ))}
                  </select>
                </div>
                <div className=" py-3">
                  <Coba10 text="Provinsi:" />
                  <select
                    name="province_id"
                    // onChange={handleChange}
                    // value={values.jenis_potongan}
                    // onBlur={handleBlur}
                    className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
                  >
                    <option value="" disabled>
                      Pilih Jenis Provinsi
                    </option>
                    {provinsi.map((provinsi, index) => (
                      <option value={provinsi.id}>
                        {provinsi.nameProvince}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=" py-3">
                  <Coba10 text="Kota:" />
                  <select
                    name="city_id"
                    // onChange={handleChange}
                    // value={values.jenis_potongan}
                    // onBlur={handleBlur}
                    className="w-[100%] h-[60px] border border-[#D3D3D3] rounded-lg pl-4"
                  >
                    <option value="" disabled>
                      Pilih Jenis City
                    </option>
                    {city.map((city, index) => (
                      <option value={city.id}>{city.nameCities}</option>
                    ))}
                  </select>
                </div>

                <div className=" py-3">
                  <Button text="Save" variant="button-2" />
                </div>
              </div>
            </div>
            <div className=" relative bg-white w-[100%]  ">
              <div className=" w-[90%] relative left-[5%] text-left">
                <p className="font-bold text-lg text-[#00B7FE]"></p>
              </div>

              <div className=" w-[90%] relative left-[5%] text-left mt-[40px] ">
                <Coba10 text="Detail Alamat:" />
                <textarea
                  name="detail_alamat"
                  id="detail_alamat"
                  cols="30"
                  rows="10"
                  className="border border-gray-300 w-[100%] rounded-lg "
                ></textarea>
              </div>
            </div>
          </div>
          <div className="   flex justify-end w-[90%] left-[5%] my-8 sticky bottom-0 z-10">
            <Link to="https://api.whatsapp.com/send?phone=087832171593">
              <button className="">
                <img src={wa} alt="" className="w-[40px]" />
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SettingUser;
