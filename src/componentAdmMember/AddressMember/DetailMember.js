import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContextAddress } from "../../context/GlobalContextAddress";
import {
  Coba10,
  Coba11,
  Coba3,
} from "../../components/reusableComponents/Text";
import edit from "../../assets/edit.png";
import { Link } from "react-router-dom";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";

const DetailMember = () => {
  const { id } = useParams();
  const Swal = require("sweetalert2");
  const { userAddress, fetchUserSetting } = useContext(GlobalContextAddress);

  useEffect(() => {
    fetchUserSetting();
  }, []);

  return (
    <div className=" grid lg:gap-2 lg:grid-cols-2 grid-cols-1">
      {userAddress.map((userAddress, index) => (
        <div className=" w-[100%]" key={userAddress.id}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15811.0625680539!2d110.3762386!3d-7.8146143!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57bc68afae6f%3A0x3fefb3b5da344067!2sPT.%20CERISE%20(JogjaBagus)!5e0!3m2!1sid!2sid!4v1688540728420!5m2!1sid!2sid\"
            className="w-[500px] h-[500px]"
            allowfullscreen="\"
            loading="lazy\"
            referrerpolicy="no-referrer-when-downgrade\"
          ></iframe>
        </div>
      ))}

      {userAddress.map((userAddress, index) => (
        <div
          className=" w-[100%] px-8 -mx-4 bg-white py-8 shadow-lg"
          key={userAddress.id}
        >
          <div className="mb-8">
            <Coba3 text="Detail Contact" />
          </div>
          <div className="flex justify-between py-2">
            <div className="w-[40%] text-left ">
              <Coba11 text="Nama Toko " />
            </div>
            <div className="w-[60%]  text-left">
              <Coba10 text={`: ${userAddress.detail_alamat}`} />
            </div>
          </div>
          <div className="flex justify-between py-2">
            <div className="w-[40%] text-left ">
              <Coba11 text="Alamat" />
            </div>
            <div className="w-[60%]  text-left">
              <Coba10 text={`: ${userAddress.alamat}`} />
            </div>
          </div>

          <Link to="/admin/EditContact">
            <BtnAdmin1 text="Edit" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DetailMember;
