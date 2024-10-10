import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { InputSearch } from "../../components/reusableComponents/Input";
import { useNavigate } from "react-router-dom";
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

const Kupon = () => {
  const Swal = require("sweetalert2");
  const { kupon, fetchKupon, setKupon } = useContext(GlobalContext);
  const navigate = useNavigate();

  //http://localhost:8000/api/setting-generals/coupons/delete/2

  const onDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda menghapus kupon?",
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
          `https://laravel-api-10.cerise.id/api/setting-generals/coupons/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Delete data kupon berhasil ",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
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
    }
  };
  useEffect(() => {
    fetchKupon();
  }, []);

  return (
    <div>
      <div className="relative w-[90%] md:w-[98%] left-[5%] md:left-0 mt-[40px]  mb-8  sm:flex sm:justify-between">
        <div className="lg:w-[50%] md:hidden w-[40%] flex  mb-2 ">
          <Link to="/admin/kupon/Addkupon">
            <BtnAdmin3 text="Tambah Kupon" />
          </Link>
        </div>

        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className="lg:w-[50%] w-[40%] hidden md:flex justify-end">
          <Link to="/admin/kupon/Addkupon">
            <BtnAdmin3 text="Tambah Kupon" />
          </Link>
        </div>
      </div>
      <div>
        <div className="relative w-[90%] md:w-[98%] left-[5%] md:left-0 border border-gray-300 bg-blue rounded-lg hidden md:grid grid-cols-12 gap-2 items-center my-2 h-[50px]">
          <div className="col-span-1 text-left pl-4 ">
            <Coba11 text="No " />
          </div>
          <div className="col-span-2 text-left">
            <Coba11 text="Kode/ Nama Kupon" />
          </div>
          <div className="col-span-1 text-left">
            <Coba11 text="Jenis Potongan " />
          </div>
          <div className="col-span-1 text-left">
            <Coba11 text="Jumlah " />
          </div>
          <div className="col-span-1 text-left">
            <Coba11 text="Produk" />
          </div>
          <div className="col-span-1 text-left">
            <Coba11 text="Jenis Kupon" />
          </div>
          <div className="col-span-1 text-left">
            <Coba11 text="Minimal Pembelian" />
          </div>
          <div className="col-span-1 text-left">
            <Coba11 text="Start Date" />
          </div>
          <div className="col-span-1 text-left">
            <Coba11 text="End Date" />
          </div>

          <div className="col-span-2 flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>

        {kupon.map((kupon, index) => (
          <div
            key={index}
            className="relative w-[90%] md:w-[98%] left-[5%] md:left-0 grid grid-cols-1 md:grid-cols-12 gap-2  border border-gray-300 bg-white rounded-lg mb-2 p-2 "
          >
            <div className="col-span-1 text-left pl-0 md:pl-4  ">
              <div className="flex">
                <div className="md:hidden">
                  <Coba10 text="No." />
                </div>
                <Coba10 text={index + 1} />
              </div>
            </div>
            <div className="col-span-2 text-left  md:left-0 ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%]">
                  <Coba10 text="Nama Kupon " />
                </div>
                <div className="w-[50%]">
                  <Coba10 text={`${kupon.name}`} />
                </div>
              </div>
            </div>
            <div className="col-span-2  md:col-span-1 text-left ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%] ">
                  <Coba10 text="Jenis Potongan " />
                </div>
                <div className="w-[50%]  ">
                  <Coba10 text={`${kupon.jenis_potongan}`} />
                </div>
              </div>
            </div>
            <div className="col-span-2  md:col-span-1 text-left ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%] ">
                  <Coba10 text="Jml Potongan " />
                </div>
                {kupon.jenis_potongan === "rupiah" ? (
                  <div className="w-[50%]  ">
                    <Coba10 text={` Rp ${kupon.jumlah_potongan}`} />
                  </div>
                ) : (
                  <div className="w-[50%]  ">
                    <Coba10 text={`${kupon.jumlah_potongan} %`} />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2  md:col-span-1 text-left ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%] ">
                  <Coba10 text="Nama Produk " />
                </div>
                <div className="w-[50%]  ">
                  <Coba10 text={`${kupon.product.name}`} />
                </div>
              </div>
            </div>
            <div className="col-span-2  md:col-span-1 text-left ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%] ">
                  <Coba10 text="Jenis Kupon " />
                </div>
                <div className="w-[50%]  ">
                  <Coba10 text={` ${kupon.jenis_kupon}`} />
                </div>
              </div>
            </div>
            <div className="col-span-2  md:col-span-1 text-left ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%] ">
                  <Coba10 text="Jenis Kupon " />
                </div>
                <div className="w-[50%]  ">
                  <Coba10 text={`${kupon.minimal_pembelian}`} />
                </div>
              </div>
            </div>
            <div className="col-span-2  md:col-span-1 text-left ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%] ">
                  <Coba10 text="Tanggal Kupon " />
                </div>
                <div className="w-[50%]  ">
                  <Coba10 text={`${kupon.tanggal_start} `} />
                </div>
              </div>
            </div>
            <div className="col-span-2  md:col-span-1 text-left ">
              <div className="flex justify-between">
                <div className="md:hidden w-[50%] ">
                  <Coba10 text="Tanggal Kupon " />
                </div>
                <div className="w-[50%]  ">
                  <div>
                    <Coba10 text={` ${kupon.tanggal_end} `} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 flex justify-between items-center">
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
        ))}
      </div>
    </div>
  );
};

export default Kupon;
