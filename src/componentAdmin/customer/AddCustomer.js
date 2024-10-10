import React from "react";
import { Coba10 } from "../../components/reusableComponents/Text";
import { InputAdmin1 } from "../../components/reusableComponents/InputAdmin";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";

const AddCustomer = () => {
  return (
    <div className="w-[95%]  relative bg-white">
      <div className=" grid grid-cols-3 gap-4 p-4">
        <div className="text-left rounded-md h-auto ">
          <Coba10 text="Kategori Customer" />
          <InputAdmin1 text="Kategori Customer" />
        </div>
        <div className="text-left  col-span-2 rounded-md h-auto ">
          <Coba10 text="Nama Lengkap" />
          <InputAdmin1 text="Nama Lengkap" />
        </div>
        <div className="text-left  rounded-md h-auto ">
          <Coba10 text="Kota / Kecamatan" />
          <InputAdmin1 text="Kota / Kecamatan" />
        </div>
        <div className="text-left  rounded-md h-auto ">
          <Coba10 text="Kode Pos" />
          <InputAdmin1 text="Kode Pos" />
        </div>
        <div className="text-left  col-start-1 rounded-md h-auto ">
          <Coba10 text="No HP/Telp" />
          <InputAdmin1 text="No HP/Telp" />
        </div>
        <div className="text-left col-start-1  rounded-md h-auto ">
          <Coba10 text="Email" />
          <InputAdmin1 text="Email" />
        </div>
        <div className="text-left  rounded-md h-auto ">
          <Coba10 text="ID Line" />
          <InputAdmin1 text="ID Line" />
        </div>
        <div className="text-left  rounded-md h-auto  ">
          <Coba10 text="Other Contact" />
          <InputAdmin1 text="Other Contact" />
        </div>
        <div className="text-left col-span-3  rounded-md h-auto ">
          <Coba10 text="Alamat Lengkap" />
          <InputAdmin1 text="Alamat Lengkap" />
        </div>
      </div>
      <div className="p-4">
        <BtnAdmin1 text="Simpan" />
      </div>
    </div>
  );
};

export default AddCustomer;
