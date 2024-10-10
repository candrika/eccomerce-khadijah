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

const Channel = () => {
  const Swal = require("sweetalert2");
  const { channel, fetchChannel, setChannel } = useContext(GlobalContext);

  //http://localhost:8000/api/setting-generals/coupons/delete/2
  useEffect(() => {
    fetchChannel();
  }, []);

  const onDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menghapus data channel?",
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
          `https://laravel-api-10.cerise.id/api/setting-generals/sales-channels/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Data channel berhasil dihapus",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        fetchChannel();
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

  return (
    <div>
      <div className="w-[90%]  left-[5%] md:left-0 md:w-[98%]  mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className="w-[50%]   grid gap-2 grid-cols-1 md:grid-cols-1">
          <div className="w-[100%]  flex lg:justify-end ">
            <Link to="/admin/settingGeneral/channel/addChannel">
              <BtnAdmin3 text="Tambah Channel" />
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="relative w-[90%] left-[5%] md:left-0 md:w-[98%] hidden md:grid grid-cols-12 gap-4 border border-gray-300 bg-blue rounded-lg  items-center my-2 h-[50px] p-2">
          <div className="col-span-1 text-left pl-4 ">
            <Coba11 text="No " />
          </div>
          <div className="col-span-4 text-left">
            <Coba11 text="Nama Channel" />
          </div>
          <div className="col-span-5 text-left">
            <Coba11 text="Keterangan " />
          </div>

          <div className="col-span-2  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>
        {channel.length === 0 ? (
          <div className="relative w-[90%] left-[5%] md:left-0 md:w-[98%] grid md:grid-cols-1 gap-4 border border-gray-300 bg-white rounded-lg p-2 mb-2">
            <p>Data Tidak Tersedia</p>
          </div>
        ) : (
          ""
        )}

        {channel.map((channel, index) => (
          <div
            key={index}
            className="relative w-[90%] left-[5%] md:left-0 md:w-[98%] grid md:grid-cols-12 gap-4 border border-gray-300 bg-white rounded-lg p-2 mb-2"
          >
            <div className="col-span-1 text-left pl-4 ">
              <Coba10 text={index + 1} />
            </div>

            <div className="col-span-4 text-left  ">
              <Coba10 text={channel.name} />
            </div>

            <div className="col-span-5 text-left  ">
              <Coba10 text={channel.keterangan} />
            </div>
            <div className="col-span-2  flex justify-center items-center">
              <div className=" w-[50%]">
                <Link
                  to={`/admin/settingGeneral/channel/editChannel/${channel.id}`}
                >
                  <img src={edit} alt="" className="w-[20px]" />
                </Link>
              </div>
              <div className=" w-[50%] flex justify-end">
                <img
                  onClick={() => onDelete(channel.id)}
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

export default Channel;
