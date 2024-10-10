import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { InputSearch } from "../../components/reusableComponents/Input";
import { BtnAdmin3 } from "../../components/reusableComponents/ButtonAdmin";
import { Link } from "react-router-dom";
import { Coba10, Coba11 } from "../../components/reusableComponents/Text";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import axios from "axios";
import Swal from "sweetalert2";

const Gudang = () => {
  const { fetchGudang, gudang } = useContext(GlobalContext);
  const Swal = require("sweetalert2");
  useEffect(() => {
    fetchGudang();
  }, []);

  const onDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menghapus data gudang?",
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
          `https://laravel-api-10.cerise.id/api/warehouses/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Delete data diskon berhasil ",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchGudang();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Data gudang tidak dapat dihapus",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
        });
        console.log(error.response.data.error);
      }
    }
  };
  return (
    <div>
      <div className="w-[98%]  mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className="lg:w-[50%] w-[40%]  flex justify-end">
          <Link to="/admin/produk/Addgudang">
            <BtnAdmin3 text="Tambah Gudang" />
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-x-scroll w-[98%] border border-gray-300 bg-blue rounded-lg flex justify-between items-center my-2 h-[50px] p-2">
          <div className="w-[20%] text-left pl-4 ">
            <Coba11 text="No" />
          </div>
          <div className="w-[20%] text-left">
            <Coba11 text="Nama Gudang" />
          </div>
          <div className="w-[20%] text-left">
            <Coba11 text="Alamat Gudang" />
          </div>
          <div className="w-[10%]  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>

        {gudang.map((gudang, index) => (
          <div className="w-[98%] border border-gray-300 bg-white rounded-lg p-2 my-2">
            <div className=" flex justify-between items-center my-2 h-[50px]">
              <div className="w-[20%] text-left pl-4 ">
                <Coba10 text={gudang.id} />
              </div>
              <div className="w-[20%] text-left pl-4 ">
                <Coba10 text={gudang.name} />
              </div>
              <div className="w-[20%] text-left pl-4 ">
                <Coba10 text={gudang.alamat} />
              </div>
              <div className="w-[10%]  flex justify-between items-center">
                <div className=" flex justify-between items-center w-[50%] relative left-[25%]">
                  <Link to={`/admin/produk/EditGudang/${gudang.id}`}>
                    <button>
                      <img src={edit} alt="" className="w-[20px]" />
                    </button>
                  </Link>

                  <img
                    onClick={() => onDelete(gudang.id)}
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

export default Gudang;
