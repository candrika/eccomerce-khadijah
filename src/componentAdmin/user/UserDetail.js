import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import gambarDefault from "../../assets/login.png";
import {
  Coba10,
  Coba11,
  Coba3,
} from "../../components/reusableComponents/Text";
import axios from "axios";
import Swal from "sweetalert2";
import detail from "../../assets_admin/detail.png";
import { BtnAdmin3 } from "../../components/reusableComponents/ButtonAdmin";
import { InputSearch } from "../../components/reusableComponents/Input";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import star from "../../assets_admin/star.png";
import star2 from "../../assets_admin/star2.png";

const initialState = [
  {
    name: "",
    email: "",
    role_id: "",
    no_wa: "",
    gender: "",
    image: "",
  },
];

const UserDetail = () => {
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const { user, fetchUser } = useContext(GlobalContext);
  const [userDetail, setUserDetail] = useState(initialState);
  const { id } = useParams();
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDelete = async (id) => {
    try {
      alert("Apakah anda yakin akan menghapus data ini?");
      const response = await axios.delete(
        `https://laravel-api-10.cerise.id/api/user/delete/address/${id}`,
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
        confirmButtonColor: "rgb(8 47 73)",
      });
      fetchUser();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchUserDetail = async (event) => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log([response.data.image]);
      setUserDetail([
        {
          name: response.data.name,
          email: response.data.email,
          role_id: response.data.role_id,
          no_wa: response.data.no_wa,
          gender: response.data.gender,
          image: response.data.image,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserSetting = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/user/list-address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log("respon member", response);
      setUserAddress(response.data);

      // console.log("member", response.data.message);
      // console.log("member", response);
      // console.log("memberAddress", response);
      setLoading(false);
    } catch (error) {
      console.log("error address mmber", error);
    }
  };

  const PrimaryAddress = async (idAddress) => {
    alert("Apakah anda ingin mengubah alamat utama ?");
    const formData = new FormData();
    try {
      setLoading(true);

      const response = await axios.put(
        `https://laravel-api-10.cerise.id/api/user/primary/address/${id}/${idAddress}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);

      Swal.fire({
        title: "Success!",
        text: "Berhasil mengubah alamat utama",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(8 47 73)",
      });
      navigate(`/admin/user/userDetail/${id}`);
    } catch (error) {
      setLoading(false);
      console.log("error nya apa", error);
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchUserSetting();
  }, []);
  // console.log("respon id user", id);
  // /admin/user/EditAddress/:id
  console.log("address", userAddress);
  return (
    <div>
      <div className=" grid lg:gap-2 lg:grid-cols-2 grid-cols-1">
        {userDetail.map((userDetail, index) => (
          <div className=" w-[100%]" key={userDetail.id}>
            <img
              src={userDetail.image}
              alt={userDetail.image}
              className="w-[700px]"
            />
          </div>
        ))}

        {userDetail.map((userDetail, index) => (
          <div
            className=" w-[100%] px-8 -mx-4 bg-white py-8 shadow-lg"
            key={userDetail.id}
          >
            <div className="mb-8">
              <Coba3 text="Detail User" />
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Nama " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userDetail.name}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Email" />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userDetail.email}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Role Id " />
              </div>
              <div className="w-[60%]  text-left">
                {userDetail.role_id == 3 ? (
                  <Coba10 text=": Member" />
                ) : userDetail.role_id == 2 ? (
                  <Coba10 text=": Admin" />
                ) : (
                  <Coba10 text=": Superadmin" />
                )}
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Gender" />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userDetail.gender}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="No WA " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userDetail.no_wa}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" relative w-[90%] left-[5%] md:left-0  md:w-[98%]  mt-[40px]  mb-8 relative grid lg:grid-cols-4 grid-cols-1 gap-2">
        <div className="w-[100%] ">
          <InputSearch text="Pencarian" />
        </div>
        <div className="w-[100%] ">
          <Link to={`/admin/user/AddAddress/${id}`}>
            <BtnAdmin3 text="Add Address" />
          </Link>
        </div>
      </div>

      {userAddress && userAddress.length > 0 ? (
        userAddress.map((userAddress, index) => (
          <div
            className="relative w-[90%] md:w-[98%] left-[5%] md:left-0 border border-gray-300 bg-white rounded-lg p-2 mb-2"
            key={index}
          >
            <div className="grid grid-cols-2 md:grid-cols-12 gap-2 items-center my-2 sm:h-auto md:h-[50px] ">
              <div className="w-[100%] text-left pl-4  col-span-2 md:col-span-1">
                <Coba10 text={index + 1} />
              </div>
              <div className="w-[100%] text-left pl-4 md:hidden ">
                <Coba10 text="Kota" />
              </div>
              <div className="w-[100%] md:col-span-2 text-left  ">
                <Coba10 text={userAddress.city} />
              </div>
              <div className="w-[100%] text-left pl-4 md:hidden">
                <Coba10 text="Provinsi" />
              </div>
              <div className="w-[100%] md:col-span-2 text-left  ">
                <Coba10 text={userAddress.province} />
              </div>

              <div className="w-[100%] text-left pl-4 md:hidden">
                <Coba10 text="Detail Alamat" />
              </div>
              <div className="w-[100%] md:col-span-3 text-left  ">
                <Coba10 text={userAddress.detail_alamat} />
              </div>

              <div className="w-[100%] mt-4 md:mt-0 col-span-2 flex justify-between items-center">
                <div className="flex justify-between items-center w-[50%] relative left-[25%]">
                  <button onClick={() => PrimaryAddress(userAddress.id)}>
                    <img src={star} alt="" className="w-[25px]" />
                  </button>
                  <Link to={`/admin/user/EditAddress/${userAddress.id}`}>
                    <img src={edit} alt="" className="w-[20px]" />
                  </Link>
                  <button onClick={() => onDelete(userAddress.id)}>
                    <img src={deleted} alt="" className="w-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No user addresses found.</div>
      )}
    </div>
  );
};

export default UserDetail;
