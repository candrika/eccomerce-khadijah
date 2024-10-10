import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BtnAdmin3 } from "../../components/reusableComponents/ButtonAdmin";
import { Coba10, Coba11 } from "../../components/reusableComponents/Text";
import { InputSearch } from "../../components/reusableComponents/Input";
import { Link } from "react-router-dom";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import { GlobalContext } from "../../context/GlobalContext";

const UnitItem = () => {
  const { fetchItem, item } = useContext(GlobalContext);
  const Swal = require("sweetalert2");
  useEffect(() => {
    fetchItem();
  }, []);

  const onDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin menghapus data item?",
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
          `https://laravel-api-10.cerise.id/api/item_units/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Delete data item berhasil ",
          confirmButtonColor: "#3085d6",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchItem();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "data item tidak dapat dihapus",
          icon: "warning",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
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
        <div className="lg:w-[50%] w-[40%]  flex justify-end">
          <Link to="/admin/produk/AddUnitItem">
            <BtnAdmin3 text="Tambah Unit Item" />
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-x-scroll w-[98%] border border-gray-300 bg-blue rounded-lg flex justify-between items-center my-2 h-[50px] p-2">
          <div className="w-[20%] text-left pl-4 ">
            <Coba11 text="No" />
          </div>
          <div className="w-[20%] text-left">
            <Coba11 text="Nama Unit Item " />
          </div>
          <div className="w-[10%]  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>
        {item.map((item, index) => (
          <div className="w-[98%] border border-gray-300 bg-white rounded-lg p-2 my-2">
            <div className=" flex justify-between items-center my-2 h-[50px]">
              <div className="w-[20%] text-left pl-4 ">
                <Coba10 text="1" />
              </div>
              <div className="w-[20%] flex justify-left items-center">
                <div className="ml-4">
                  <Coba10 text={item.name} />
                </div>
              </div>
              <div className="w-[10%]  flex justify-between items-center">
                <div className=" flex justify-between items-center w-[50%] relative left-[25%]">
                  <Link to={`/admin/produk/EditUnitItem/${item.id}`}>
                    <button>
                      <img src={edit} alt="" className="w-[20px]" />
                    </button>
                  </Link>
                  <img
                    onClick={() => onDelete(item.id)}
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

export default UnitItem;
