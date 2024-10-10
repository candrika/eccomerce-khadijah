import React, { useContext, useEffect, useState } from "react";
import { GlobalContextAddress } from "../../context/GlobalContextAddress";
import { InputSearch } from "../../components/reusableComponents/Input";
import {
  BtnAdmin1,
  BtnAdmin3,
} from "../../components/reusableComponents/ButtonAdmin";
import { Link } from "react-router-dom";
import {
  Coba10,
  Coba11,
  Coba3,
} from "../../components/reusableComponents/Text";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import Swal from "sweetalert2";
import axios from "axios";
import star from "../../assets_admin/star.png";
import star2 from "../../assets_admin/star2.png";
import { useNavigate } from "react-router-dom";

const initialState = {
  user_id: "",
};

const DataMember = () => {
  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(initialState);
  const [memberCard, setMemberCard] = useState("");
  const [address, setAddress] = useState([]);
  const {
    userSetting,
    fetchUserSetting,
    fetchPulau,
    fetchProvinsi,
    fetchCity,
  } = useContext(GlobalContextAddress);

  const fetchUserLogin = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/member",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInput(response.data.user.id);
      setMemberCard(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("id user", input);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `https://laravel-api-10.cerise.id/api/member`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInput(response.data.user.id);
      console.log("respon address user", response.data.allAddress);
      setAddress(response.data.allAddress);
    } catch (error) {
      console.log("error address", error);
    }
  };

  const generateToken = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin generate member card?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        alert("Apakah anda yakin akan generate token?");
        const response = await axios.post(
          `https://laravel-api-10.cerise.id/api/member/generate-card/${input}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: "Berhasil Generate Member Card",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(8 47 73)",
        });
        fetchUserSetting();
        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: "Login Error!",
          text: error.response.data.message,
          icon: "warning",
          confirmButtonText: "Cool",
        });
        console.log(error.response.data.message);
        console.log("error generate member", error);
      }
    }
  };

  const onDelete = async (id) => {
    try {
      alert("Apakah anda yakin akan menghapus data ini?");
      const response = await axios.delete(
        `https://laravel-api-10.cerise.id/api/member/delete/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Delete data alamat berhasil ",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(8 47 73)",
      });
      fetchUserSetting();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const PrimaryAddress = async (id) => {
    const formData = new FormData();
    const confirmationResult = await Swal.fire({
      title: "Apakah anda ingin mengubah alamat utama ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });
    if (confirmationResult.isConfirmed) {
      try {
        setLoading(true);

        const response = await axios.put(
          `https://laravel-api-10.cerise.id/api/member/primary/address/${id}`,
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

        navigate("/member/member-view");
      } catch (error) {
        setLoading(false);
        Swal.fire({
          title: " Error!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cool",
        });
      }
    }
  };

  useEffect(() => {
    fetchUserSetting();
    fetchPulau();
    fetchProvinsi();
    fetchCity();
    fetchUserLogin();
    fetchAddress();
  }, []);

  console.log("first", address);
  return (
    <div>
      <div className=" grid lg:gap-2 lg:grid-cols-2 grid-cols-1  md:w-[100%] ">
        {userSetting.map((userSetting, index) => (
          <div className=" w-[100%]" key={userSetting.id}>
            <img src={userSetting.image} alt={userSetting.image} />
          </div>
        ))}

        {userSetting.map((userSetting, index) => (
          <div
            className="relative w-[90%] left-[5%] md:left-0 md:w-[100%] px-8 md:-mx-4 bg-white py-8 shadow-lg"
            key={userSetting.id}
          >
            <div className="mb-8">
              <Coba3 text="Data User " />
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Nama  " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userSetting.name}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Email" />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userSetting.email}`} />
              </div>
            </div>

            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="No Wa" />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userSetting.no_wa}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Gender " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${userSetting.gender}`} />
              </div>
            </div>
            <div className=" lg:flex md:flex grid justify-between ">
              <div className="my-1 lg:my-0 md:my-0">
                <Link to={`/member/user-setting/${userSetting.id}`}>
                  <BtnAdmin1 text="Edit" />
                </Link>
              </div>
              <div className="my-1 lg:my-0 md:my-0">
                <Link to={`/member/ubah-password/${userSetting.id}`}>
                  <BtnAdmin1 text="Ubah Password" />
                </Link>
              </div>

              {memberCard.card_member === null ? (
                <div className="my-1 lg:my-0 md:my-0">
                  <BtnAdmin1
                    text="Generate Member Card"
                    onClick={() => generateToken(10)}
                  />
                </div>
              ) : (
                <div className="pl-4 ">
                  <Link to="/member-card">
                    <BtnAdmin1 text="Kartu KM" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className=" relative w-[90%] left-[5%] md:left-0  md:w-[98%]  mt-[40px]  mb-8 relative grid lg:grid-cols-4 grid-cols-1 gap-2">
        <div className="w-[100%] ">
          <InputSearch text="Pencarian" />
        </div>
        <div className="w-[100%] ">
          <Link to="/member/add-member-address">
            <BtnAdmin3 text="Add Address" />
          </Link>
        </div>
      </div>
      <div>
        <div className=" overflow-x-scroll w-[98%] border border-gray-300 bg-blue rounded-lg hidden  md:grid md:grid-cols-12 gap-2 items-center my-2 md:h-[70%] lg:h-[50px] p-2">
          <div className="w-[100%]  text-left ">
            <Coba11 text="No " />
          </div>
          <div className="w-[100%] col-span-2 text-left  ">
            <Coba11 text="Nama Kota" />
          </div>
          <div className="w-[100%] col-span-2 text-left  ">
            <Coba11 text="Provinsi " />
          </div>
          <div className="w-[100%] col-span-2 text-left  ">
            <Coba11 text="Kota " />
          </div>
          <div className="w-[100%] col-span-3 text-left  ">
            <Coba11 text="Detail Alamat " />
          </div>

          <div className="w-[100%] col-span-2  flex justify-center  ">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>

        {address.map((userAddress, index) => (
          <div className="relative w-[90%]  md:w-[98%] left-[5%] md:left-0 border border-gray-300 bg-white rounded-lg p-2 mb-2">
            <div className=" grid grid-cols-2 md:grid-cols-12 gap-2 items-center my-2 sm:h-auto md:h-[50px] ">
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
                <Coba10 text="Kelurahan " />
              </div>
              <div className="w-[100%] md:col-span-2 text-left  ">
                <Coba10 text={userAddress.subdistrict_name} />
              </div>
              <div className="w-[100%] text-left pl-4 md:hidden">
                <Coba10 text="Detail Alamat" />
              </div>
              <div className="w-[100%] md:col-span-3 text-left  ">
                <Coba10 text={userAddress.detail_alamat} />
              </div>

              <div className="w-[100%] mt-4 md:mt-0 col-span-2 flex justify-between items-center">
                <div className=" flex justify-between items-center w-[50%] relative left-[25%]">
                  <button onClick={() => PrimaryAddress(userAddress.id)}>
                    <img src={star} alt="" className="w-[25px]" />
                  </button>
                  <Link to={`/member/edit-member-address/${userAddress.id}`}>
                    <img src={edit} alt="" className="w-[20px]" />
                  </Link>

                  <button onClick={() => onDelete(userAddress.id)}>
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

export default DataMember;
