import React from "react";
import pos from "../../assets/pos.png";
import jne from "../../assets/jne.png";
import lionparcel from "../../assets/lionparcel.webp";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <div className="  bg-darkblue md:h-[70vh]   h-[100vh] relative -bottom-5">
      <div className=" w-[100%] md:w-[90%] md:left-[5%] mt-8 relative md:flex  justify-between">
        <div className="  w-[90%] mt-8  relative left-[5%]  md:left-0">
          <p className="font-bold text-[20px] text-white pt-3">Khadijah Mart</p>
          <p className="text-white">
            Khadija Market adalah sebuah usaha yang memperjualbelikan
            produk-produk herbal <br />
            yang sistem penjualannya bisa mendaftar sebagai reseller atau
            dropshiper.
          </p>
        </div>

        <div className=" w-[90%] mt-8 relative left-[5%] md:left-0">
          <p className="font-bold text-[20px] text-white">Halaman</p>
          <Link to="/">
            <p className="text-white">Home</p>
          </Link>
          <Link to="/product">
            <p className="text-white">Produk</p>
          </Link>
          <Link to="/contact">
            <p className="text-white">Kontak</p>
          </Link>
          {/*<p className="text-white">404 Not Found</p>*/}
        </div>

        <div className="hidden lg:inline  w-[90%] mt-8 relative left-[5%] md:left-0">
          <p className="font-bold text-[20px] text-white">Kontak</p>
          <p className="text-white">Alamat : Jalan Brigjen Katamso </p>
          <p className="text-white">Telp : 08787678766</p>
          <p className="text-white">Email : khadijah_mart@mail.id</p>
        </div>
      </div>
      <div className="lg:hidden w-[60%] mt-8  relative left-[20%] ">
        <p className="font-bold text-[20px] text-white mt-8">Kontak</p>
        <p className="text-white">Alamat : Jalan Brigjen Katamso </p>
        <p className="text-white">No Telp. : 08787678766</p>
        <p className="text-white">Email : khadijah_mart@mail.id</p>
      </div>
      <div className="w-[60%]  mt-8 relative left-[20%]">
        <p className="font-bold text-[20px] text-white">Ekspedisi</p>
        <div className=" w-[80%] md:w-[50%] lg:w-[30%] left-[10%] sm:left-[35%] mt-8 relative flex justify-between ">
          <img src={pos} alt="" className="w-[50px]" />
          <img src={jne} alt="" className="w-[50px]" />
          <img src={lionparcel} alt="" className="w-[50px]" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
