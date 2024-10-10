import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { InputSearch } from "../../components/reusableComponents/Input";
import {
  BtnAdmin1,
  BtnAdmin2,
  BtnAdmin3,
} from "../../components/reusableComponents/ButtonAdmin";
import { Link } from "react-router-dom";
import { Coba10, Coba11 } from "../../components/reusableComponents/Text";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import Swal from "sweetalert2";
import axios from "axios";

const Bundle = () => {
  const Swal = require("sweetalert2");
  const { bundle, setBundle, fetchBundle } = useContext(GlobalContext);

  //http://localhost:8000/api/setting-generals/coupons/delete/2
  useEffect(() => {
    fetchBundle();
  }, []);

  const onDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menghapus data bundle?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://laravel-api-10.cerise.id/api/bundles/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Data bundle berhasil dihapus ",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchBundle();
      } catch (error) {
        console.log(error.response.status);
        if (500 == error.response.status) {
          Swal.fire({
            title: "Error!",
            text: "Data Tidak Dapat Dihapus",
            cancelButtonColor: "#d33",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      }
    }
  };

  return (
    <div>
      <div className="relative w-[90%] md:w-[98%] left-[5%] md:left-0 mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className="flex justify-end">
          {/* <div className=" flex lg:justify-center lg:ml-[42px]">
            <BtnAdmin1 text="Download" />
          </div> */}
          {/* <BtnAdmin2 text="Filter" /> */}
          <Link to="/admin/addBundle">
            <BtnAdmin3 text="Tambah Bundle" />
          </Link>
        </div>
      </div>
      <div>
        <div className=" relative w-[90%] md:w-[98%] left-[5%] md:left-0 hidden md:grid grid-cols-12 gap-2 border border-gray-300 bg-blue rounded-lg  items-center my-2 h-[50px] p-2">
          <div className="col-span-1 text-left ">
            <Coba11 text="No " />
          </div>
          <div className="col-span-2 text-left">
            <Coba11 text="Image" />
          </div>
          <div className="col-span-2 text-left">
            <Coba11 text="Harga Buundle " />
          </div>
          <div className="col-span-2 text-left">
            <Coba11 text="Harga Total " />
          </div>
          <div className="col-span-2 text-left">
            <Coba11 text="Nama Bundle " />
          </div>
          <div className="col-span-2 text-left">
            <Coba11 text="Produk " />
          </div>

          <div className="col-span-1  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>

        {bundle.map((bundle, index) => (
          <div
            key={index}
            className="relative w-[90%] md:w-[98%] left-[5%] md:left-0 grid-cols-1 md:grid grid-cols-12 gap-2 h-auto border border-gray-300 bg-white rounded-lg p-2 mb-2"
          >
            <div className="col-span-1 text-left pl-4 ">
              <Coba10 text={index + 1} />
            </div>
            <div className="col-span-12 md:col-span-2 text-left   ">
              <img
                src={bundle.url}
                alt={bundle.image}
                className="w-[300px]  md:w-[150px] "
              />
            </div>

            <div className="col-span-2 text-left  flex justify-start ">
              <div className="md:hidden">
                <Coba10 text="Harga Bundle : " />
              </div>
              <Coba10 text={` Rp ${bundle.price_bundle}`} />
            </div>

            <div className="col-span-2 text-left  flex justify-start">
              <div className="md:hidden">
                <Coba10 text="Harga Total : " />
              </div>
              <Coba10 text={bundle.price_total} />
            </div>

            <div className="col-span-2 text-left flex justify-start ">
              <div className="md:hidden">
                <Coba10 text="Nama Bundle : " />
              </div>
              <Coba10 text={bundle.name} />
            </div>

            <div className="col-span-2 text-left flex justify-start ">
              <div className="md:hidden">
                <Coba10 text="List Produk : " />
              </div>
              <div>
                {bundle.products.map((data, index) => (
                  <div key={index}>
                    <Coba10 text={`- ${data.name}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1  flex justify-between">
              <div className=" flex justify-between  w-[50%] relative left-[25%]">
                <Link to={`/admin/editBundle/${bundle.id}`}>
                  <img src={edit} alt="" className="w-[20px]" />
                </Link>

                <img
                  onClick={() => onDelete(bundle.id)}
                  src={deleted}
                  alt=""
                  className="w-[20px] h-[20px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bundle;
