import React, { useContext, useEffect, useState } from "react";
import { GlobalContextAddress } from "../../context/GlobalContextAddress";
import { Coba10, Coba11 } from "../../components/reusableComponents/Text";
import { InputSearch } from "../../components/reusableComponents/Input";
import Swal from "sweetalert2";

const Provinsi = () => {
  const Swal = require("sweetalert2");
  const { provinsi, fetchProvinsi } = useContext(GlobalContextAddress);

  useEffect(() => {
    fetchProvinsi();
  }, []);

  return (
    <div>
      <div className="w-[98%]  mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
      </div>
      <div>
        <div className="overflow-x-scroll w-[98%] border border-gray-300 bg-blue rounded-lg flex justify-between items-center my-2 h-[50px] p-2">
          <div className="w-[100%]   text-center  ">
            <Coba11 text="No" />
          </div>
          <div className="w-[100%]   text-center  ">
            <Coba11 text="Nama" />
          </div>
        </div>

        {provinsi.map((provinsi, index) => (
          <div className="w-[98%] border border-gray-300 bg-white rounded-lg p-2 my-2 hover:bg-gray-100">
            <div className=" flex justify-between items-center my-4 h-auto">
              <div className="w-[100%] flex justify-center items-center">
                <Coba10 text={index + 1} />
              </div>
              <div className="w-[100%] flex justify-center items-center">
                <Coba10 text={provinsi.nameProvince} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Provinsi;
