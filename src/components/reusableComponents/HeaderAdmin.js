import React from "react";
import { Coba1, Coba4 } from "./Text";

const HeaderAdmin = (props) => {
  return (
    <div className="relative md-[90%] left-[5%]  md:w-[99%] md:left-[50px] lg:left-[0px]  h-auto overflow-y-scroll mb-4">
      <div className=" relative ">
        <div className=" ">
          <div className=" flex  justify-between items-center text-left pt-[10px] h-[50px] w-[95%] border-b-[1px] border-[#FFFFFS]/[0.3]">
            <Coba1 text={props.header} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
