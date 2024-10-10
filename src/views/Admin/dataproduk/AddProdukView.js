import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddProduk from "../../../componentAdmin/produk/AddProduk";

const AddProdukView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Produk"} />
      <AddProduk />
    </MainLayoutAdmin>
  );
};

export default AddProdukView;
