import React from "react";
import Produk from "../../../componentAdmin/produk/Produk";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";

const ProdukView = () => {
  return (
    <div>
      <MainLayoutAdmin>
        <HeaderAdmin header={"Data Produk"} />
        <Produk />
      </MainLayoutAdmin>
    </div>
  );
};

export default ProdukView;
