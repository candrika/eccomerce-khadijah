import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Coba10, Coba11 } from "../../components/reusableComponents/Text";
import {
  BtnAdmin1,
  BtnAdmin2,
  BtnAdmin3,
} from "../../components/reusableComponents/ButtonAdmin";
import { InputSearch } from "../../components/reusableComponents/Input";
import { Link } from "react-router-dom";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import axios from "axios";
import Swal from "sweetalert2";
import location from "../../assets_admin/location.png";
import detail from "../../assets_admin/detail.png";

const UserCust = () => {
  const Swal = require("sweetalert2");
  const { memberAdm, fetchMemberAdm, setMemberAdm } = useContext(GlobalContext);

  useEffect(() => {
    fetchMemberAdm();
  }, []);

  // console.log("user:", user);
  const onDelete = async (id) => {
    try {
      alert("Apakah anda yakin akan menghapus data ini?");
      const response = await axios.delete(
        `https://laravel-api-10.cerise.id/api/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Delete data user berhasil ",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchMemberAdm();
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
          <Link to="/admin/user/AddUser">
            <BtnAdmin3 text="Tambah Data User" />
          </Link>
        </div>
      </div>
      <div>
        <div className="sticky top-0 bg-blue z-10 overflow-x-scroll w-[98%] border border-gray-300 rounded-lg flex justify-between items-center my-2 h-[50px] p-2">
          <div className="w-[10%] text-left pl-4 ">
            <Coba11 text="No" />
          </div>
          <div className="w-[30%] text-left">
            <Coba11 text="Nama" />
          </div>
          <div className="w-[70%] text-left">
            <Coba11 text="email" />
          </div>
          <div className="w-[20%] text-left">
            <Coba11 text="role_id" />
          </div>
          <div className="w-[40%] text-left">
            <Coba11 text="no_wa" />
          </div>
          <div className="w-[40%] text-left">
            <Coba11 text="gender" />
          </div>

          <div className="w-[50%]  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>
      </div>
      {memberAdm.map((user, index) => (
        <div
          key={user.id}
          className="w-[98%] border border-gray-300 bg-white rounded-lg p-2 mb-2"
        >
          <div className=" flex justify-between items-center my-2 h-[50px]">
            <div className="w-[10%] text-left pl-4 ">
              <Coba10 text={index + 1} />
            </div>
            <div className="w-[30%] text-left  ">
              <Coba10 text={user.name} />
            </div>
            <div className="w-[70%] text-left  ">
              <Coba10 text={user.email} />
            </div>
            <div className="w-[20%] text-left  ">
              {user.roles.map((item, index) => (
                <div>
                  <Coba10 text={item.name} />
                </div>
              ))}
            </div>
            <div className="w-[40%] text-left  ">
              <Coba10 text={user.no_wa} />
            </div>
            <div className="w-[40%] text-left  ">
              <Coba10 text={user.gender} />
            </div>

            <div className="w-[50%]  flex justify-between items-center">
              <div className=" flex justify-between items-center w-[50%] relative left-[25%]">
                <Link to={`/admin/user/userDetail/${user.id}`}>
                  <img src={detail} alt="" className="w-[20px]" />
                </Link>

                <Link to={`/admin/user/EditUser/${user.id}`}>
                  <img src={edit} alt="" className="w-[20px]" />
                </Link>

                <button onClick={() => onDelete(user.id)}>
                  <img src={deleted} alt="" className="w-[20px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCust;
