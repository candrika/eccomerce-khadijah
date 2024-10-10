import React, { useEffect, useState } from "react";
import { InputSearch } from "../../components/reusableComponents/Input";
import store from "../../assets/shopping-cart.png";
import wa from "../../assets/whatsapp.png";
import settings from "../../assets/settings.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import {
  BtnAdmin1,
  BtnAdmin2,
  BtnAdmin3,
} from "../../components/reusableComponents/ButtonAdmin";
import { Link } from "react-router-dom";
import axios from "axios";
import { Coba8 } from "../../components/reusableComponents/Text";

const Banners = () => {
  const [banner, setBanner] = useState([]);
  const fetchBanner = async () => {
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.data.banners;
      setBanner(data);

      // console.log("first", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="bg-white p-2">
      <div className="w-[98%]  mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className=" lg:w-[50%] w-[40%] flex relative justify-start ">
          <Link to="/admin/editbanner">
            <BtnAdmin3 text="Edit Banner" />
          </Link>
          {/* <Link to="/admin/addBanner">
            <BtnAdmin3 text="Tambah Banner" />
          </Link> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12">
        {banner.map((item, index) => (
          <div className="col-span-4 mb-4">
            <img src={item} alt={item} className="w-[300px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
