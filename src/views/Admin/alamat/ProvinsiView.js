import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Provinsi from "../../../componentAdmin/alamat/Provinsi";

const ProvinsiView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Provinsi"} />
      <Provinsi />
    </MainLayoutAdmin>
  );
};

export default ProvinsiView;
