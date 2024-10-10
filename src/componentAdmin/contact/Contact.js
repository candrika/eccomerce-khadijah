import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {
  Coba10,
  Coba11,
  Coba3,
} from "../../components/reusableComponents/Text";
import edit from "../../assets/edit.png";
import Swal from "sweetalert2";
import axios from "axios";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";
import { Link } from "react-router-dom";

const Contact = () => {
  const Swal = require("sweetalert2");
  const { contact, fetchContact } = useContext(GlobalContext);

  //http://localhost:8000/api/setting-generals/coupons/delete/2
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="  w-[90%] left-[5%] md:left-0 md:w-[100%] grid lg:gap-2 lg:grid-cols-2 grid-cols-1">
      <div>
        {contact.map((contact, index) => (
          <div
            className=" relative w-[100%] left-[5%] md:left-0"
            key={contact.id}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15811.0625680539!2d110.3762386!3d-7.8146143!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57bc68afae6f%3A0x3fefb3b5da344067!2sPT.%20CERISE%20(JogjaBagus)!5e0!3m2!1sid!2sid!4v1688540728420!5m2!1sid!2sid\"
              className="w-[100%] md:w-[90%] h-[500px]"
              allowfullscreen="\"
              loading="lazy\"
              referrerpolicy="no-referrer-when-downgrade\"
            ></iframe>
          </div>
        ))}
      </div>

      <div>
        {contact.map((contact, index) => (
          <div
            className=" relative left-[5%] md:left-0 mt-4 md:mt-0  md:w-[100%] md:px-8 md:-mx-4 bg-white py-8 shadow-lg pl-4"
            key={contact.id}
          >
            <div className="mb-8">
              <Coba3 text="Detail Contact" />
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Nama Toko " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.namaToko}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Alamat" />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.alamat}`} />
              </div>
            </div>

            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="No Telp" />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.nomorTelp}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Facebook " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.facebook}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Instagram " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.instagram}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="Tiktok " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.tiktok}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="whatsapp " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.whatsapp}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="telegram " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.telegram}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="tokopedia " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.tokopedia}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="shopee " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.shopee}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="bukalapak " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.bukalapak}`} />
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-[40%] text-left ">
                <Coba11 text="lazada " />
              </div>
              <div className="w-[60%]  text-left">
                <Coba10 text={`: ${contact.lazada}`} />
              </div>
            </div>
            <Link to="/admin/EditContact">
              <BtnAdmin1 text="Edit" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
