import React from "react";
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

const Customer = () => {
  return (
    <div>
      <div className="w-[98%]  mt-[40px]  mb-8 relative sm:flex sm:justify-between">
        <div className="w-[50%] mb-4 sm:mb-0">
          <InputSearch text="Pencarian" />
        </div>
        <div className="lg:w-[50%] w-[40%]  grid gap-1 lg:grid-cols-3 md:grid-cols-2">
          <div className=" flex lg:justify-center lg:ml-[42px]">
            <BtnAdmin1 text="Download" />
          </div>
          <BtnAdmin2 text="Filter" />
          <Link to="/admin/customer/addDataCustomer">
            <BtnAdmin3 text="Tambah Customer" />
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-x-scroll w-[98%] border border-gray-300 bg-blue rounded-lg flex justify-between items-center my-2 h-[50px] p-2">
          <div className="w-[20%] text-left pl-4 ">
            <p>Nama</p>
          </div>
          <div className="w-[20%] text-left">
            <p>Kategori </p>
          </div>
          <div className="w-[20%] text-left">
            <p>Telepon</p>
          </div>
          <div className="w-[30%] text-left">
            <p>Alamat</p>
          </div>
          <div className="w-[10%]  flex justify-center">
            <img src={settings} alt="" className="w-[20px]" />
          </div>
        </div>

        <div className="w-[98%] border border-gray-300 bg-white rounded-lg p-2">
          <div className=" flex justify-between items-center my-2 h-[50px]">
            <div className="w-[20%] text-left pl-4 ">
              <p>Nama</p>
            </div>
            <div className="w-[20%] flex justify-left items-center">
              <div className="bg-warningHover w-[100px]  h-[35px] flex items-center justify-center rounded-lg">
                <p className="text-warning">Reseller </p>
              </div>
              <div>
                <img src={store} alt="" className="w-[20px]" />
              </div>
            </div>
            <div className=" w-[20%] text-left flex justify-left items-center">
              <div className="">
                <img src={wa} alt="" className="w-[20px] " />
              </div>
              <div className="ml-4">
                <p>083104615555</p>
              </div>
            </div>
            <div className="w-[30%] text-left">
              <p>Alamat</p>
            </div>
            <div className="w-[10%]  flex justify-between items-center">
              <div className=" flex justify-between items-center w-[50%] relative left-[25%]">
                <img src={edit} alt="" className="w-[20px]" />
                <img src={deleted} alt="" className="w-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
