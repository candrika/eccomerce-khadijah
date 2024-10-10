import React, { useState } from "react";
import disc from "../../assets/discount.png";
import stock from "../../assets/ready-stock.png";
import produk from "../../assets/produk1.jpeg";
import Paragraph from "../reusableComponents/Paragraph";
import axios from "axios";

const ProductDiscount = () => {
  const [mouseOver, setMouseOver] = useState(true);
  const [mouseOut, setMouseOut] = useState(true);
  return (
    <div className="pb-[200px] relative top-16 ">
      <Paragraph text="Bundle Produk " variant="paragraph2" />
      <div className=" relative top-8 w-[80%] md:w-[70%] lg:w-[80%] left-[10%] md:left-[15%] lg:left-[10%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <div
          onMouseOut={() => setMouseOut(!mouseOut)}
          onMouseOver={() => setMouseOver(!mouseOver)}
          className="transition-all duration-300 ease-out hover:ease-in hover:w-[260px]  hover:h-[380px]   relative w-[250px]  h-[350px] rounded-md bg-white drop-shadow-lg"
        >
          <div className="relative w-[90%] left-[5%] h-[65%]">
            <img
              src={produk}
              alt=""
              className="w-[80%] relative left-[10%] top-8 "
            />
          </div>
          <div className="relative w-[90%] left-[5%] ">
            <p className="relative hover:text-[#00B7FE]  text-left">
              Glad2Glow Light Sunscreen Gel UV SPF50 PA+++ 40g
            </p>
            <div className="relative flex ">
              <div className="relative mr-3 flex justify-between transition-all duration-300 ease-out">
                <img src={stock} alt="" className="w-[20px]" />
                <p className="relative text-left "> 5</p>
              </div>
              <div className=" relative mr-3  flex justify-between">
                <img src={disc} alt="" className="w-[20px]" />
                <p className="relative text-left ">Disc 20%</p>
              </div>
            </div>
            <p className="relative  text-[#00B7FE] font-bold text-left">
              Rp 10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDiscount;
