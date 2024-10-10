import React from "react";
import MainLayoutAdmin from "../../../layouts/MainLayoutAdmin";
import HeaderAdmin from "../../../components/reusableComponents/HeaderAdmin";
import AddDiskon from "../../../componentAdmin/produk/AddDiskon";

const AddDiskonView = () => {
  return (
    <MainLayoutAdmin>
      <HeaderAdmin header={"Tambah Data Diskon"} />
      <AddDiskon />
    </MainLayoutAdmin>
  );
};

export default AddDiskonView;
