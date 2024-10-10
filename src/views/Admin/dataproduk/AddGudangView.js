import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddGudang from "../../../componentAdmin/produk/AddGudang";

const AddGudangView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Gudang"} />
      <AddGudang />
    </MainLayoutAdmin>
  );
};

export default AddGudangView;
