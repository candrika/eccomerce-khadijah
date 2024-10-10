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

const Gallery = () => {
  const Swal = require("sweetalert2");
  const { kupon, fetchKupon, setKupon } = useContext(GlobalContext);

  //http://localhost:8000/api/setting-generals/coupons/delete/2
  useEffect(() => {
    fetchKupon();
  }, []);

  const onDelete = async (id) => {
    try {
      alert("Apakah anda yakin akan menghapus data ini?");
      const response = await axios.delete(
        `https://laravel-api-10.cerise.id/api/setting-generals/coupons/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Delete data diskon berhasil ",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchKupon();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <div className="w-[98%]  mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className="lg:w-[50%] w-[40%]  grid gap-1 lg:grid-cols-3 md:grid-cols-2">
          <div className=" flex lg:justify-center lg:ml-[42px]">
            <BtnAdmin1 text="Download" />
          </div>
          <BtnAdmin2 text="Filter" />
          <Link to="/admin/produk/AddGallery">
            <BtnAdmin3 text="Tambah Gallery" />
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-x-scroll w-[98%] border border-gray-300 bg-blue rounded-lg flex justify-between items-center my-2 h-[50px] p-2">
          <div className="w-[5%] text-left pl-4 ">
            <Coba11 text="No " />
          </div>
          <div className="w-[20%] text-left">
            <Coba11 text="Kode/ Nama Kupon" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Jenis Potongan " />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Jumlah " />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Produk" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Jenis Kupon" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Minimal Pembelian" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Start Date" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="End Date" />
          </div>

          <div className="w-[15%]  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>

        {kupon.map((kupon, index) => (
          <div className="w-[98%] border border-gray-300 bg-white rounded-lg p-2 mb-2">
            <div className=" flex justify-between items-center my-2 h-[50px]">
              <div className="w-[5%] text-left pl-4 ">
                <Coba10 text={index + 1} />
              </div>
              <div className="w-[20%] text-left  ">
                <Coba10 text={kupon.name} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={kupon.jenis_potongan} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={kupon.jumlah_potongan} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={kupon.product.name} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={kupon.jenis_kupon} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={kupon.minimal_pembelian} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={kupon.tanggal_start} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={kupon.tanggal_end} />
              </div>

              <div className="w-[15%]  flex justify-between items-center">
                <div className=" flex justify-between items-center w-[50%] relative left-[25%]">
                  <Link to={`/admin/kupon/EditKupon/${kupon.id}`}>
                    <img src={edit} alt="" className="w-[20px]" />
                  </Link>

                  <img
                    onClick={() => onDelete(kupon.id)}
                    src={deleted}
                    alt=""
                    className="w-[20px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
