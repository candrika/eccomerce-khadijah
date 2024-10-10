import React from "react";
import medicine from "../../assets/beauty1.png";
import medicine2 from "../../assets/beauty2.png";
import gambar from "../../assets/beauty3.png";
import Paragraph from "../reusableComponents/Paragraph";

const Profile = () => {
  return (
    <div className=" relative bg-primary h-[90vh] md:h-[70vh] mb-[100px] mt-[200px]">
      <div className="hidden md:relative md:flex md:justify-between ">
        <div className=" -top-28 relative">
          <img src={medicine2} alt="" className="w-[200px] relative " />
        </div>
        <div className=" -top-28 relative">
          <img src={medicine} alt="" className="w-[200px] relative" />
        </div>
      </div>
      <div className="relative pt-[60px] md:-mt-[150px]">
        <Paragraph text="Why Choose Us?" variant="paragraph3" />
      </div>

      <div className=" w-[80%] relative mt-[50px]  grid grid-cols-2  left-[10%]">
        <div className="border-r border-b border-dashed border-white w-[100%] pr-2 pb-2 text-right">
          <Paragraph text=" 100% Natural" variant="paragraph4" />
          <Paragraph
            text=" Terbuat dari bahan yang natural dan tidak menggunakan bahan-bahan berbahaya "
            variant="paragraph4"
          />
        </div>
        <div className="border-l border-b border-dashed border-white w-[100%] pl-2 pb-2 text-left">
          <Paragraph text=" ALWAYS FRESH" variant="paragraph4" />
          <Paragraph
            text="Saat digunakan membuat badan menjadi lebih segar dan terlihat lebih segar"
            variant="paragraph4"
          />
        </div>
        <div className="border-r border-t border-dashed border-white w-[100%] pr-2 pt-2 text-right">
          <Paragraph text="PREMIUM QUALITY" variant="paragraph4" />
          <Paragraph
            text="Kualitas produk yang tidak ada bandingannya dengan produk di luar sana"
            variant="paragraph4"
          />
        </div>
        <div className="border-l border-t border-dashed border-white w-[100%] pl-2 pt-2 text-left">
          <Paragraph text="SUPER HEALTHY" variant="paragraph4" />
          <Paragraph
            text="Membuat tubuh menjadi lebih sehat dengan menggunakan produk dari Khadija"
            variant="paragraph4"
          />
        </div>
      </div>

      <div className="relative flex justify-center bottom-5">
        <img src={gambar} alt="" className="w-[300px]" />
      </div>
    </div>
  );
};

export default Profile;
