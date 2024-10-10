import React, { useEffect, useState } from "react";
import {
  BtnAdmin1,
  BtnAdmin2,
  BtnAdmin3,
} from "../../components/reusableComponents/ButtonAdmin";
import { Coba10, Coba11 } from "../../components/reusableComponents/Text";
import { InputSearch } from "../../components/reusableComponents/Input";
import { Link } from "react-router-dom";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import axios from "axios";
import Swal from "sweetalert2";

const Diskon = () => {
  const Swal = require("sweetalert2");
  const [disc, setDisc] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDiscount = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/discounts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDisc(response.data.status);
      // console.log("respon", response.data.status);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  const onDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda menghapus diskon?",
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
          `https://laravel-api-10.cerise.id/api/discounts/delete/${id}`,
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
          confirmButtonColor: "#3085d6",
        });
        fetchDiscount();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
      }
    }
  };
  return (
    <div>
      <div className="w-[98%]  mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className="lg:w-[50%] w-[40%] flex justify-end">
          <Link to="/admin/produk/addDiskon">
            <BtnAdmin3 text="Tambah Diskon" />
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-x-scroll w-[98%] border border-gray-300 bg-blue rounded-lg flex justify-between items-center my-2 h-[50px] p-2">
          <div className="w-[5%] text-left pl-4 ">
            <Coba11 text="No " />
          </div>
          <div className="w-[20%] text-left">
            <Coba11 text="Nama" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Jenis Diskon" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Produk Diskon" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Start Diskon" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="End  Diskon" />
          </div>
          <div className="w-[15%] text-left">
            <Coba11 text="Potongan" />
          </div>

          <div className="w-[10%]  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>

        {disc.map((disc, index) => (
          <div
            key={disc.id}
            className="w-[98%] border border-gray-300 bg-white rounded-lg p-2 mb-2"
          >
            <div className=" flex justify-between items-center my-2 h-[50px]">
              <div className="w-[5%] text-left pl-4 ">
                <Coba10 text={index + 1} />
              </div>
              <div className="w-[20%] text-left  ">
                <Coba10 text={disc.name} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={disc.jenis} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={disc.product.name} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={disc.tanggal_start} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={disc.tanggal_end} />
              </div>
              <div className="w-[15%] text-left ">
                <Coba10 text={disc.jenis_potongan} />
              </div>

              <div className="w-[10%]  flex justify-between items-center">
                <div className=" flex justify-between items-center w-[50%] relative left-[25%]">
                  <Link to={`/admin/produk/EditDiskon/${disc.id}`}>
                    <img src={edit} alt="" className="w-[20px]" />
                  </Link>

                  <button onClick={() => onDelete(disc.id)}>
                    <img src={deleted} alt="" className="w-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diskon;
