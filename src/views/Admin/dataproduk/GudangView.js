import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import Gudang from "../../../componentAdmin/produk/Gudang";

const GudangView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Data Gudang"} />
      <Gudang />
    </MainLayoutAdmin>
  );
};

export default GudangView;
